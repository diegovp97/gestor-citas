import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private http: HttpClient) {} // Inyectar HttpClient correctamente

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.http.post('http://localhost:3000/api/usuarios', {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {  // Definir el tipo del parámetro 'response'
        console.log('Usuario creado exitosamente:', response);
        this.router.navigate(['/login']);  // Redirigir después del registro exitoso
      },
      (error: any) => {  // Definir el tipo del parámetro 'error'
        console.error('Error al crear el usuario:', error);
      }
    );
  }

  mostrarPassword: boolean = false;

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
