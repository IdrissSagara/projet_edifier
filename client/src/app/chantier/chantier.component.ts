import {Component, OnInit} from '@angular/core';
import {ChantierService} from "../services/chantier.service";

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantiers;

  constructor(private chantierService: ChantierService) {
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
}
