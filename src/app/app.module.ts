import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocialLoginModule, SocialAuthServiceConfig, SocialUser } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { TopMenuComponent } from './header/top-menu/top-menu.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { JobDetailComponent } from './container/job-detail/job-detail.component';
import { JobListComponent } from './container/job-list/job-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateJobComponent } from './container/job-list/create-job/create-job.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { authGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './container/search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'Login', component: AuthComponent },
  { path: 'Register', component: AuthComponent },
  { path: 'Home', canActivate: [authGuard], component: JobListComponent },
  { path: 'View-More/:id', component: JobDetailComponent },
  { path: 'Jobs', component: JobListComponent },
  { path: 'Apply', component: CreateJobComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Reset-Password', component: ChangePasswordComponent },
  { path: 'foregt-password', component: ForgetPasswordComponent },
  { path: '**', component: NotFoundComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    TopMenuComponent,
    MainMenuComponent,
    JobDetailComponent,
    JobListComponent,
    CreateJobComponent,
    AuthComponent,
    NotFoundComponent,
    SearchComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '935749022426-pd1dr2fsftgp49764kftlri6jqtm9qut.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
