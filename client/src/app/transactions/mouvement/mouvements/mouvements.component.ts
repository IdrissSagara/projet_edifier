import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../services/mouvement.service";
import {SpinnerService} from "../../../services/spinner.service";

@Component({
  selector: 'app-mv-entrant',
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css']
})
export class MouvementsComponent implements OnInit {
  mouvements;
  errorMessage: String;
  totalPages: number;
  currentPage: number;

  constructor(private mouvementService: MouvementService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.getAllMouvements();
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  pageChandeg(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllMouvements(offset);
  }

  getAllMouvements(offset = 0) {
    this.spinner.show();
    this.mouvements = [];
    this.mouvementService.getAllMouvement(offset).then(res => {
      this.errorMessage = undefined;
      this.mouvements = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      this.errorMessage = "erreur de chargement des données";
    }).finally(() => {
      this.spinner.hide();
    });
  }

}
