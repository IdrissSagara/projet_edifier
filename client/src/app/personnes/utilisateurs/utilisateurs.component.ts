import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../model/utilisateur";
import {combineLatest, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UtilisateurModalComponent} from "./utilisateur-modal/utilisateur-modal.component";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateur: Utilisateur[];
  newUtilisateur: Utilisateur;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  utilisateurModalRef: BsModalRef;
  currentPage: number;

  constructor(private utilisateurService: UtilisateurService, private toastService: ToastrService,
              private spinner: SpinnerService, private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  getAllUtilisateur() {
    this.utilisateurService.getAllUsers().subscribe((response) => {
      this.utilisateur = response.rows;
      this.totalPages = response.count;
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


}
