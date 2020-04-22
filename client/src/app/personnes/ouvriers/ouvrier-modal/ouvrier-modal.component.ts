import {Component, OnInit} from '@angular/core';
import {Ouvrier} from "../../../model/ouvrier";
import {BsModalRef} from "ngx-bootstrap";
import {OuvrierService} from "../../../services/ouvrier.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";

@Component({
  selector: 'app-ouvrier-modal',
  templateUrl: './ouvrier-modal.component.html',
  styleUrls: ['./ouvrier-modal.component.css']
})
export class OuvrierModalComponent implements OnInit {

  title: string;
  ouvrier: Ouvrier;
  typeOuvrier: any = ['Maçon', 'Menusier', 'Maitre maçon',]

  constructor(public ouvrierModalRel: BsModalRef, private ouvrierService: OuvrierService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
  }

  addOuvrier() {
    this.spinner.show();
    this.ouvrierService.addOuvrier(this.ouvrier).subscribe((response) => {
      const message = `Modification de l'ouvier ${this.ouvrier.nom} ${this.ouvrier.prenom} effectuer avec succes`;
      this.ouvrierModalRel.hide();
      this.toastService.success(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la modification de l'ouvrier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });

  }
}
