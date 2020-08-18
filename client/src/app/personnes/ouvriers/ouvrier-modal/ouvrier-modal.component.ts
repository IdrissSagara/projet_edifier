import {Component, OnInit} from '@angular/core';
import {Ouvrier, TYPES_OUVRIER} from "../../../model/ouvrier";
import {BsModalRef} from "ngx-bootstrap/modal";
import {OuvrierService} from "../../../services/ouvrier.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";
import {catchError, finalize, first} from "rxjs/operators";
import {of} from "rxjs";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-ouvrier-modal',
  templateUrl: './ouvrier-modal.component.html',
  styleUrls: ['./ouvrier-modal.component.css']
})
export class OuvrierModalComponent implements OnInit {

  title: string;
  ouvrier: Ouvrier;
  types_ouvrier = TYPES_OUVRIER;
  erreursServeur: any;

  constructor(public ouvrierModalRel: BsModalRef, private ouvrierService: OuvrierService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
  }

  modeModification(): boolean {
    return this.ouvrier.id !== undefined;
  }

  addOuvrier() {
    if (this.modeModification()) {
      this.spinner.show();
      this.ouvrierService.updateOuvrier(this.ouvrier).pipe(first(), catchError((error) => {
        this.spinner.hide();
        this.erreursServeur = error.error.errors[0].msg;
        this.toastService.error(`Erreur survenue : ${this.erreursServeur} , lors de la modification de l'ouvrier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        return of(error);
      })).subscribe((response) => {
        if (!!response.error && response.error.errors.length) {
          return;
        }
        console.log('response', response);
        const message = `Modification de l'ouvrier ${this.ouvrier.nom} ${this.ouvrier.prenom} effectuée avec succès`;
        this.ouvrierModalRel.hide();
        this.spinner.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      },);
    } else {
      this.spinner.show();
      this.ouvrierService.addOuvrier(this.ouvrier).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
        const message = `Ouvrier créé avec succès`;
        this.ouvrierModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, error => {
        this.toastService.error(`Une erreur est survenue lors de l'ajout  l'ouvrier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    }
  }

  inputEnErreur(input: NgModel): boolean {
    if (input.invalid && input.touched) {
      return true;
    }

    if (input.untouched && input.errors && !input.errors.required) {
      return true;
    }
    return this.erreursServeur;
  }
}
