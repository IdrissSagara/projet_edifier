import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OuvrierService} from "../../../services/ouvrier.service";
import {SpinnerService} from "../../../services/spinner.service";
import {Ouvrier} from "../../../model/ouvrier";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ouvrier-details',
  templateUrl: './ouvrier-details.component.html',
  styleUrls: ['./ouvrier-details.component.css']
})
export class OuvrierDetailsComponent implements OnInit {

  ouvrier: Ouvrier
  ouvrierByChantier: any;
  showError: boolean = false;
  t: any;

  constructor(private route: ActivatedRoute, private ouvrierService: OuvrierService,
              private spinner: SpinnerService, private toastService: ToastrService,) {
  }

  ngOnInit(): void {
    this.init();
  }

  getOuvrierByChantier(id: number) {
    this.spinner.show();
    this.ouvrierService.getChantierByOuvrier(id).subscribe((response) => {
      let test = JSON.stringify(response);
      this.ouvrierByChantier = JSON.parse(test);
      this.spinner.hide();
    }, error => {
      this.toastService.error(`Une erreur est survenue lors de la récupération des ouvrier par chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  getOuvrierById(id: number) {
    this.spinner.show();
    this.ouvrierService.getOuvrierById(id).subscribe((response) => {
      this.ouvrier = response;
      this.spinner.hide();
    }, error => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  refresh() {
    this.init();
  }

  private init(): void {
    this.route.params.subscribe(params => {
      this.getOuvrierById(params['id']);
      this.getOuvrierByChantier(params['id']);
    });
  }
}
