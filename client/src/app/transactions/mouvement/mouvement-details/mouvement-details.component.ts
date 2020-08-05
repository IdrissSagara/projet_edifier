import {Component, OnInit} from '@angular/core';
import {MouvementService} from "../../../services/mouvement.service";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../../services/spinner.service";
import {finalize, first} from "rxjs/operators";
import {Mouvement} from "../../../model/mouvement";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-mouvement-details',
  templateUrl: './mouvement-details.component.html',
  styleUrls: ['./mouvement-details.component.css']
})
export class MouvementDetailsComponent implements OnInit {

  mouvement: Mouvement;

  constructor(private mouvementService: MouvementService, private route: ActivatedRoute,
              private spinner: SpinnerService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.intit();
  }

  intit(): void {
    this.route.params.subscribe(params => {
      this.mouvementService.getMouvementById(params['id']);
    });
  }

  getMouvementById(id: number) {
    this.spinner.show();
    this.mouvementService.getMouvementById(id).pipe(first(), finalize(() => this.spinner.hide())).subscribe((response) => {
      this.mouvement = response;
    }, (error) => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du mouvement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

}
