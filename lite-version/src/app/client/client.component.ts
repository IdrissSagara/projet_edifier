import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../model/clientModel';
import {ClientService} from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: ClientModel[];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
     this.getClients();
  }
  // recuperation des clients
   async getClients() {
      await this.clientService.getAllClient().then(res => {
        this.client = res;
      });
  }



}
