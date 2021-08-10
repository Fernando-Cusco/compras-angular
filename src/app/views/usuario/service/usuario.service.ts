import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { Usuario } from '../model/usuario';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Token } from '../../../core/models/token.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private url = `${environment.api}/usuario`;

  constructor(private http: HttpClient) { }


  registro(usuario: Usuario):Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario, {headers: this.httpHeaders}).pipe(
      tap((u:Usuario) => {
        console.log('Success');
      }),
      catchError(this.handleError<Usuario>('Error'))
    );
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, usuario, {headers: this.httpHeaders}).pipe(
      tap((u: Usuario) => {
       this.guardarToken(u.token)
      }),
      catchError(this.handleError<Usuario>('Login Error'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken() {
    return localStorage.getItem('token')
  }

  eliminarToken() {
    localStorage.removeItem('token')
  }

  decodeToken(): Token {
    try {
      return jwt_decode<Token>(this.obtenerToken());
    } catch (error) {
      return null;
    }
  }
}
