import {OuvrierByChantierModel} from "./chantierOuvrier";

export class Ouvrier {
  id: number;
  nom: string;
  prenom: string;
  telephone: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export class OuvrierByChantier {
  id: number;
  nom: string;
  prenom: string;
  telephone: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  ChantierOuvriers: OuvrierByChantierModel;
}

