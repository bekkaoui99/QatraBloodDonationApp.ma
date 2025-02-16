import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/landingPage',
    pathMatch:'full'
  },
  {
    path: 'landingPage',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./app-information/app-information.module').then(m => m.AppInformationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule)
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
