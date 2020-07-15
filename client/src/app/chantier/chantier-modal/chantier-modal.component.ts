import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Chantier} from "../../model/chantier";
import {ClientService} from "../../services/client.service";
import {ChantierService} from "../../services/chantier.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {finalize, first} from "rxjs/operators";

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
  clients: [{ id: number, text: string }];
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
      await this.chantierService.updateChantier(this.chantier).pipe(first()).subscribe(chantier => {
        const message = `Modification du chantier ${this.chantier.id} effectuer avec succes`;
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, err => {
        this.toastService.error(`Une erreur est survenue lors de la mise à jour du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, () => {
        this.spinner.hide();
      });
    } else {
      this.spinner.show();
      this.chantierService.addChantier(this.chantier).pipe(first(), finalize(() => this.spinner.hide())).subscribe(data => {
        this.chantierModalRef.hide();
        this.toastService.success('Le chantier à été ajouté avec succès', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, error => {
        console.log(error);
        this.toastService.error(`Une erreur est survenue lors de l'ajout du chantier`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    }
  }

  /**
   * Must be search clients on the db
   */
  getAllClients() {
    this.spinner.show();
    this.clientService.getAllClient().pipe(first(), finalize(() => this.spinner.hide())).subscribe((res) => {
      this.clients = [Object.assign([])];
      res.rows.map(c => {
        const elt = {id: c.id, text: c.nom + " " + c.prenom};
        if (this.clients.indexOf(elt) === -1) {
          this.clients.push(elt);
        }
      });
    }, (err) => {
      console.log(err);
      this.toastService.error('Une erreur est survenue lors de la récupération des clients', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  search($event) {
    if ($event.length < 3) {
      return;
    }

    this.spinner.show();
    this.clientService.search($event).pipe(first(), finalize(() => this.spinner.hide())).subscribe((res) => {
      this.clients = [Object.assign([])];
      res.rows.map(c => {
        const elt = {id: c.id, text: c.nom + " " + c.prenom};
        if (this.clients.indexOf(elt) === -1) {
          this.clients.push(elt);
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

  buildChantier() {
    if (!this.advanced) {
      this.chantier.yereta = this.chantier.montant_dispo;
      this.chantier.walita = 0;
    }
  }
}
