import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Client} from '../../../models/client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  @Input() showDialog = true;
  @Input() client: Client;
  dialogTitle: string;
  @Output() onDialogHide = new EventEmitter(true);
  @Output() clientSuccessfullyCreated = new EventEmitter<Client>(true);
  @ViewChild('formulaire') formulaire: NgForm;

  constructor() {
  }

  ngOnInit() {
  }

  setDialogTitle() {
    setTimeout(() => {
      this.dialogTitle = 'Inserer un client';
    });
  }

  validerFormulaire() {

  }

  onShow() {
    this.setDialogTitle();
  }

  onHide() {
    this.onDialogHide.emit();
  }

  resetFormulaire() {
    this.formulaire.reset();
    this.client = new Client();
  }

}
