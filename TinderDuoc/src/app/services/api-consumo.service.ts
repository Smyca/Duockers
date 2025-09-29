import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Root} from 'src/app/interfaces/api.interface';





@Injectable({
  providedIn: 'root'
})
export class ApiConsumoService {

  ApiConsumoURL:string = 'https://apimocha.com/duocker/post';

  // private url='https://apimocha.com/duocker/post'

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<Root>{
    return this.http.get<Root>(this.ApiConsumoURL)
  }
}
