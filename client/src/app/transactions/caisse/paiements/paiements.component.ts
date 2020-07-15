import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaiementService} from "../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {Paiement} from "../../../model/paiement";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SpinnerService} from "../../../services/spinner.service";
import {finalize, first} from "rxjs/operators";


@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {
  paiements;
  errorMessage: String;
  isLoading: Boolean;
  totalPages: number;
  currentPage: number;
  @ViewChild('pdfIframe') pdfIframe: ElementRef;
  pdfUrl: SafeUrl;

  constructor(private paiementService: PaiementService, private toastService: ToastrService,
              private sanitizer: DomSanitizer, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.getAllPaiement();
  }

  getAllPaiement(offset = 0) {
    // this.isLoading = true;
    this.spinner.show();
    this.paiements = [];
    this.paiementService.getAllPaiement(offset).pipe(first(), finalize(() => this.spinner.hide())).subscribe(res => {
      this.errorMessage = undefined;
      this.paiements = res.rows;
      this.totalPages = res.count;
    }, err => {
      const message = "erreur de chargement des données";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    });
  }

  UpdatePaiementDialog() {

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
