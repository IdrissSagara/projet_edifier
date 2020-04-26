import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {Utilisateur} from "../../../model/utilisateur";
import {ClientService} from "../../../services/client.service";
import {ClientModel} from "../../../model/clientModel";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: ClientModel;
  showError: boolean = false;
  updatedById: number;
  createdById: number;
  user: Utilisateur;

  constructor(private route: ActivatedRoute, private clientService: ClientService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  getClientById(id: number) {
    this.spinner.show();
    this.clientService.getClientById(id).subscribe((response) => {
      this.client = response;
      // this.updatedById = response.updatedBy;
      // this.createdById = response.createdBy;
      this.spinner.hide();
      // this.getUtilisateur(this.updatedById);
      // this.getUtilisateur(this.createdById);

    }, error => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du client`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  init(): void {
    this.route.params.subscribe(params => {
      this.getClientById(params['id']);
    });
  }

  refresh() {

  }
}
