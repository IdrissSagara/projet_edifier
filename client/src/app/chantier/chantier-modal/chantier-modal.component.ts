import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Chantier} from "../../model/chantier";

@Component({
  selector: 'app-chantier-modal',
  templateUrl: './chantier-modal.component.html',
  styleUrls: ['./chantier-modal.component.css']
})

// https://www.jonashendrickx.com/2019/04/25/using-ngx-bootstraps-modal-separate-component/
// https://valor-software.com/ngx-bootstrap/#/modals

export class ChantierModalComponent implements OnInit {
  title: string;
  chantier: Chantier;

  constructor(public chantierModalRef: BsModalRef) {
  }

  ngOnInit(): void {

  }

  confirm() {

  }
}
