import { Component, OnInit } from '@angular/core';
import {ChantierService} from "../../service/chantier.service";
import {Router} from "@angular/router";
import {ChantierModel} from "../../model/chantierModel";
import {ClientService} from "../../service/client.service";
import {ClientModel} from "../../model/clientModel";

@Component({
  selector: 'app-chantier-formulaire',
  templateUrl: './chantier-formulaire.component.html',
  styleUrls: ['./chantier-formulaire.component.css']
})
export class ChantierFormulaireComponent implements OnInit {

  constructor(private chantierService: ChantierService, private router: Router, private clientService: ClientService) { }
  emplacement: any;
  cout: any;
  date_debut: any;
  chantier: ChantierModel;
  client: ClientModel[];
  clSel: {
    name, value,
  };
  categories = [];
  ngOnInit() {
    this.getClients();
  }

  async getClients() {
    this.categories = [];
    await this.clientService.getAllClient().then(res => {
      res.map(cl => {
        this.categories.push({
          name: cl.nom + " " + cl.prenom, value: cl.id,
        });
      });
      console.log(this.categories);
    });
  }

  /*
  ajout du chantier
   */
  async addChantier() {
    console.log("submit");
    console.log(this.clSel);
    await this.chantierService.addChantier({
      clientId: this.clSel.value,
      emplacement: this.emplacement,
      cout: this.cout,
      date_debut: this.date_debut,
    }).then( data => {
      this.router.navigate(['/chantier']);
    }).catch(err => {
      console.log(err);
      const erreur = JSON.parse(err.error);
    });
  }

}
