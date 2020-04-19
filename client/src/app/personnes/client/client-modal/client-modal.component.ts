import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ClientModel} from "../../../model/clientModel";
import {ClientService} from "../../../services/client.service";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {
  title: string;
  client: ClientModel;

  constructor(public clientModalRef: BsModalRef, private clientService: ClientService,
              private spinner: SpinnerService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    if (this.client === undefined) {
      this.client = new ClientModel();
    }
  }

  async confirm() {
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
