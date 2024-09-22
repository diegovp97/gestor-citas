import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component'; // Agregar el componente de dashboard

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirige a Register
    { path: 'login', component: LoginComponent }, // Ruta para login
    { path: 'register', component: RegisterComponent }, // Ruta para register
    { path: 'dashboard', component: DashboardComponent }, // Agregar la ruta para dashboard

];
