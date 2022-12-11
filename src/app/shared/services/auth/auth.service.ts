import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {API_IAM} from '../../constants/base.constant';
import {
  LOCAL_STORAGE,
  SESSION_STORAGE
} from '../../constants/local-session-cookies.constants';
import {USER_CUSTOMER} from '../../constants/user.constant';
import {UserPrimary} from '../../models/user-primary.model';
import {IUser, User} from '../../models/user.model';
import CommonUtil from '../../utils/common-utils';
import {ToastService} from '../helpers/toast.service';

type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: any;
  private tokenPrivateKey?: string;

  constructor(
    protected http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private translateService: TranslateService,
    private router: Router,
    protected toast: ToastService
  ) {
  }

  myProfile(): Observable<EntityResponseType> {
    return this.http.get<any>(`${API_IAM}/me/profile`,
      {
        observe: 'response',
        headers: CommonUtil.headers(true)
      });
  }

  updateMyProfile(user: User, loading= false): Observable<any> {
    return this.http.post<any>(`${API_IAM}/me/profile`, user, {
      observe: 'response',
      headers: CommonUtil.headers(loading),
    });
  }

  myAuthorities(): Observable<EntityResponseType> {
    return this.http.get<any>(`${API_IAM}/me/authorities`, {
      observe: 'response',
      headers: CommonUtil.headers(true)
    });
  }

  storeProfile(redirectUrl?: string, isShowToast = true): void {
    this.myProfile().subscribe((response) => {
      const currentUser = response?.body?.data as User;
      this.currentUser = currentUser;
      if (currentUser.accountType === USER_CUSTOMER) {
        this.clear();
        this.toast.info('model.login.error.permissionNotAccess');
      } else {
        if (isShowToast) {
          this.toast.success(
            this.translateService.instant('model.login.success.authenticate')
          );
        }
        this.$localStorage.store(LOCAL_STORAGE.PROFILE, currentUser);
        this.myAuthorities().subscribe((res) => {
          currentUser.userPrimary = res.body?.data as UserPrimary;
          this.currentUser = currentUser;
          this.$localStorage.store(LOCAL_STORAGE.PROFILE, currentUser);
          if (redirectUrl) {
            this.router.navigate([`${redirectUrl}`]);
          }
        });
      }
    });
  }

  login(
    username: string,
    password: string,
    rememberMe = false
  ): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:8080/auth/login`,
        {
          username,
          password,
          rememberMe,
          loading:true
        },
      );
  }

  logout(): Observable<any> {
    const url = `${API_IAM}/logout`;
    let logoutRevokeRequest = {};
    const refreshToken = this.$localStorage.retrieve(
      LOCAL_STORAGE.REFRESH_TOKEN
    );
    if (refreshToken) {
      logoutRevokeRequest = {
        refreshToken,
      };
    }
    return this.http.post<any>(url, logoutRevokeRequest);
  }

  authenticateSuccess(rememberMe: boolean, response: any): void {
    const accessToken = response?.data?.accessToken;
    const refreshToken = response?.data?.refreshToken;
    const isSuccess = response?.success;
    const decoder: any = jwt_decode(accessToken);
    // get user id from jwt token
    this.tokenPrivateKey = decoder?.user_id;
    if (!isSuccess) {
      this.toast.error(
        this.translateService.instant('model.login.error.unauthorized')
      );
      this.router.navigate(['/authentication/login']);
    } else {
    }
  }

  storeAuthenticationToken(jwt: any, rememberMe: boolean): void {
  }

  clear(): void {
    this.$localStorage.clear(LOCAL_STORAGE.PROFILE);
    this.$localStorage.clear(LOCAL_STORAGE.JWT_TOKEN);
    this.$sessionStorage.clear(SESSION_STORAGE.JWT_TOKEN);
    this.$localStorage.clear(LOCAL_STORAGE.REFRESH_TOKEN);
  }

  getCurrentUser(): User | null {
    const user: User = this.$localStorage.retrieve(LOCAL_STORAGE.PROFILE);
    return user ? user : null;
  }

  hasAnyAuthority(authorities: string[]): boolean {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser?.userPrimary?.isRoot) {
      return true;
    }
    let grantedPermissions = [];
    if (this.currentUser) {
      grantedPermissions = this.currentUser?.userPrimary?.grantedPermissions;
      if (grantedPermissions) {
        for (let i = 0; i < grantedPermissions?.length; i++) {
          if (grantedPermissions.includes(authorities[i])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  hasPermissionAccess(authorities: string[], userLevel?: string[]): void {
    if (!!userLevel && userLevel?.length > 0) {
      this.currentUser = this.getCurrentUser();
      if (
        !userLevel.includes(this.currentUser?.userPrimary?.userLevel) &&
        !this.currentUser?.isRoot
      ) {
        window.history.back();
      }
    }
    const hasAnyAuthority = this.hasAnyAuthority(authorities);
    if (!hasAnyAuthority) {
      window.history.back();
    }
  }

  hasUserLevelAccess(userLevels: string[]): boolean {
    this.currentUser = this.getCurrentUser();
    const currentUserLevel = this.getCurrentUser()?.userPrimary
      ?.userLevel as string;
    return !(
      !userLevels.includes(currentUserLevel) && !this.currentUser?.isRoot
    );
  }

  getToken(): string {
    const accessTokenEncode =
      this.$localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) ||
      this.$sessionStorage.retrieve(SESSION_STORAGE.JWT_TOKEN);
    return ''
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.http
      .post<any>(
        `${API_IAM}/refresh-token`,
        {refreshToken},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
  }

  resetPassword(
    userId: string,
    newPassword: string,
    oldPassword: string,
    refreshToken: string
  ): Observable<any> {
    return this.http.post<any>(`${API_IAM}/user/${userId}/change-password`, {
      newPassword,
      oldPassword,
      refreshToken,
    });
  }

  getTokenPrivateKey(): string {
    let tokenPrivateKey = '';
    if (!this.tokenPrivateKey) {
      // nếu không có key tồn tại thì lấy key từ userProfile local storage
      const user = this.getCurrentUser();
      if (user) {
        tokenPrivateKey = user.id as string;
        this.tokenPrivateKey = tokenPrivateKey;
      } else {
        // nếu trong local storage không có user thì xoá hết thông tin profile
        this.clear();
      }
    } else {
      tokenPrivateKey = this.tokenPrivateKey;
    }
    return tokenPrivateKey;
  }

  public storeToken(accessToken?: string, refreshToken?: string): void {
   
  }

}
