import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "angular-dashboard-page";

  showModal = false;
  showLoader = false;

  HOST_APP = "http://localhost:8080/";

  constructor(private router: Router){}

  ngOnInit() {
    this.router.navigate(['/admin/consulta-ventas']);
}

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
