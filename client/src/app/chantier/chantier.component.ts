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

  constructor(private chantierService: ChantierService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getAllChantiers();
  }

  getAllChantiers() {
    this.chantierService.getAllChantier().then(res => {
      this.chantiers = res.rows;
    }).catch(err => {
      console.log("error during getting all the chantiers");
      console.log(err);
    });
  }

  showAddChantierDialog() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.chantierModalRef = this.modalService.show(ChantierModalComponent, {initialState});
    this.chantierModalRef.content.closeBtnName = 'Close';
  }
}
