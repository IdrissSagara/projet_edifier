import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../services/mouvement.service";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

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
    this.mouvementService.getAllMouvement(offset).subscribe(res => {
      this.errorMessage = undefined;
      this.mouvements = res.rows;
      this.totalPages = res.count;
      this.spinner.hide();
    }, err => {
      this.errorMessage = "erreur de chargement des données";
      this.spinner.hide();
      this.toastService.error('Une erreur est survenue lors de la récupération des mouvements', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

}
