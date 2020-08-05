import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {MouvementService} from "../../../../services/mouvement.service";
import {Mouvement} from "../../../../model/mouvement";
import {Chantier} from "../../../../model/chantier";
import {ChantierService} from "../../../../services/chantier.service";
import {SpinnerService} from "../../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {finalize, first} from "rxjs/operators";

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
    this.chantierService.getAllChantier().pipe(first(), finalize(() => this.spinner.hide())).subscribe((res) => {
      this.chantiers = res.rows;
    }, (err) => {
      console.log(err);
      this.toastService.error(`Une erreur est survenue lors de la
      récupération de la liste des chantiers`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  async addMouvement() {
    this.spinner.show();
    await this.mouvementService.addMouvement(this.mouvement).pipe(first(), finalize(() => this.spinner.hide())).subscribe(data => {
      this.mouvementModalRef.hide();
      this.toastService.success(`Le mouvement a été ajouté avec succès`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    }, err => {
      console.log(err);
      this.toastService.error(`Une erreur est survenue lors de l'ajout du mouvement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }
}
