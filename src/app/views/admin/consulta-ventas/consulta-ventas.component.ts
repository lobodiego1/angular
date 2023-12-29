import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ComprasService } from "src/app/service/compras.service";

@Component({
  selector: "app-consulta-ventas",
  templateUrl: "./consulta-ventas.component.html",
})
export class ConsultaVentasComponent implements OnInit {
  
  listaTickets: any;
  listaProductosTickets: any;
  showModal = false;
  showModalAbonos = false;
  sumaTotalProdTicket = 0;
  nombreClienteTicket = "";
  fechaClienteTicket = "";
  tipoDetalleTipoPago = "";

  numeroTicket = "";
  totalOfertado = "";
  nombreClienteTicketInput = "";


  cantidadAbonar = 0;
  nombreClienteTicketAbonar = "";
  idClienteAbonar = 0;

  listaAbonosTickets: any;
  sumaTotalAbonosTicket = 0;

  constructor(private comprasService: ComprasService, private appComponent: AppComponent) {
    this.listaProductosTickets = new Array();
    this.listaAbonosTickets = new Array();
  }
  
  ngOnInit(): void {
      this.consulta();
      
  }

  consulta(){
    this.comprasService.consultaVentas().subscribe(
      (event: any) => {
        this.listaTickets = event;
      }
  );
  }

  consultaTicketProductos(id, nombre, fecha, idTipoPago, totalOfertadoParam){
    this.appComponent.showLoader = true;
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
  toggleModalAbonos(){
    this.showModalAbonos = !this.showModalAbonos;
  }
  busquedaTicket(){
    this.appComponent.showLoader = true;

    let consultaTicketId = {
      nombreCliente: this.nombreClienteTicketInput,
      idDetalleVenta: this.numeroTicket
    };

    this.comprasService.consultaVentasId(consultaTicketId).subscribe(
      (event: any) => {
        this.appComponent.showLoader = false;
        this.listaTickets = event;
      }
  );

  }

  realizarAbonos(){
    //this.nombreClienteTicketAbonar;
    
    let paramRealizarAbono = {
      idDetalleVenta: this.idClienteAbonar,
      cantidad: this.cantidadAbonar
    }
    
    this.appComponent.showLoader = true;

    this.comprasService.realizarAbonos(paramRealizarAbono).subscribe(
      (event: any) => {
        this.appComponent.showLoader = false;
        this.toggleModalAbonos();

        this.consulta();
      });
    
  }

  abrirRealizarAbonos(tickets){
    this.toggleModalAbonos();

    this.nombreClienteTicketAbonar = tickets.idDetalleVenta + " - " + tickets.fechaEmitida + " - " + tickets.nombreCliente;
    this.idClienteAbonar = tickets.idDetalleVenta;
  }
}
