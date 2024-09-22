import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) {}

  // Método para obtener citas, aceptando headers
  obtenerCitas(headers: any) {
    const httpHeaders = new HttpHeaders(headers);
    return this.http.get<any[]>('http://localhost:3000/api/citas', { headers: httpHeaders });
  }

  // Método para guardar una cita
  guardarCita(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:3000/api/citas', data, { headers });
  }
}