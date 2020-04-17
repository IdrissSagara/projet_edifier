import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {MouvementService} from "../../../services/mouvement.service";
import {Mouvement} from "../../../model/mouvement";
import {Chantier} from "../../../model/chantier";
import {ChantierService} from "../../../services/chantier.service";
import {SpinnerService} from "../../../services/spinner.service";

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
              private chantierService: ChantierService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.mouvement.source = this.chantier.id;
    this.getAllChantier();
  }

  getAllChantier() {
    this.spinner.show();
    this.chantierService.getAllChantier().then((res) => {
      this.chantiers = res.rows;
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
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
