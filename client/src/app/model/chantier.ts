export class Chantier {
  id: number;
  ClientId: number;
  Client: EmbededClient;
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

export interface EmbededClient {
  nom: string;
  prenom: string;
  telephone: string;
}
