import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {

  private url = "http://192.168.0.119:8080/";

  constructor(private http:HttpClient) { }
    
  
  // Returns an observable
  getAllProductos():Observable<any> {
      const formData = new FormData(); 
      return this.http.get(this.url+"get-productos-all");
  }

  // Returns an observable
   realizarVentas(param: any):Observable<any> {
    const formData = new FormData();
    return this.http.post(this.url+"realizar-ventas", param);
  }

  consultaVentas():Observable<any> {
    const formData = new FormData(); 
    return this.http.get(this.url+"consultas-ventas");
  }

  consultaTicketProductos(id):Observable<any> {
    return this.http.get(this.url+"consultas-ventas-productos/"+id);
  }

  consultaVentasId(param):Observable<any> {
    return this.http.post(this.url+"consultas-ventas-productos-id/", param);
  }

  realizarAbonos(parametro):Observable<any> {
    return this.http.post(this.url+"realizar-abonos/", parametro);
  }

}