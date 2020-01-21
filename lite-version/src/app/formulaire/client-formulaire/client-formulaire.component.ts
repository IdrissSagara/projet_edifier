import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../service/client.service';
import {ClientModel} from '../../model/clientModel';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {error} from "util";
import {ToastService} from '../../service/toast.service';

@Component({
  selector: 'app-client-formulaire',
  templateUrl: './client-formulaire.component.html',
  styleUrls: ['./client-formulaire.component.css']
})
export class ClientFormulaireComponent implements OnInit {

  constructor(private clientService: ClientService, private toastService: ToastService , private toastyService: ToastyService) { }
  client: ClientModel;
  nom: string;
  prenom: string;
  telephone: string;
  position = 'bottom-right';
  ngOnInit() {
  }

  /*
  *méthode d'enregistrement d'un client
   */
  async sendClient() {
    this.toastService.toastChargement();
    await this.clientService.addClient({
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
    }).then( data => {
      this.toastService.toastSucces();
    }).catch(err => {
      console.log(err);
      const erreur = JSON.parse(err.error);
      this.toastService.addToast({title: 'Erreur',
        msg: `Erreur lors de l\'enregistrement`,
        showClose: true,
        timeout: 5000,
        theme: 'bootstrap',
        type: 'error',
        position: 'bottom-right',
        closeOther: true});
    });
  }

}
