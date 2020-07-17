import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChantierService} from "../../services/chantier.service";
import {Chantier} from "../../model/chantier";
import {MouvementService} from "../../services/mouvement.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {combineLatest, Observable, Subscription} from "rxjs";
import {Mouvement} from "../../model/mouvement";
import {MouvementModalComponent} from "../../transactions/mouvement/mouvement-modal/mouvement-modal.component";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {Paiement} from "../../model/paiement";
import {PaiementModalComponent} from "../paiement-modal/paiement-modal.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {finalize, first} from "rxjs/operators";
import {PhotoService} from "../../services/photo.service";
import {HttpResponse} from "@angular/common/http";
import {Photo} from "../../model/photo";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-chantier-details',
  templateUrl: './chantier-details.component.html',
  styleUrls: ['./chantier-details.component.css']
})
export class ChantierDetailsComponent implements OnInit {
  chantier: Chantier;
  mouvement: Mouvement;
  paiement: Paiement;
  subscriptions: Subscription[] = [];
  mouvementModalRef: BsModalRef;
  showError: boolean = false;
  photos: Photo[] = [];
  cheminImages: string;
  myInterval: number | false = 1000;
  noWrapSlides: boolean = false;
  activeSlideIndex: number = 0;
  @ViewChild('pdfIframe') pdfIframe: ElementRef;
  pdfUrl: SafeUrl;

  // graph pie
  public pieChartLabels: string[] = ['Cout du chantier', 'yereta', 'walita'];
  public pieChartData: number[];
  public pieChartType = 'pie';
  selectedFiles: FileList;
  message = '';
  fileInfos: Observable<any>;

  constructor(private route: ActivatedRoute, private chantierService: ChantierService,
              private mouvementService: MouvementService, private sanitizer: DomSanitizer,
              private modalService: BsModalService, private toastService: ToastrService,
              private changeDetection: ChangeDetectorRef, private spinner: SpinnerService,
              private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async getChantierById(id: number) {
    this.spinner.show();
    this.chantierService.getChantierById(id).pipe(first(), finalize(() => this.spinner.hide())).subscribe(chantier => {
      this.showError = false;
      this.chantier = chantier;
      this.pieChartData = [this.chantier.cout, this.chantier.yereta, this.chantier.walita];
      this.getAllPictures(this.chantier.id);
    }, (err) => {
      // afficher une alerte bootstrap
      this.showError = true;
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }


  private init(): void {
    this.route.params.subscribe(params => {
      this.getChantierById(params['id']);
    });
  }


  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }


  addMouvement() {
    const initialState = {
      chantier: this.chantier,
      mouvement: this.mouvement = new Mouvement(),
      title: `Effectuer un mouvement du chantier ${this.chantier.id}`
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
          this.init();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.mouvementModalRef = this.modalService.show(MouvementModalComponent, {initialState});
    this.mouvementModalRef.content.closeBtnName = 'Close';
  }

  refresh() {
    this.init();
  }

  effectuerUnPaiement() {
    const initialState = {
      chantier: this.chantier,
      paiement: this.paiement = new Paiement(),
      title: `Effectuer un paiement du client : ${this.chantier.Client.nom}
      ${this.chantier.Client.prenom} pour le chantier ${this.chantier.id} à ${this.chantier.emplacement}`
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
          this.init();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.mouvementModalRef = this.modalService.show(PaiementModalComponent, {initialState});
    this.mouvementModalRef.content.closeBtnName = 'Close';

  }

  genererFacture(): void {
    this.spinner.show();
    this.chantierService.getChantierFacture(this.chantier.id).pipe(first(), finalize(() => this.spinner.hide())).subscribe((res: any) => {
      const pdf = new Blob([res], {type: 'application/pdf'});

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

    }, error => {
      console.log(error);
      const message = "erreur survenu lors de l'inpression";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    });
  }

  ajouterImages() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.photoService.uploadPictures(file, this.chantier.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.fileInfos = this.photoService.getPictures(this.chantier.id);
        }
      },
      err => {
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  getAllPictures(id: number) {
    this.photoService.getPictures(id).pipe(first()).subscribe(photos => {
      this.photos = photos.rows;
      this.cheminImages = `${environment.api_url}/uploads/chantier/${this.chantier.id}/`;
    }, error => {
      this.toastService.error('Une erreur est survenu lors de la récuperation des Images du chantiers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }


  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  trakByName(_, photo: Photo): string {
    return photo.path;
  }
}
