import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../services/client.service";
import {ClientModel} from "../../model/clientModel";
import {combineLatest, Subscription} from "rxjs";
import {ClientModalComponent} from "./client-modal/client-modal.component";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: ClientModel[];
  newClient: ClientModel;
  clientModalRef: BsModalRef;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  currentPage: number;

  constructor(private clientService: ClientService, private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef, private spinner: SpinnerService,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
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

  pageChanged(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllClients(offset);
  }

  getAllClients(offset = 0) {
    // this.isLoading = true;
    this.spinner.show();
    this.clientService.getAllClient(offset).subscribe((res) => {
      this.clients = res.rows;
      this.totalPages = res.count;
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
}
