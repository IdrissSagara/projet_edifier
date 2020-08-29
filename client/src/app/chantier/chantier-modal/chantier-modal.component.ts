import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Chantier} from "../../model/chantier";
import {ClientService} from "../../services/client.service";
import {ChantierService} from "../../services/chantier.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {catchError, first, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {AddChantier, UpdateChantier} from "../../store/chantiers/chantier.actions";
import {of} from "rxjs";

const toastParams = {
  progressBar: true,
  closeButton: true,
  tapToDismiss: false
};

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

  constructor(public chantierModalRef: BsModalRef, private clientService: ClientService,
              private chantierService: ChantierService, private toastService: ToastrService,
              private spinner: SpinnerService, private readonly store: Store) {
  }

  ngOnInit(): void {
    if (this.chantier === undefined) {
      this.chantier = new Chantier();
    } else {
      this.chantier.date_debut = this.formatDateForForm(this.chantier.date_debut);
      this.chantier.date_fin = this.formatDateForForm(this.chantier.date_fin);
    }
    this.getAllClients();
  }

  modeModification(): boolean {
    return this.chantier.id !== undefined;
  }

  formatDateForForm(date: string) {
    return !!date ? date.split('T')[0] : null;
  }

  confirm() {
    this.buildChantier();

    if (this.modeModification()) {
      this.applyModification();
    } else {
      this.addNew();
    }
  }

  applyModification() {
    this.spinner.show();
    this.store.dispatch(new UpdateChantier(this.chantier.id, this.chantier, this.chantier.Client)).pipe(
      first(),
    ).subscribe(() => {
      this.spinner.show();
      this.chantierModalRef.hide();
      const message = `Modification du chantier ${this.chantier.id} effectuer avec succes`;
      this.toastService.success(message, '', toastParams);
    }, () => {
      this.spinner.show();
      this.toastService.error(`Une erreur est survenue lors de la mise à jour du chantier`, '', toastParams);
    });
  }

  addNew() {
    this.spinner.show();
    this.store.dispatch(new AddChantier(this.chantier)).pipe(
      first()
    ).subscribe(() => {
      this.chantierModalRef.hide();
      this.spinner.hide();
      this.toastService.success('Le chantier à été ajouté avec succès', '', toastParams);
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de l'ajout du chantier`, '', toastParams);
    });
  }

  /**
   * Must be search clients on the db
   */
  getAllClients() {
    this.spinner.show();
    this.clientService.getAllClient().pipe(
      first(),
      tap(() => this.spinner.hide())
    ).subscribe(this.getFormattedClients(), (err) => {
      this.spinner.hide();
      this.toastService.error('Une erreur est survenue lors de la récupération des clients', '', toastParams);
    });
  }

  search($event) {
    if ($event.length < 3) {
      return;
    }

    this.spinner.show();
    this.clientService.search($event).pipe(
      first(),
      tap(() => this.spinner.hide()),
      catchError((err) => {
        this.spinner.hide();
        return of(err);
      })
    ).subscribe(this.getFormattedClients(), (err) => {
      this.spinner.hide();
    });
  }

  private getFormattedClients() {
    return (clients) => {
      this.clients = [Object.assign([])];
      clients.rows.map(c => {
        const elt = {id: c.id, text: c.nom + " " + c.prenom};
        if (this.clients.indexOf(elt) === -1) {
          this.clients.push(elt);
        }
      });
    };
  }

  buildChantier() {
    if (!this.advanced) {
      this.chantier.yereta = this.chantier.montant_dispo;
      this.chantier.walita = 0;
    }
  }
}
