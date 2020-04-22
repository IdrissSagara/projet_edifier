import {Component, OnInit} from '@angular/core';
import {OuvrierService} from "../../services/ouvrier.service";
import {Ouvrier} from "../../model/ouvrier";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-ouvriers',
  templateUrl: './ouvriers.component.html',
  styleUrls: ['./ouvriers.component.css']
})
export class OuvriersComponent implements OnInit {
  ouvrier: Ouvrier[]
  totalPage: number;
  errorMessage: String;

  constructor(private ouvrierService: OuvrierService, private toastService: ToastrService,
              private spinner: SpinnerService) {
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  ngOnInit(): void {
    this.getAllOuvrier();
  }

  getAllOuvrier() {
    this.spinner.show();
    this.ouvrierService.getAllOuvrier().subscribe((response) => {
      this.ouvrier = response.rows;
      this.totalPage = response.count;
      this.spinner.hide();
    }, error => {
      this.toastService.error('Une erreur est survenu lors de la recupération des ouvriers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }
}
