import {Ouvrier} from "./ouvrier";
import {Chantier} from "./chantier";

export class ChantierByOuvrierModel {
  id: number;
  ChantierId: number;
  OuvrierId: number;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  Ouvrier: Ouvrier;
}

export class OuvrierByChantierModel {
  id: number;
  ChantierId: number;
  OuvrierId: number;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  Chantier: Chantier;
}
