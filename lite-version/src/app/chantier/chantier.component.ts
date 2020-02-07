import { Component, OnInit } from '@angular/core';
import {ChantierService} from "../service/chantier.service";
import {ChantierModel} from "../model/chantierModel";
import {ClientModel} from "../model/clientModel";

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantiers: ChantierModel;
  constructor(private chantierService: ChantierService) { }

  ngOnInit() {
    this.getChantiers();
  }

  async getChantiers() {
    await this.chantierService.getAllChantier().then(res => {
      this.chantiers = res;
      console.log(this.chantiers);
    });
  }


}
