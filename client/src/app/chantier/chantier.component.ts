import {Component, OnInit} from '@angular/core';
import {ChantierService} from "../services/chantier.service";
import {Chantier} from "../model/chantier";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ChantierModalComponent} from "./chantier-modal/chantier-modal.component";

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantiers;
  newChantier: Chantier;
  chantierModalRef: BsModalRef;
  isLoading: Boolean;
  errorMessage: String;

  constructor(private chantierService: ChantierService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getAllChantiers();
  }

  getAllChantiers() {
    this.isLoading = true;
    this.chantiers = [];
    this.chantierService.getAllChantier().then(res => {
      this.errorMessage = undefined;
      this.chantiers = res.rows;
    }).catch(err => {
      this.errorMessage = "data loading error";
      console.log("error during getting all the chantiers");
      console.log(err);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  showAddChantierDialog() {
    const initialState = {
      chantier: this.newChantier,
      title: 'Ajouter un nouveau chantier'
    };
    this.chantierModalRef = this.modalService.show(ChantierModalComponent, {initialState});
    this.chantierModalRef.content.closeBtnName = 'Close';
  }
}
