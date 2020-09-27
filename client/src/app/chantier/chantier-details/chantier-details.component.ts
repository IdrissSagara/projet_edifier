import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChantierService} from "../../services/chantier.service";
import {Chantier} from "../../model/chantier";
import {MouvementService} from "../../services/mouvement.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {combineLatest, Subscription} from "rxjs";
import {Mouvement} from "../../model/mouvement";
import {MouvementModalComponent} from "../../transactions/caisse/mouvement/mouvement-modal/mouvement-modal.component";
import {SpinnerService} from "../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {Paiement} from "../../model/paiement";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {first} from "rxjs/operators";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../model/photo";
import {environment} from "../../../environments/environment";
import {GalleryItem, ImageItem} from "@ngx-gallery/core";
import {PaiementModalComponent} from "../../transactions/caisse/paiements/paiement-modal/paiement-modal.component";

@Component({
  selector: 'app-chantier-details',
  templateUrl: './chantier-details.component.html',
  styleUrls: ['./chantier-details.component.scss']
})
export class ChantierDetailsComponent implements OnInit {
  chantier: Chantier;
  mouvement: Mouvement;
  paiement: Paiement;
  subscriptions: Subscription[] = [];
  mouvementModalRef: BsModalRef;
  showError: boolean = false;
  images: ImageItem[];
  photos: Photo[] = [];
  cheminImages: string;
  galeryInited: boolean = false;
  showEdit: boolean = false;

  @ViewChild('pdfIframe') pdfIframe: ElementRef;
  pdfUrl: SafeUrl;

  // graph pie
  public pieChartLabels: string[] = ['Cout du chantier', 'yereta', 'walita'];
  public pieChartData: number[];
  public pieChartType = 'pie';
  selectedFiles: FileList;
  fileNinput;
  message = '';
  items: GalleryItem[] = [];

  toastParams = {
    progressBar: true,
    closeButton: true,
    tapToDismiss: false
  };

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
    this.chantierService.getChantierById(id).pipe(first()).subscribe(chantier => {
      this.spinner.hide();
      this.showError = false;
      this.chantier = chantier;
      this.pieChartData = [this.chantier.cout, this.chantier.yereta, this.chantier.walita];
    }, (err) => {
      // afficher une alerte bootstrap
      this.spinner.hide();
      this.showError = true;
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', this.toastParams);
    });
  }

  getAllPictures(id: number) {
    this.spinner.show();
    this.photoService.getPictures(id).pipe(first()).subscribe(photos => {
      this.addItemsToGallery(photos.rows);
      this.spinner.hide();
      this.galeryInited = true;
    }, error => {
      this.spinner.hide();
      this.toastService.error('Une erreur est survenu lors de la récuperation des Images du chantiers', '', this.toastParams);
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
    this.chantierService.getChantierFacture(this.chantier.id).pipe(first()).subscribe((res: any) => {
      this.spinner.hide();
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
      this.spinner.hide();
      const message = "erreur survenue lors de l'impression";
      this.toastService.error(message, '', this.toastParams);
    });
  }

  ajouterImages() {
    this.message = '';
    this.spinner.show();
    this.photoService.uploadPictures(this.selectedFiles, this.chantier.id)
      .pipe(first()).subscribe((uploadedImages) => {
        this.spinner.hide();
        this.selectedFiles = undefined;
        this.fileNinput = "";
        this.addItemsToGallery(uploadedImages);
        this.toastService.success('Les images selectionnées ont été chargées avec succès', '', this.toastParams);
      },
      (error) => {
        this.spinner.hide();
        let msg = "Une erreur est survenue lors du chargement des images";
        if (error.error.message === "File too large") {
          msg = "Une image selectionnée est trop grande pour être chargée. La taille maximale autorisée est de 2048x2048.";
        }
        this.toastService.error(msg, '', this.toastParams);
      });
  }

  private init(): void {
    this.route.params.subscribe(params => {
      const chantierId = params['id'];
      this.cheminImages = `${environment.api_url}/uploads/chantier/${chantierId}/`;
      this.getChantierById(chantierId);
    });
  }

  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  initGalerie(forced?: boolean): void {
    if (forced || !this.galeryInited) {
      this.images = [];
      this.getAllPictures(this.chantier.id);
    }
  }

  deleteImage(id: number): void {
    if (id === -1) {
      return;
    }
    this.spinner.show();
    this.photoService.deletePhotoById(id).pipe(first()).subscribe((res) => {
      this.removeItemFromGallery(id);
      this.toastService.success('Image supprimée avec succès', '', this.toastParams);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la suppression de l'image`, '', this.toastParams);
    });
    // the emit an event to inform the parent
  }

  private addItemsToGallery(photos: Photo[]): void {
    this.photos = [...this.photos, ...photos.map(photo => {
      photo.path = this.cheminImages + photo.path;
      return photo;
    })];
    const newImages = this.convertPhotoToImageItem(photos);

    this.images = [...this.images, ...newImages];
  }

  private removeItemFromGallery(itemId: number): void {
    this.photos = this.photos.filter(photo => {
      return photo.id !== itemId;
    });

    this.images = this.convertPhotoToImageItem(this.photos);
  }

  private convertPhotoToImageItem(photos: Photo[]): ImageItem[] {
    return photos.map(it => {
      return new ImageItem({src: it.path, thumb: it.path});
    });
  }
}
