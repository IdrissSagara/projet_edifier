import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../service/client.service';
import {ClientModel} from '../../model/clientModel';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {ToastService} from '../../service/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-formulaire',
  templateUrl: './client-formulaire.component.html',
  styleUrls: ['./client-formulaire.component.css']
})
export class ClientFormulaireComponent implements OnInit {

  constructor(private clientService: ClientService, private toastService: ToastService ,
              private toastyService: ToastyService, private router: Router) { }
  client: ClientModel;
  nom: string;
  prenom: string;
  telephone: string;
  ngOnInit() {
  }

  /*
  *méthode d'enregistrement d'un client
   */
  async sendClient() {
    await this.clientService.addClient({
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
    }).then( data => {
      this.router.navigate(['/client']);
    }).catch(err => {
      console.log(err);
      const erreur = JSON.parse(err.error);
      this.toastService.addToast({title: 'Material Toasty',
        msg: `${erreur}`,
        timeout: 5000,
        theme: 'bootstrap',
        position: 'bottom-right',
        type: 'error'});
    });
  }

}
