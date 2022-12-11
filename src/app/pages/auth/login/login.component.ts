import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LOCAL_STORAGE,
  SESSION_STORAGE,
} from '@shared/constants/local-session-cookies.constants';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { AuthService } from '@shared/services/auth/auth.service';
import { EventManagerService } from '@shared/services/helpers/event-manager.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  passwordVisible = false;
  password?: string;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;

  constructor(
    private fb: UntypedFormBuilder,
    private userService:UserService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private translateService: TranslateService,
    private toast: ToastService,
    private router: Router,
    private eventManagerService: EventManagerService
  ) {
    // this.isTokenUnexpired();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.USERNAME_MAX_LENGTH.MAX),
          Validators.minLength(1),
        ],
      ],
      password: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.f.userName.value,
          this.f.password.value,
          this.f.rememberMe.value
        )
        .subscribe((token:any) => {
         this.localStorage.store("jwt-token",token.data.token);
         this.localStorage.store("userName",token.data.username)
         this.localStorage.store("role",token.data.roles);
         const data ={
          userName:token.data.username
         }
         this.userService.findByUserName(data).subscribe((res:any) => {
          this.localStorage.store("profile",res.body.data);
          this.toast.success("Đăng nhập thành công");
          window.location.assign("facebook.com")
         })
         if(token.data.roles.length > 0){
         const isAdmin = token.data.roles[0].role === 'MANAGER' ? true :false;
           this.localStorage.store("isAdmin",isAdmin);
           console.log(localStorage.getItem('isadmin'));
           
         }
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  isTokenUnexpired(): void {
    this.eventManagerService.subscribe('reload', (res: any) => {
      this.router.navigate(['/']);
    });
    const jwt =
      this.localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) ||
      this.sessionStorage.retrieve(SESSION_STORAGE.JWT_TOKEN);
    if (jwt) {
      if (this.authService.getCurrentUser() === null) {
        this.authService.storeProfile('/', false);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
