import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
