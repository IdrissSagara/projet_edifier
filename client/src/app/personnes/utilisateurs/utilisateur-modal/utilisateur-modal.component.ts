import {Component, OnInit} from '@angular/core';
import {ROLES, Utilisateur} from "../../../model/utilisateur";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {finalize, first} from "rxjs/operators";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-utilisateur-modal',
  templateUrl: './utilisateur-modal.component.html',
  styleUrls: ['./utilisateur-modal.component.css']
})
export class UtilisateurModalComponent implements OnInit {

  title: string;
  utilisateur: Utilisateur;
  password2input: string = null;
  roleUtilisateur = ROLES;
  erreursServeurs: any = {};

  constructor(public utilisateurModalRel: BsModalRef, private toastService: ToastrService,
              private spinner: SpinnerService, private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
  }

  modeModification(): boolean {
    return this.utilisateur.id !== undefined;
  }

  addUtilisateur() {
    if (this.modeModification()) {
      this.spinner.show();
      this.utilisateurService.updateUser(this.utilisateur).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
        const message = `Modification de l'utilisateur ${this.utilisateur.nom} ${this.utilisateur.prenom} effectuer avec succes`;
        this.utilisateurModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, error => {
        this.toastService.error(`Une erreur est survenue lors de la modification du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    } else {
      this.spinner.show();
      this.utilisateurService.createUser(this.utilisateur).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
        const message = `Utilisateur creer avec succes`;
        this.utilisateurModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, error => {
        this.toastService.error(`Une erreur est survenue lors de l'ajout d'un utilisateur`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    }
  }

  motDePasseAVerifier(): boolean {
    return !this.modeModification();
  }

  inputEnErreur(input: NgModel): boolean {
    // validation côté client (validation html)
    if (input.invalid && input.touched) {
      return true;
    }

    if (input.untouched && input.errors && !input.errors.required) {
      return true;
    }
    return this.erreursServeurs.hasOwnProperty(input.name);
  }

}
