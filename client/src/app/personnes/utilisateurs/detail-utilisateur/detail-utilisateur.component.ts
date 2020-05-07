import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../../model/utilisateur";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../../../services/utilisateur.service";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent implements OnInit {

  utilisateur: Utilisateur;
  showError: boolean = false;

  constructor(private route: ActivatedRoute, private spinner: SpinnerService, private toastService: ToastrService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  getUtilisateur(id: number) {
    this.utilisateurService.getUserById(id).subscribe((res) => {
      this.utilisateur = res;
    }, error => {

    });
  }

  private init(): void {
    this.route.params.subscribe(params => {
      this.getUtilisateur(params['id']);
    });
  }

}
