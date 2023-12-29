import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

    private url = "http://192.168.0.119:8080/";

    constructor(private http:HttpClient) { }
  
    // Returns an observable
    busquedaCliente(param):Observable<any> {
        const formData = new FormData(); 
        return this.http.post(this.url+"busqueda-cliente", param);
    }
}