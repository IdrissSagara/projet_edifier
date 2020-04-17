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
      await this.chantierService.updateChantier(this.chantier).then(chantier => {
        const message = `Modification du chantier ${this.chantier.id} effectuer avec succes`;
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).catch(err => {

      }).finally(() => {
        this.spinner.hide();
      });
    } else {
      await this.chantierService.addChantier(this.chantier).then(data => {
        this.chantierModalRef.hide();
        this.spinner.show();
        this.toastService.success('Le chantier à été ajouter avec succes', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).catch(err => {
        const erreur = JSON.parse(err.error);
        console.log(erreur);
      }).finally(() => {
        this.spinner.hide();
      });
    }
  }

  /**
   * Must be search clients on the db
   */
  getAllClients() {
    this.clientService.getAllClient().then((res) => {
      this.spinner.show();
      this.clients = res.rows;
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
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
