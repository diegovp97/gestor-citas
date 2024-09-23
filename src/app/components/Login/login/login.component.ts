import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importar NgbModal y NgbModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgbModule], // Añadir NgbModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) {} // Inyectar NgbModal

  // Lógica para mostrar u ocultar la contraseña
  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  // Método para validar el formato del email usando una expresión regular
  validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Lógica básica para el inicio de sesión con modales de éxito/error
  onLogin(successModal: any, errorModal: any) {
    this.http.post('http://localhost:3000/api/auth/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          console.log('Inicio de sesión exitoso:', response);
          
          // Almacenar el token en el localStorage
          localStorage.setItem('token', response.token);
          console.log(localStorage.getItem('token')); // Asegúrate de que el token está almacenado

          // Mostrar modal de éxito
          this.modalService.open(successModal);

          // Redireccionar al dashboard después de cerrar el modal de éxito
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);

          // Mostrar modal de error
          this.modalService.open(errorModal);
        }
      );
  }
}
