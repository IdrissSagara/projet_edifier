import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ClientModel} from "../../../model/clientModel";
import {ClientService} from "../../../services/client.service";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {NgModel} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AddClient, UpdateClient} from "../../../store/client/client.actions";

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {
  title: string;
  client: ClientModel;

  @Input() erreursServeur: any = {};

  constructor(public clientModalRef: BsModalRef, private clientService: ClientService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private store: Store) {
  }

  ngOnInit(): void {
    if (this.client === undefined) {
      this.client = new ClientModel();
    }
  }

  modeModification(): boolean {
    return this.client.id !== undefined;
  }

  async confirm() {
    if (this.modeModification()) {
      this.spinner.show();
      this.store.dispatch(new UpdateClient(this.client.id, this.client)).toPromise().then((res) => {
        this.clientModalRef.hide();
        this.toastService.success('Client modifié avec succès', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).catch((err) => {
        this.toastService.error('Une erreur est survenue lors de la création du client', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).finally(() => {
        this.spinner.hide();
      });
    } else {
      this.spinner.show();
      this.store.dispatch(new AddClient(this.client)).toPromise().then((res) => {
        this.clientModalRef.hide();
        this.toastService.success('Le client a été ajouté avec succès', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).catch((err) => {
        this.toastService.error('Une erreur est survenue lors de la création du client', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }).finally(() => {
        this.spinner.hide();
      });
    }
  }

  inputEnErreur(input: NgModel): boolean {

    // validation côté client (validation html)
    if (input.invalid && input.touched) {
      return true;
    }

    if (input.untouched && input.errors && !input.errors.required) {
      return true;
    }


    return this.erreursServeur.hasOwnProperty(input.name);
  }
}
