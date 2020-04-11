import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChantierService} from "../../services/chantier.service";
import {Chantier} from "../../model/chantier";

@Component({
  selector: 'app-chantier-details',
  templateUrl: './chantier-details.component.html',
  styleUrls: ['./chantier-details.component.css']
})
export class ChantierDetailsComponent implements OnInit {

  chantier: Chantier;
  isCollapsed: boolean = false;

  constructor(private route: ActivatedRoute, private chantierService: ChantierService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async getChantierById(id: number) {
    await this.chantierService.getChantierById(id).then(chantier => {
      this.chantier = chantier;
      console.log(this.chantier);
    }).catch(err => {
      console.log(err);
    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  private init(): void {
    this.route.params.subscribe(params => {
      this.getChantierById(params['id']);
    });
  }

}
