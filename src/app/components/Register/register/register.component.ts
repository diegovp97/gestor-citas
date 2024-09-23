import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importar NgbModal y NgbModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgbModule], // Añadir NgbModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mostrarPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) {} // Inyectar NgbModal

  // Método para registrar el usuario y mostrar el modal de éxito
  onSubmit(successModal: any) {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.http.post('http://localhost:3000/api/usuarios', {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {
        console.log('Usuario creado exitosamente:', response);

        // Mostrar el modal de éxito
        this.modalService.open(successModal).result.then(() => {
          // Redirigir al iniciar sesión al cerrar el modal
          this.router.navigate(['/login']);
        });
      },
      (error: any) => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
