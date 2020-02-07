import {ClientModel} from "./clientModel";

export interface ChantierModel {
  id: number;
  ClientId: ClientModel;
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
