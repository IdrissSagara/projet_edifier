import {Client} from './client';

export class Chantier {
  id: number;
  ClientId: Client;
  Client: Client;
  emplacement: string;
  cout: number;
  date_debut: string;
  date_fin: string;
  walita: number;
  yereta: number;
  montant_dispo: number;
  createdAt: string;
  updatedAt: string;
}
