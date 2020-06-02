import {Component, OnInit} from '@angular/core';
import {ROLES, Utilisateur} from "../../../model/utilisateur";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../services/spinner.service";
import {UtilisateurService} from "../../../services/utilisateur.service";

@Component({
  selector: 'app-utilisateur-modal',
  templateUrl: './utilisateur-modal.component.html',
  styleUrls: ['./utilisateur-modal.component.css']
})
export class UtilisateurModalComponent implements OnInit {

  title: string;
  utilisateur: Utilisateur;

  roleUtilisateur = ROLES;

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
      this.utilisateurService.updateUser(this.utilisateur).subscribe((response) => {
        const message = `Modification de l'utilisateur ${this.utilisateur.nom} ${this.utilisateur.prenom} effectuer avec succes`;
        this.utilisateurModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.toastService.error(`Une erreur est survenue lors de la modification du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    } else {
      this.spinner.show();
      this.utilisateurService.createUser(this.utilisateur).subscribe((response) => {
        const message = `Utilisateur creer avec succes`;
        this.utilisateurModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.toastService.error(`Une erreur est survenue lors de l'ajout d'un utilisateur`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    }
  }

}
