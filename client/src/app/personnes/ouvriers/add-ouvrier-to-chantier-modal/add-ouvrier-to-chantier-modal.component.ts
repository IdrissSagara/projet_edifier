import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {OuvrierService} from "../../../services/ouvrier.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";
import {ChantierService} from "../../../services/chantier.service";
import {finalize, first} from "rxjs/operators";

@Component({
  selector: 'app-add-ouvrier-to-chantier-modal',
  templateUrl: './add-ouvrier-to-chantier-modal.component.html',
  styleUrls: ['./add-ouvrier-to-chantier-modal.component.css']
})
export class AddOuvrierToChantierModalComponent implements OnInit {
  title: string;
  ouvrierId: number;
  chantierId: number;
  chantiers: [{ id: number, text: string }];
  chantierCourant: number;

  constructor(public ouvrierModalRel: BsModalRef, private ouvrierService: OuvrierService,
              private toastService: ToastrService, private spinner: SpinnerService,
              private chantierService: ChantierService) {
  }

  ngOnInit(): void {
    this.getAllChantier();
  }


  addOuvrierToChantier() {
    this.spinner.show();
    this.ouvrierService.addOuvrierInChantier(this.ouvrierId, this.chantierId).pipe(first(), finalize(() => this.spinner.hide())).subscribe(res => {
      this.toastService.success('L\'ouvrier à été ajouté avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.ouvrierModalRel.hide();
    }, error => {
      console.log(error);
      this.toastService.error(`Une erreur est survenue lors de l'ajout de l'ouvrier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.ouvrierModalRel.hide();
    });

  }

  getAllChantier(offset = 0) {
    this.spinner.show();
    this.chantierService.getAllChantier(offset).pipe(first(), finalize(() => this.spinner.hide())).subscribe((chantier) => {

      this.chantiers = [Object.assign({})];
      chantier.rows.map(c => {
        const elt = {
          id: c.id,
          text: "Chantier du client " + c.Client.nom + " " + c.Client.prenom + " à " + c.emplacement
        };
        if (this.chantiers.indexOf(elt) === -1) {
          this.chantiers.push(elt);
        }
      });
    }, err => {
      // this.errorMessage = "data loading error";
      this.toastService.error('Une erreur est survenu lors de la récuperation des chantiers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }
}
