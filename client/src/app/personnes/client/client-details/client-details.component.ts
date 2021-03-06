import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {Utilisateur} from "../../../model/utilisateur";
import {ClientService} from "../../../services/client.service";
import {ClientModel} from "../../../model/clientModel";
import {Chantier} from "../../../model/chantier";
import {Select, Store} from "@ngxs/store";
import {ClientState} from "../../../store/client/client.state";
import {Observable, Subscription} from "rxjs";
import {first, map, tap} from "rxjs/operators";
import {GetClients} from "../../../store/client/client.actions";
import {UtilisateurService} from "../../../services/utilisateur.service";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  client$: Observable<ClientModel>;
  showError: boolean = false;
  user: Utilisateur;
  chantiers: Chantier[];
  @Select(ClientState.areClientsLoaded) areClientsLoaded$;
  areCoursesLoadedSub: Subscription;

  constructor(private route: ActivatedRoute, private clientService: ClientService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private store: Store, private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  getChantierOfClient(id: number) {
    this.spinner.show();
    this.clientService.getChantierOfClient(id).pipe(first()).subscribe((response) => {
      this.spinner.hide();
      this.chantiers = response;
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération des chantiers du client`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getUser(id: number) {
    this.spinner.show();
    this.utilisateurService.getUserById(id).pipe(first()).subscribe(response => {
      this.spinner.hide();
      this.user = response;
    }, error => {
      this.spinner.show();
      this.toastService.warning(`Une erreur est survenue lors de la récupération de l'uitlisateur`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getClientById(id: number) {
    this.spinner.show();
    this.clientService.getClientById(id).pipe(first()).subscribe(res => {
      this.getUser(res.createdBy);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  init(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getClientById(id);
      this.areCoursesLoadedSub = this.areClientsLoaded().subscribe(value => {
      });

      this.client$ = this.store.select(ClientState.getClientById).pipe(
        map(filterFn => filterFn(id))
      );
      this.getChantierOfClient(id);
    });
  }

  areClientsLoaded() {
    return this.areClientsLoaded$.pipe(
      tap((areCoursesLoaded) => {
        if (!areCoursesLoaded) {
          this.spinner.show();
          this.store.dispatch(new GetClients()).toPromise().finally(() => {
            this.spinner.hide();
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.areCoursesLoadedSub.unsubscribe();
  }
}
