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
  currentPage: number;

  constructor(private mouvementService: MouvementService) {
  }

  ngOnInit(): void {
    this.getAllMouvements();
  }

  getAllMouvements(offset = 0) {
    this.isLoading = true;
    this.mouvements = [];
    this.mouvementService.getAllMouvement(offset).then(res => {
      this.errorMessage = undefined;
      this.mouvements = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      this.errorMessage = "erreur de chargement des données";
    }).finally(() => {
      this.isLoading = false;
    });
  }

  pageChandeg(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllMouvements(offset);
  }

}
