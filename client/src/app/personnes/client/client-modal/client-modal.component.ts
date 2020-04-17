import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ClientModel} from "../../../model/clientModel";
import {ClientService} from "../../../services/client.service";
import {SpinnerService} from "../../../services/spinner.service";

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {
  title: string;
  client: ClientModel;

  constructor(public clientModalRef: BsModalRef, private clientService: ClientService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    if (this.client === undefined) {
      this.client = new ClientModel();
    }
  }

  async confirm() {
    this.spinner.show();
    await this.clientService.addClient(this.client).then(res => {
      this.clientModalRef.hide();
    }).catch((err) => {
      const erreur = JSON.parse(err.error);
      console.log(erreur);
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
