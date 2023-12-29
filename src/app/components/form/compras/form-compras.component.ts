import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ClientesService } from "src/app/service/clientes.service";
import { ComprasService } from "src/app/service/compras.service";

@Component({
  selector: "app-form-compras",
  templateUrl: "./form-compras.component.html",
})
export class FormComprasComponent implements OnInit {

    lista:any[];
    seleccionado: any;
    listaCompras: Array<any>;
    nombreCliente = "";
    elegidoCliente = "";
    numeroCelCliente = "";
    totalPrecioProducto = 0;
    showModal = false;
    listaClientes: any;
    idClienteSeleccionado = 0;
    idTipoPago = "CON";
    cantidadAbono = 0;
    listaAbonosTickets: any;
    sumaTotalAbonosTicket = 0;
    sumaTotalProdTicket = 0;
    totalOfertado = "";
    tipoDetalleTipoPago = "";
    listaProductosTickets: any;
    nombreClienteTicket = "";
    fechaClienteTicket = "";

    constructor(private comprasService: ComprasService, private clientesService:ClientesService, private appComponent: AppComponent) {
        this.listaCompras = new Array();
        this.listaProductosTickets = new Array();
        this.listaAbonosTickets = new Array();
    }

    ngOnInit(): void {
        this.comprasService.getAllProductos().subscribe(
            (event: any) => {
                this.lista = event;
            }
        );
    }

    agregarListaCompras(item){
        let produObtenido = this.lista.filter(data=>data.nombre === item);
        this.listaCompras.push({
            nombre : produObtenido[0].nombre, 
            idProducto : produObtenido[0].idProducto,
            precio : produObtenido[0].precio,
            cantidad: 1
            });

        this.totalPrecioProducto = this.totalPrecioProducto + produObtenido[0].precio;
    }

    limpiarVentas(){
        this.listaCompras = new Array();
        this.nombreCliente = "";
        this.elegidoCliente = "";
        this.numeroCelCliente = "";
        this.idTipoPago = "CON";
        this.totalPrecioProducto = 0;
        this.idClienteSeleccionado = 0;
        this.listaClientes = new Array();
        this.showClienteNoElegido = false;
    }


    showClienteNoElegido = false;
    preguntaContinuar(){
        

        if((this.idClienteSeleccionado === null || this.idClienteSeleccionado === 0) && this.showClienteNoElegido === false){
            this.showClienteNoElegido = true;
        }else{
            this.realizarVenta();
        }

        

    }

    realizarVenta(){
        this.appComponent.showLoader = true;
        this.showClienteNoElegido = false;
        let parametros = {
            'idClientes': this.idClienteSeleccionado,
            'nombreCliente': this.elegidoCliente,
            'numCelular': this.numeroCelCliente,
            'idTipoPago': this.idTipoPago,
            'cantidad': this.cantidadAbono,
            'totalProductos': this.totalPrecioProducto,
            'listaProductos': this.listaCompras
        };
        
        this.comprasService.realizarVentas(parametros).subscribe(
            (event: any) => {
                this.appComponent.showLoader = false;
                this.limpiarVentas();
                this.consultaTicketProductos(event.idDetalleVenta,
                    event.nombreCliente,event.fechaEmitida,event.idTipoPago, event.totalOfertado);
                //this.toggleModal();
            }
        );
    }
    

    consultaTicketProductos(id, nombre, fecha, idTipoPago, totalOfertadoParam){
        //this.appComponent.showLoader = true;
        this.sumaTotalAbonosTicket = 0;
        this.sumaTotalProdTicket = 0;
        this.totalOfertado = "";
        this.tipoDetalleTipoPago = "";
        this.comprasService.consultaTicketProductos(id).subscribe(
          (event: any) => {
    
            this.appComponent.showLoader = false;
            console.log(event);
            this.listaProductosTickets = event.listaProductos;
            this.listaAbonosTickets = event.listaAbonos;
            
            console.log(event.listaAbonos);
    
            this.nombreClienteTicket = nombre;
            this.fechaClienteTicket = fecha;
            this.totalOfertado = totalOfertadoParam;
            this.tipoDetalleTipoPago = idTipoPago;
            this.listaProductosTickets.forEach((item, index) => {
              this.sumaTotalProdTicket += item.precio;
            });
    
            this.listaAbonosTickets.forEach((item,index)=>{
              this.sumaTotalAbonosTicket += item.cantidad;
            });
            
    
            this.toggleModal();
          });
      }

    
    toggleModal(){
        this.showModal = !this.showModal;
    }

    buscarCliente(){
        let buscarCliente = {
            'nombre': this.nombreCliente
        };

        this.clientesService.busquedaCliente(buscarCliente).subscribe(
            (event:any) => {
                this.listaClientes = event;
        });

    }

    seleccionarCliente(clienteElegido){
        this.idClienteSeleccionado = clienteElegido.idClientes;
        this.elegidoCliente = clienteElegido.nombre;
    }


}
