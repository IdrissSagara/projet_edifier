import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaiementService} from "../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {Paiement} from "../../../model/paiement";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SpinnerService} from "../../../services/spinner.service";
import {finalize, first} from "rxjs/operators";
import {combineLatest, Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PaiementModalComponent} from "./paiement-modal/paiement-modal.component";


@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {
  paiements: Paiement[];
  errorMessage: String;
  isLoading: Boolean;
  totalPages: number;
  currentPage: number;
  subscriptions: Subscription[] = [];
  paiementModalRef: BsModalRef;
  @ViewChild('pdfIframe') pdfIframe: ElementRef;
  pdfUrl: SafeUrl;

  constructor(private paiementService: PaiementService, private toastService: ToastrService,
              private sanitizer: DomSanitizer, private spinner: SpinnerService, private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllPaiement();
  }

  getAllPaiement(offset = 0) {
    this.spinner.show();
    this.paiementService.getAllPaiement(offset).pipe(first(), finalize(() => this.spinner.hide())).subscribe(res => {
      this.errorMessage = undefined;
      console.log('i ma tou mi!!');
      this.paiements = res.rows;
      this.totalPages = res.count;
    }, err => {
      const message = "erreur de chargement des données";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  UpdatePaiementDialog(paiement: Paiement) {
    const initialState = {
      paiement: paiement,
      title: `Modifier le paiement : ${paiement.id} du chantier : ${paiement.ChantierId}`
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
          this.getAllPaiement();
        }
        this.unsubscribe();
      })
    );
    this.subscriptions.push(_combine);

    this.paiementModalRef = this.modalService.show(PaiementModalComponent, {initialState});
    this.paiementModalRef.content.closeBtnName = 'Close';
  }

  confirmationSuppressionDialog() {

  }

  imprimerFacture(paiement: Paiement): void {
    this.spinner.show();
    this.paiementService.getPaimentFacture(paiement.id).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response: any) => {
      const pdf = new Blob([response], {type: 'application/pdf'});

      // création d'une url locale avec le fichier pdf
      const fileUrl = URL.createObjectURL(pdf);


      // https://angular.io/guide/security#bypass-security-apis
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

      setTimeout(() => {
        const doc = this.pdfIframe.nativeElement.contentWindow || this.pdfIframe.nativeElement.contentDocument;
        this.pdfIframe.nativeElement.focus();
        doc.print();

        // nettoyage de l'url généré
        URL.revokeObjectURL(fileUrl);
      }, 1000);

    }, err => {
      console.log(err);
      const message = "erreur survenu lors de l'inpression";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    });
  }

  pageChanged(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllPaiement(offset);
  }

  trackById(_, paiement: Paiement): number {
    return paiement.id;
  }
}
