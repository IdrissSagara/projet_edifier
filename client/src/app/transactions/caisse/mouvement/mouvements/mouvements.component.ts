import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../../services/mouvement.service";
import {SpinnerService} from "../../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {finalize, first} from "rxjs/operators";
import {Mouvement} from "../../../../model/mouvement";

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

  constructor(private mouvementService: MouvementService, private spinner: SpinnerService,
              private toastService: ToastrService,) {
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
    this.mouvementService.getAllMouvement(offset).pipe(first(), finalize(() => this.spinner.hide())).subscribe(res => {
      this.errorMessage = undefined;
      this.mouvements = res.rows;
      this.totalPages = res.count;
    }, err => {
      this.errorMessage = "Erreur de chargement des données";
      this.toastService.error('Une erreur est survenue lors de la récupération des mouvements', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  trackById(_, mouvement: Mouvement): number {
    return mouvement.id;
  }

}
