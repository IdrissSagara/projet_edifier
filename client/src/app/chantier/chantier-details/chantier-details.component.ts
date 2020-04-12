import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChantierService} from "../../services/chantier.service";
import {Chantier} from "../../model/chantier";
import {MouvementService} from "../../services/mouvement.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {combineLatest, Subscription} from "rxjs";
import {Mouvement} from "../../model/mouvement";
import {MouvementModalComponent} from "../../transactions/mouvement/mouvement-modal/mouvement-modal.component";

@Component({
  selector: 'app-chantier-details',
  templateUrl: './chantier-details.component.html',
  styleUrls: ['./chantier-details.component.css']
})
export class ChantierDetailsComponent implements OnInit {
  chantier: Chantier;
  mouvement: Mouvement;
  subscriptions: Subscription[] = [];
  mouvementModalRef: BsModalRef;

  // graph pie
  public pieChartLabels: string[] = ['Cout du chantier', 'yereta', 'walita'];
  public pieChartData: number[];
  public pieChartType = 'pie';

  constructor(private route: ActivatedRoute, private chantierService: ChantierService,
              private mouvementService: MouvementService,
              private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
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


  private init(): void {
    this.route.params.subscribe(params => {
      this.getChantierById(params['id']);
    });
  }


  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }


  addMouvement() {
    const initialState = {
      chantier: this.chantier,
      mouvement: this.mouvement = new Mouvement(),
      title: `Effectuer un mouvement du chantier ${this.chantier.id}`
    };

    const _combine = combineLatest(
      this.modalService.onShown,
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onShown.subscribe((reason: string) => {
        // initialisa
      })
    );
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        if (reason === null) {
          this.init();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.mouvementModalRef = this.modalService.show(MouvementModalComponent, {initialState});
    this.mouvementModalRef.content.closeBtnName = 'Close';

  }
}
