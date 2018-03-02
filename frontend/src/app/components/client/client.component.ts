import {Component, OnInit} from '@angular/core';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {Client} from '../../models/client';

@Component({
  selector: 'app-client', templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  showDialog = false;
  clientToAdd: Client = new Client();

  constructor(private toastyService: ToastyService) {
  }

  ngOnInit() {
  }

  initDataTable() {
    // Initialiser ici le contenu de la table des clients
  }

  onHide(): void {
    this.showDialog = false;
    this.initDataTable();
  }

  showClientDialog() {
    console.log('Bien reçu commandant!!');
    this.showDialog = true;
    this.clientToAdd = new Client();
  }

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
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added removed!');
      }
    };

    switch (options.type) {
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
