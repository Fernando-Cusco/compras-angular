import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Producto } from '../model/producto.model';
import { ApiMessage } from '../../../core/models/apimessage.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json','Authorization': localStorage.getItem('token') });
  private url = `${environment.api}/producto`;

  constructor(private http: HttpClient) { }


  productos():Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/lista`, {headers: this.httpHeaders}).pipe(
      tap((p: Producto[]) => {
        console.log(p);
      }),
      catchError(this.handleError<Producto[]>('Error Obtener Productos'))
    );
  } 

  registrarProducto(producto: Producto): Observable<ApiMessage> {
    return this.http.post<ApiMessage>(this.url, producto, {headers: this.httpHeaders}).pipe(
      tap((apm: ApiMessage) => {
        console.log(apm);
      }),
      catchError(this.handleError<ApiMessage>('error'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
