import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ClientService} from "../../services/client.service";
import {ClientModel} from "../../model/clientModel";
import {combineLatest, Subscription} from "rxjs";
import {ClientModalComponent} from "./client-modal/client-modal.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: ClientModel[];
  newClient: ClientModel;
  clientModalRef: BsModalRef;
  isLoading: Boolean;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];

  constructor(private clientService: ClientService, private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.isLoading = true;
    this.clientService.getAllClient().then((res) => {
      this.clients = res.rows;
      this.totalPages = res.count;
      this.isLoading = true;
    }).catch((err) => {
      this.isLoading = false;
      console.log(err);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  showAddClientDialog() {
    const initialState = {
      client: this.newClient,
        title: 'Ajouter un nouveau client'
      };

      const _combine = combineLatest(
        this.modalService.onShown,
        this.modalService.onHidden
      ).subscribe(() => this.changeDetection.markForCheck());

      this.subscriptions.push(
        this.modalService.onShown.subscribe((reason: string) => {
          // initialisa
        })
      );
      this.subscriptions.push(
        this.modalService.onHidden.subscribe((reason: string) => {
          if (reason === null) {
            this.getAllClients();
          }
          this.unsubscribe();
        })
      );

      this.subscriptions.push(_combine);

      this.clientModalRef = this.modalService.show(ClientModalComponent, {initialState});
      this.clientModalRef.content.closeBtnName = 'Close';
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
