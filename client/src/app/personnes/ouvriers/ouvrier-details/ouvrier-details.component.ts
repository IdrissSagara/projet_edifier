import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OuvrierService} from "../../../services/ouvrier.service";
import {SpinnerService} from "../../../services/spinner.service";
import {Ouvrier} from "../../../model/ouvrier";
import {ToastrService} from "ngx-toastr";
import {ChantierWithOuvrier} from "../../../model/chantierOuvrier";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {Utilisateur} from "../../../model/utilisateur";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-ouvrier-details',
  templateUrl: './ouvrier-details.component.html',
  styleUrls: ['./ouvrier-details.component.css']
})
export class OuvrierDetailsComponent implements OnInit {

  ouvrier: Ouvrier;
  chantier: ChantierWithOuvrier[];
  showError: boolean = false;
  updatedById: number;
  createdById: number;
  user: Utilisateur;

  constructor(private route: ActivatedRoute, private ouvrierService: OuvrierService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  getOuvrierByChantier(id: number) {
    this.spinner.show();
    this.ouvrierService.getChantierByOuvrier(id).pipe(first()).subscribe((response) => {
      this.spinner.hide();
      this.chantier = response;
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération des ouvrier par chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getOuvrierById(id: number) {
    this.spinner.show();
    this.ouvrierService.getOuvrierById(id).pipe(first()).subscribe((response) => {
      this.spinner.hide();
      this.ouvrier = response;
      this.updatedById = response.updatedBy;
      this.createdById = response.createdBy;
      this.getUtilisateur(this.updatedById);
      this.getUtilisateur(this.createdById);

    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getUtilisateur(id: number) {
    this.spinner.show();
    this.utilisateurService.getUserById(id).pipe(first()).subscribe((res) => {
      this.spinner.hide()
      this.user = res;
    }, error => {
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
