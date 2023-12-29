import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private url = "http://192.168.0.119:8080/";

  constructor(private http:HttpClient) { }

    getAllProductos():Observable<any> {
        
        return this.http.get(this.url+"get-productos-all");
    }

    agregarProducto(parametria: any):Observable<any> {
        
        return this.http.post(this.url+"agregar-producto", parametria);
    }

    editarProducto(parametria: any):Observable<any> {
        
        return this.http.post(this.url+"editar-producto", parametria);
    }
}