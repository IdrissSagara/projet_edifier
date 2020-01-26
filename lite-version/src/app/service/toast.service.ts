import {Injectable} from '@angular/core';
import {ToastOptions, ToastyService} from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastyService: ToastyService ) { }

  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
  // loading toast
  toastChargement() {
    this.addToast({title: 'Chargement',
      msg: '',
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
      type: 'wait',
      position: 'top-center',
      closeOther: true});
  }
  // Succes Toast
  toastSucces() {
    this.addToast({title: '👍🏾',
      msg: 'Client enregistré avec succes',
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
      type: 'success',
      position: 'bottom-right',
      closeOther: true});
  }

  toastError(message) {
    this.addToast({title: 'Erreur',
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
      type: 'error',
      position: 'bottom-right',
      closeOther: true});
  }
}
