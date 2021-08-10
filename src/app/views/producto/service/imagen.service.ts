import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Imagen } from '../model/imagen.model';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private httpHeaders = new HttpHeaders({'Authorization': localStorage.getItem('token')});
  private url = `${environment.api}/imagen`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<Imagen> {
    const data = new FormData();
    data.append('file', file);
    return this.http.post<Imagen>(`${this.url}/upload`, data, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al guardar');
        return throwError(error);
      })
    );

  }

}
