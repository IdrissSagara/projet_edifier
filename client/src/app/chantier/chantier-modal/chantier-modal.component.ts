import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Chantier} from "../../model/chantier";
import {ClientService} from "../../services/client.service";
import {ChantierService} from "../../services/chantier.service";
import {ClientModel} from "../../model/clientModel";

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

  constructor(public chantierModalRef: BsModalRef, private clientService: ClientService,
              private chantierService: ChantierService) {
  }

  ngOnInit(): void {
    if (this.chantier === undefined) {
      this.chantier = new Chantier();
    }

    this.getAllClients();
  }

  async confirm() {
    this.buildChantier();

    await this.chantierService.addChantier(this.chantier).then(data => {
      this.chantierModalRef.hide();
    }).catch(err => {
      const erreur = JSON.parse(err.error);
      console.log(erreur);
    }).finally(() => {

    });
  }

  /**
   * Must be search clients on the db
   */
  getAllClients() {
    this.clientService.getAllClient().then((res) => {
      this.clients = res.rows;
    });
  }

  buildChantier() {
    if (!this.advanced) {
      this.chantier.yereta = this.chantier.montant_dispo;
      this.chantier.walita = 0;
    }
  }
}
