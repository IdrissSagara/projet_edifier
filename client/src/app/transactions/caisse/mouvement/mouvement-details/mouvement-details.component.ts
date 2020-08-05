import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../../services/mouvement.service";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../../services/spinner.service";
import {finalize, first} from "rxjs/operators";
import {Mouvement} from "../../../../model/mouvement";
import {ToastrService} from "ngx-toastr";
import {ChantierService} from "../../../../services/chantier.service";
import {Chantier} from "../../../../model/chantier";

@Component({
  selector: 'app-mouvement-details',
  templateUrl: './mouvement-details.component.html',
  styleUrls: ['./mouvement-details.component.css']
})
export class MouvementDetailsComponent implements OnInit {

  mouvement: Mouvement;
  chantierSource: Chantier;
  chantierDestination: Chantier;
  showError: boolean = false;

  constructor(private mouvementService: MouvementService, private route: ActivatedRoute,
              private spinner: SpinnerService, private toastService: ToastrService,
              private chantierService: ChantierService) {
  }

  ngOnInit(): void {
    this.intit();
  }

  intit(): void {
    this.route.params.subscribe(params => {
      this.getMouvementById(params['id']);
    });
  }

  getMouvementById(id: number) {
    this.spinner.show();
    this.mouvementService.getMouvementById(id).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
      this.mouvement = response;
      this.getChantierSource();
      this.getChantierDestination();
    }, (error) => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du mouvement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getChantierSource() {
    this.chantierService.getChantierById(this.mouvement.source).subscribe((response) => {
      this.chantierSource = response;
    }, error => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getChantierDestination() {
    this.chantierService.getChantierById(this.mouvement.destination).subscribe((response) => {
      this.chantierDestination = response;
    }, error => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  refresh() {
    this.intit();
  }
}
