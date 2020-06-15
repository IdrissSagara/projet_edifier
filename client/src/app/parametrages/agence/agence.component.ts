import {Component, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";
import {Agence} from "../../model/agence";

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  showError: boolean = false;
  agence: Agence;
  erreursServeur: an
  y;

  constructor() {
  }

  ngOnInit(): void {
  }

  enregistrerFormulaire(logoInput: HTMLInputElement) {

  }

  inputEnErreur(input: NgModel) {

  }
}
