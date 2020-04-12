import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../services/mouvement.service";

@Component({
  selector: 'app-mv-entrant',
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css']
})
export class MouvementsComponent implements OnInit {
  mouvements;
  errorMessage: String;
  isLoading: Boolean;
  totalPages: number;

  constructor(private mouvementService: MouvementService) {
  }

  ngOnInit(): void {
    this.getAllMouvements();
  }

  getAllMouvements() {
    this.isLoading = true;
    this.mouvements = [];
    this.mouvementService.getAllMouvement().then(res => {
      this.errorMessage = undefined;
      this.mouvements = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      this.errorMessage = "erreur de chargement des données";
    }).finally(() => {
      this.isLoading = false;
    });
  }

}
