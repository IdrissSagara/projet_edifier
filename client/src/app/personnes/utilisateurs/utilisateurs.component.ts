import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../model/utilisateur";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateur: Utilisateur[];
  newUtilisateur: Utilisateur;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  currentPage: number;

  constructor(private utilisateurService: UtilisateurService, private toastService: ToastrService,
              private spinner: SpinnerService,) {
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  getAllUtilisateur() {
    this.utilisateurService.getAllUsers().subscribe((response) => {
      this.utilisateur = response.rows;
      this.totalPages = response.count;
    }, (err) => {
      this.toastService.error('Une erreur est survenue lors de la récupération des clients', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

}
