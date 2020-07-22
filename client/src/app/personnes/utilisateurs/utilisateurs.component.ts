import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {USER_ROLES, Utilisateur} from "../../model/utilisateur";
import {combineLatest, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {UtilisateurModalComponent} from "./utilisateur-modal/utilisateur-modal.component";
import {AuthService} from "../../services/auth.service";
import {finalize, first} from "rxjs/operators";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[];
  newUtilisateur: Utilisateur;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  utilisateurModalRef: BsModalRef;
  currentPage: number;
  isLoading: Boolean;
  curentUser: Utilisateur;
  deletedId: number;
  deltedName: string;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(private utilisateurService: UtilisateurService, private toastService: ToastrService,
              private spinner: SpinnerService, private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  getAllUtilisateur(offset = 0) {
    this.spinner.show();
    this.utilisateurService.getAllUsers(offset).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
      this.utilisateurs = response.rows;
      this.totalPages = response.count;
      this.curentUser = this.authService._utilisateurCourant;
    }, (err) => {
      this.toastService.error('Une erreur est survenue lors de la récupération des clients', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  showAddUserDialog() {
    const initialState = {
      utilisateur: this.newUtilisateur = new Utilisateur(),
      title: 'Ajouter un nouveau utilisateur'
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
          this.getAllUtilisateur();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.utilisateurModalRef = this.modalService.show(UtilisateurModalComponent, {initialState});
    this.utilisateurModalRef.content.closeBtnName = 'Close';
  }

  canEdit() {
    return [USER_ROLES.ADMIN, USER_ROLES.ADVANCEDUSER].includes(this.authService.getRole());
  }

  canDelete() {
    return [USER_ROLES.ADMIN].includes(this.authService.getRole());
  }

  trackById(_, utilisateur: Utilisateur): number {
    return utilisateur.id;
  }

  showUpdateUserDialog(utilisateur: Utilisateur) {
    const initialState = {
      utilisateur: this.newUtilisateur = utilisateur,
      title: `Modifier l'utilisateur : ${this.newUtilisateur.nom + ' ' + this.newUtilisateur.prenom}`
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
          this.getAllUtilisateur();
        }

        this.unsubscribe();
      })
    );
    this.subscriptions.push(_combine);

    this.utilisateurModalRef = this.modalService.show(UtilisateurModalComponent, {initialState});
    this.utilisateurModalRef.content.closeBtnName = 'Close';

  }

  pageChanged(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllUtilisateur(offset);
  }

  declineSupprimeUtilisateur() {
    this.dangerModal.hide();
  }

  confirmSupprimerUtilisateur() {
    this.spinner.show();
    this.utilisateurService.deleteUserById(this.deletedId).pipe(first(), finalize(() => this.spinner.hide())).subscribe(res => {
      this.getAllUtilisateur();
      this.toastService.success('Utilisateur suppimer avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
      this.dangerModal.hide();
    }, (err) => {
      this.dangerModal.hide();
      const message = 'Une erreur est survenu lors de la suppression de l\'utilisateur';
      this.toastService.error(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
    });

  }

  supressionUserDialog(utilisateur: Utilisateur) {
    this.deletedId = utilisateur.id;
    this.deltedName = utilisateur.nom + " " + utilisateur.prenom;
    this.dangerModal.show();
  }
}

