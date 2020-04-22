import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OuvrierService} from "../../services/ouvrier.service";
import {Ouvrier} from "../../model/ouvrier";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {combineLatest, Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {OuvrierModalComponent} from "./ouvrier-modal/ouvrier-modal.component";

@Component({
  selector: 'app-ouvriers',
  templateUrl: './ouvriers.component.html',
  styleUrls: ['./ouvriers.component.css']
})
export class OuvriersComponent implements OnInit {
  ouvrier: Ouvrier[];
  ouvriers: Ouvrier;
  totalPage: number;
  errorMessage: String;
  subscriptions: Subscription[] = [];
  ouvrierModalRef: BsModalRef;

  constructor(private ouvrierService: OuvrierService, private toastService: ToastrService,
              private spinner: SpinnerService,
              private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  ngOnInit(): void {
    this.getAllOuvrier();
  }

  getAllOuvrier() {
    this.spinner.show();
    this.ouvrierService.getAllOuvrier().subscribe((response) => {
      this.ouvrier = response.rows;
      this.totalPage = response.count;
      this.spinner.hide();
    }, error => {
      this.toastService.error('Une erreur est survenu lors de la recupération des ouvriers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  showAddOuvrierDialog() {
    const initialState = {
      ouvrier: this.ouvriers = new Ouvrier(),
      title: 'Ajouter un ouvrier'
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
          this.getAllOuvrier();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.ouvrierModalRef = this.modalService.show(OuvrierModalComponent, {initialState});
    this.ouvrierModalRef.content.closeBtnName = 'Close';
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
