import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login.component';
import { AuthGuardService } from './store/auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  children: [
    {
      path: '',
      redirectTo: "/",
      pathMatch: 'full'
    }
  ]
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
