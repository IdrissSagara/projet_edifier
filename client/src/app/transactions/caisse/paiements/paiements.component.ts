import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaiementService} from "../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {Paiement} from "../../../model/paiement";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


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
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllPaiement();
  }

  getAllPaiement() {
    this.isLoading = true;
    this.paiements = [];
    this.paiementService.getAllPaiement().then(res => {
      this.errorMessage = undefined;
      this.paiements = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      const message = "erreur de chargement des données";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  UpdatePaiementDialog() {

  }

  confirmationSuppressionDialog() {

  }

  imprimerFacture(paiement: Paiement): void {
    this.paiementService.getPaimentFacture(paiement.id).subscribe((response: any) => {
      const pdf = new Blob([response], {type: 'application/pdf'});

      // création d'une url locale avec le fichier pdf
      const fileUrl = URL.createObjectURL(pdf);


      // https://angular.io/guide/security#bypass-security-apis
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

      setTimeout(() => {
        const doc = this.pdfIframe.nativeElement.contentWindow || this.pdfIframe.nativeElement.contentDocument;
        this.pdfIframe.nativeElement.focus();
        doc.document
        doc.print();
        console.log("print ok")

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
}
