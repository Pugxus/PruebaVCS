import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca, Modelo } from '../Interfaces/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private https: HttpClient) { }

  getMarcas(tipo: any): Observable<any> {
    return this.https.get<any>('https://parallelum.com.br/fipe/api/v1/' + tipo + '/marcas');
  }

  getModelos(tipo: any, marca: any): Observable<any> {
    return this.https.get<any>('https://parallelum.com.br/fipe/api/v1/' + tipo + '/marcas/' + marca + '/modelos/');
  }

  getAnios(tipo: any, marca: any, modelo: any): Observable<any> {
    return this.https.get<any>('https://parallelum.com.br/fipe/api/v1/' + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos/');
  }

  getValor(tipo: any, marca: any, modelo: any, anio: any): Observable<any> {
    return this.https.get<any>('https://parallelum.com.br/fipe/api/v1/' + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos/' + anio);
  }

} 
