import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/welcome-page/welcome-page.page').then(m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.page').then(m => m.LoginPageComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up-page/sign-up-page.page').then(m => m.SignUpPageComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password-page/forgot-password-page.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'verification-code',
    loadComponent: () => import('./pages/verification-code-page/verification-code-page.page').then(m => m.VerificationCodePage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password-page/reset-password-page.page').then(m => m.ResetPasswordPage)
  }
];
