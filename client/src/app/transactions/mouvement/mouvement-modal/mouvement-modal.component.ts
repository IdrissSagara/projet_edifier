import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {MouvementService} from "../../../services/mouvement.service";
import {Mouvement} from "../../../model/mouvement";
import {Chantier} from "../../../model/chantier";
import {ChantierService} from "../../../services/chantier.service";
import {SpinnerService} from "../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-mouvement-modal',
  templateUrl: './mouvement-modal.component.html',
  styleUrls: ['./mouvement-modal.component.css']
})
export class MouvementModalComponent implements OnInit {
  title: string;
  mouvement: Mouvement;
  chantiers: Chantier[];
  chantier: Chantier;

  constructor(public mouvementModalRef: BsModalRef, private mouvementService: MouvementService,
              private chantierService: ChantierService, private spinner: SpinnerService,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.mouvement.source = this.chantier.id;
    this.getAllChantier();
  }

  getAllChantier() {
    this.spinner.show();
    this.chantierService.getAllChantier().subscribe((res) => {
      this.chantiers = res.rows;
      this.spinner.hide();
    }, (err) => {
      console.log(err);
      this.toastService.error(`Une erreur est survenue lors de la
      récupération de la liste des chantiers`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    });
  }

  async addMouvement() {
    this.spinner.show();
    await this.mouvementService.addMouvement(this.mouvement).then(data => {
      this.mouvementModalRef.hide();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
