import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ComprasService } from "src/app/service/compras.service";
import { ProductosService } from "src/app/service/productos.service";

@Component({
  selector: "app-lista-productos",
  templateUrl: "./lista-productos.component.html",
})
export class ListaProductosComponent implements OnInit {

  listaProducto: any[];
  showModalEditarAgregar = false;
  tituloEditarAgregarProducto = "";


  nombreProducto = "";
  descripcionProducto = "";
  precioProducto = "";
  inventarioProducto = "";
  idProductoEditar = 0;
  showModaMensaje = false;

  constructor(private comprasService: ComprasService, private appComponent: AppComponent, private productosService:ProductosService) {}

  ngOnInit(): void {
      this.consultaAllProductos();
  }

  abrirModalAccion(accion: any, jsonvalor: any){
    if('A' === accion){
      this.tituloEditarAgregarProducto = 'Agregar';

      this.nombreProducto = '';
      this.descripcionProducto = '';
      this.precioProducto = '';
      this.inventarioProducto = '';
      this.idProductoEditar = 0;

      
    }else if('E' === accion){
      this.tituloEditarAgregarProducto = 'Editar';

      this.nombreProducto = jsonvalor.nombre;
      this.descripcionProducto = jsonvalor.descripcion;
      this.precioProducto = jsonvalor.precio;
      this.inventarioProducto = jsonvalor.inventario;
      this.idProductoEditar = jsonvalor.idProducto

    }
    this.toggleModal();
  }

  toggleModal(){
    this.showModalEditarAgregar = !this.showModalEditarAgregar;
  }

  toggleModalMensaje(){
    this.showModaMensaje = !this.showModaMensaje;
  }

  consultaAllProductos(){
    this.comprasService.getAllProductos().subscribe(
      (event: any) => {
          this.listaProducto = event;
      }
    );
  }

  agregarProducto(){
    let paramJson = {
      nombre: this.nombreProducto,
      descripcion: this.descripcionProducto,
      precio: this.precioProducto,
      inventario: this.inventarioProducto
    }

    this.productosService.agregarProducto(paramJson).subscribe(
      (event: any) => {
          this.consultaAllProductos();
          this.toggleModal();
          this.toggleModalMensaje();
      }
    );
  }

  editarProducto(){
    let paramJson = {
      nombre: this.nombreProducto,
      descripcion: this.descripcionProducto,
      precio: this.precioProducto,
      inventario: this.inventarioProducto,
      idProducto: this.idProductoEditar
    }

    this.productosService.editarProducto(paramJson).subscribe(
      (event: any) => {
          this.consultaAllProductos();
          this.toggleModal();
          this.toggleModalMensaje();
      }
    );
  }
}


