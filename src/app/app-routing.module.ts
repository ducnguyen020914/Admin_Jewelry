import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@core/layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@core/layout/app-layout/main-layout/main-layout.component';
import { Page403Component } from '@pages/auth/page403/page403.component';
import { Page404Component } from '@pages/auth/page404/page404.component';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

const routes: Routes = [
  {
    path: ROUTER_UTILS.base.home,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/' + ROUTER_UTILS.base.dashboard,
        pathMatch: 'full',
        data: { pageTitle: 'common.title' },
      },
      {
        path: ROUTER_UTILS.base.dashboard,
        loadChildren: () =>
          import('@pages/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: ROUTER_UTILS.error.permissionDenied,
        component: Page403Component,
      },
    ],
  },

  {
    path: ROUTER_UTILS.authentication.root,
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUTER_UTILS.privacyPolicy.root,
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@pages/public/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },

  // path: ROUTER_UTILS.booking.root,
  // loadChildren: () =>
  // import('@pages/admin/booking/booking.module').then(
  //   (m) => m.BookingModule
  // ),
  // {
  //   path: ROUTER_UTILS.feedback.public,
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('@pages/public/feedback-public/feedback-public.module').then(
  //       (m) => m.FeedbackPublicModule
  //     ),
  // },
  { path: ROUTER_UTILS.error.permissionDenied, component: Page403Component },
  { path: ROUTER_UTILS.error.notFound, component: Page404Component },
  { path: ROUTER_UTILS.base.freeRoute, component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
