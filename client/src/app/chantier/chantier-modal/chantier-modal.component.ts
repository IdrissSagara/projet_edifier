import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Chantier} from "../../model/chantier";
import {ClientService} from "../../services/client.service";
import {ChantierService} from "../../services/chantier.service";
import {ClientModel} from "../../model/clientModel";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-chantier-modal',
  templateUrl: './chantier-modal.component.html',
  styleUrls: ['./chantier-modal.component.css']
})

// https://www.jonashendrickx.com/2019/04/25/using-ngx-bootstraps-modal-separate-component/
// https://valor-software.com/ngx-bootstrap/#/modals
// https://stackblitz.com/run?file=app%2Fngx-bootstrap-demo.component.ts

export class ChantierModalComponent implements OnInit {
  title: string;
  chantier: Chantier;
  clients: ClientModel[];
  advanced: Boolean = false;


  // titreModal: String;

  constructor(public chantierModalRef: BsModalRef, private clientService: ClientService,
              private chantierService: ChantierService, private toastService: ToastrService,
              private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    if (this.chantier === undefined) {
      this.chantier = new Chantier();
    } else {
      this.chantier.date_debut = new Date().toISOString().split('T')[0];
      this.chantier.date_fin = new Date().toISOString().split('T')[0];
    }

    this.getAllClients();
  }

  modeModification(): boolean {
    return this.chantier.id !== undefined;
  }

  async confirm() {
    this.buildChantier();

    if (this.modeModification()) {
      this.chantierModalRef.hide();
      this.spinner.show();
      await this.chantierService.updateChantier(this.chantier).subscribe(chantier => {
        const message = `Modification du chantier ${this.chantier.id} effectuer avec succes`;
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastService.error(`Une erreur est survenue lors de la mise à jour du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    } else {
      this.spinner.show();
      this.chantierService.addChantier(this.chantier).subscribe(data => {
        this.chantierModalRef.hide();
        this.toastService.success('Le chantier à été ajouté avec succes', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.toastService.error(`Une erreur est survenue lors de l'ajout du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.spinner.hide();
      });
    }
  }

  /**
   * Must be search clients on the db
   */
  getAllClients() {
    this.spinner.show();
    this.clientService.getAllClient().subscribe((res) => {
      this.clients = res.rows;
      this.spinner.hide();
    }, (err) => {
      console.log(err);
      this.toastService.error('Une erreur est survenue lors de la récupération des clients', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  buildChantier() {
    if (!this.advanced) {
      this.chantier.yereta = this.chantier.montant_dispo;
      this.chantier.walita = 0;
    }
  }
}
