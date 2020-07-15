import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../../model/utilisateur";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {AuthService} from "../../../services/auth.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {combineLatest, Subscription} from "rxjs";
import {ChangePasswordModalComponent} from "../change-password-modal/change-password-modal.component";
import {finalize, first} from "rxjs/operators";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent implements OnInit {

  /**
   * Instance de l'utilisateur dont on affiche les détails
   */
  utilisateur: Utilisateur;

  /**
   * Utilisateur courant de l'application
   */
  utilisateurCourant: Utilisateur;

  subscriptions: Subscription[] = [];
  utilisateurModalRef: BsModalRef;

  constructor(private route: ActivatedRoute, private activatedRoute: ActivatedRoute, private spinner: SpinnerService,
              private toastService: ToastrService, private utilisateurService: UtilisateurService, private authService: AuthService,
              private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idUtilisateur = params['id'];
      if (typeof idUtilisateur === 'undefined') {
        // profile. On recupère l'utilisateur courant
        this.utilisateur = this.authService._utilisateurCourant;
      } else {
        // on a accédé au composant par /utilisateurs/:id
        this.getUtilisateurById(params['id']);
      }
    });

    this.utilisateurCourant = this.authService._utilisateurCourant;
  }

  getUtilisateurById(id: number) {
    this.spinner.show();
    this.utilisateurService.getUserById(id).pipe(first(), finalize(() => this.spinner.hide())).subscribe((res) => {
      this.utilisateur = res;
    }, error => {

    });
  }


  modeProfil(): boolean {
    return this.utilisateurCourant?.userId === this.utilisateur.id;
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  updatePassword(utilisateur: Utilisateur) {
    const initialState = {
      utilisateur: utilisateur,
      title: `Changer votre mot de passe`
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
          this.getUtilisateurById(utilisateur.id);
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.utilisateurModalRef = this.modalService.show(ChangePasswordModalComponent, {initialState});
    this.utilisateurModalRef.content.closeBtnName = 'Close';
  }
}
