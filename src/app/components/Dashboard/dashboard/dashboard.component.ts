import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitasService } from '../../../services/services/citas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any;
  selectedDate: Date | null = null;
  horasDisponibles: string[] = [];
  horaSeleccionada: string | null = null;
  citasReservadas: any[] = [];

  private socket!: WebSocket;

  constructor(private citasService: CitasService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.connectWebSocket(); // Conectar el WebSocket cuando se inicializa el componente
  }

  connectWebSocket() {
    this.socket = new WebSocket('ws://localhost:3000'); // Conecta al servidor WebSocket

    this.socket.onmessage = (event) => {
      const citas = JSON.parse(event.data);
      this.citasReservadas = citas;
      console.log('Citas actualizadas:', this.citasReservadas);

      if (this.selectedDate) {
        this.generarHorasDisponibles();
      }
    };

    this.socket.onclose = (event) => {
      console.log('Conexión WebSocket cerrada:', event);
    };

    this.socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
  }

  // Solución para el error esFechaReservada
  esFechaReservada(fecha: Date): boolean {
    return this.citasReservadas.some((cita) => {
      const fechaCita = new Date(cita.fecha);
      return fechaCita.toDateString() === fecha.toDateString();
    });
  }

  // Solución para el error getFechaDesdeObjeto
  getFechaDesdeObjeto(date: { year: number, month: number, day: number }): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  onDateSelect(date: { year: number, month: number, day: number }) {
    this.selectedDate = this.getFechaDesdeObjeto(date);
    this.selectedDate.setHours(0, 0, 0, 0);
    this.generarHorasDisponibles();
  }

  generarHorasDisponibles() {
    this.horasDisponibles = [];
    for (let i = 9; i <= 21; i++) {
      const hora = `${i}:00`;
      this.horasDisponibles.push(hora);
    }
  }

  seleccionarHora(hora: string) {
    this.horaSeleccionada = hora;
  }

  confirmarCita(confirmModal: any) {
    if (this.selectedDate && this.horaSeleccionada) {
      const [hora, minutos] = this.horaSeleccionada.split(':');
      const fechaConHora = new Date(this.selectedDate);
      fechaConHora.setHours(parseInt(hora), parseInt(minutos), 0);

      this.citasService.guardarCita({
        fecha: fechaConHora,
        hora: this.horaSeleccionada,
        pacienteId: 1 // Cambia esto si el paciente ID es dinámico
      }).subscribe(response => {
        this.modalService.open(confirmModal);
      });
    }
  }

  esHoraReservada(hora: string): boolean {
    if (!this.selectedDate) {
      return false;
    }

    return this.citasReservadas.some((cita) => {
      const fechaCita = new Date(cita.fecha);
      return fechaCita.toDateString() === this.selectedDate?.toDateString() && cita.hora === hora;
    });
  }
}
