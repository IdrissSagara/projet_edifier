import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ClientModel} from "../../../model/clientModel";
import {ClientService} from "../../../services/client.service";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {NgModel} from "@angular/forms";
import {UtilService} from "../../../services/util.service";

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
              private spinner: SpinnerService, private toastService: ToastrService) {
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
      await this.clientService.updateClient(this.client).subscribe(res => {
        this.toastService.success(` Client modifier avec succes`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        this.clientModalRef.hide();
        this.spinner.hide();
      }, err => {
        if (err.status === 422) {
          const responseJSON = JSON.stringify(err);
          this.erreursServeur = UtilService.flattenObject(responseJSON);
          this.toastService.error(`le numero de telephone est trop court`, '', {
            progressBar: true,
            closeButton: true,
            tapToDismiss: false
          });
        } else {
          this.toastService.error(`Une erreur est survenu lors de la modification`, '', {
            progressBar: true,
            closeButton: true,
            tapToDismiss: false
          });
        }
        this.spinner.hide();
      });

    } else {
      this.spinner.show();
      await this.clientService.addClient(this.client).subscribe(res => {
        this.clientModalRef.hide();
        this.spinner.hide();
      }, (err) => {
        const erreur = JSON.parse(err.error);
        console.log(erreur);
        this.toastService.error('Une erreur est survenue lors de la création du client', '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
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
