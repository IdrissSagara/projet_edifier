import {Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  /** Nombre d'ouvertures encore actives. */
  iterationOfShow = 0;

  /** Nom du spinner. */
  private readonly name = 'primary';

  /** Façade sur le spinner. */
  constructor(
    private spinnerSrv: NgxSpinnerService) {
    spinnerSrv.getSpinner(this.name).subscribe(spinner => {
      if (spinner && !spinner.show) {
        this.iterationOfShow = 0;
      }
    });
  }

  /** Indique si le spinner est visible. */
  get isVisible(): boolean {
    return this.iterationOfShow > 0;
  }

  /** Affiche le spinner, si ce n'était déjà le cas. */
  show() {
    try {
      if (this.iterationOfShow++ < 1) {
        this.spinnerSrv.show(this.name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** Cache le spinner si possible. */
  hide() {
    try {
      if (this.iterationOfShow < 1) {
        return;
      }

      if (this.iterationOfShow-- === 1) {
        this.spinnerSrv.hide(this.name);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
