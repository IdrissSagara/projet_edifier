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

  // graph pie
  public pieChartLabels: string[] = ['Cout du chantier', 'yereta', 'walita'];

  chantier: Chantier;
  public pieChartData: number[];
  public pieChartType = 'pie';

  constructor(private route: ActivatedRoute, private chantierService: ChantierService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async getChantierById(id: number) {
    await this.chantierService.getChantierById(id).then(chantier => {
      this.chantier = chantier;
      this.pieChartData = [this.chantier.cout, this.chantier.yereta, this.chantier.walita]
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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
