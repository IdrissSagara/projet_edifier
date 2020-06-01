import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";
import {Utilisateur} from "../../../model/utilisateur";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  title: string;

  utilisateur: Utilisateur;

  erreursServeurs: any = {};

  ancienMotDePasse: string;

  /**
   * Utilisée pour vérifier que la confirmation du mot de passe est identique au mot de passe
   */
  password2input: string = null;

  constructor(public utilisateurModalRel: BsModalRef, private utilisateurService: UtilisateurService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
  }

  updatePassword() {
    this.spinner.show();
    this.utilisateurService.changePassword(this.utilisateur).subscribe((response) => {
      this.toastService.success('Le mot de passe à été modifier avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
      this.utilisateurModalRel.hide();
    }, error => {
      console.log(error);
      this.toastService.error(`Une erreur est survenue lors de la modification du mot de passe`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
      this.utilisateurModalRel.hide();
    });

  }

  /**
   * Renvoie true si le input est en erreur
   * @param input
   * @returns {boolean}
   */
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


  /**
   * Renvoie vraie si la confirmation du mot de passe correspond au mot de passe saisie
   * @returns {boolean}
   */
  motsDePasseEgaux(): boolean {
    return this.password2input === this.utilisateur.newPassword;
  }


}
