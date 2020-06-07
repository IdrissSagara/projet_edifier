import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {ClientService} from "../../services/client.service";
import {ClientModel} from "../../model/clientModel";
import {combineLatest, Observable, Subscription} from "rxjs";
import {ClientModalComponent} from "./client-modal/client-modal.component";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {AppState} from "../../store/reducers";
import {Store} from "@ngrx/store";
import {getAllClients} from "./store/client.selectors";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: ClientModel[];
  clients$: Observable<ClientModel[]>;
  newClient: ClientModel;
  clientModalRef: BsModalRef;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  currentPage: number;
  deletedId: number;
  deltedName: string;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;


  constructor(private clientService: ClientService, private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef, private spinner: SpinnerService,
              private toastService: ToastrService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // this.getAllClients();
    this.clients$ = this.store.select(getAllClients);
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

  showUpdateClientDialog(client: ClientModel) {
    const initialState = {
      client: this.newClient = client,
      title: `Modifier le client ${client.nom}  ${client.prenom}`
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

  showDeleteClientDialog(client: ClientModel) {
    this.deletedId = client.id;
    this.deltedName = client.nom + " " + client.prenom;
    this.dangerModal.show();
  }

  declineSupprimeOuvrier() {
    this.dangerModal.hide();
  }

  confirmSupprimerOuvrier() {
    this.spinner.show();
    this.clientService.deleteClientById(this.deletedId).subscribe(res => {
      this.getAllClients();
      this.toastService.success('Ouvrier suppimer avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
      this.dangerModal.hide();
      this.spinner.hide();
    }, (err) => {
      this.dangerModal.hide();
      this.spinner.hide();
      const message = 'Une erreur est survenu lors de la suppression de l\'ouvrier';
      this.toastService.error(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
    });
  }
}
