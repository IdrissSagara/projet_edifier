import {Component, OnInit} from '@angular/core';
import {PaiementModel} from '../../model/Paiement';
import {PaiementService} from '../../service/paiement.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  paiements: PaiementModel[];
  constructor(private paiementSercvice: PaiementService) { }

  ngOnInit() {
    console.log(this.paiementSercvice.getAllPaiements());
  }

}
