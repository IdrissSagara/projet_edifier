import {Mouvement} from "./mouvement";

export interface Reporting {
  chantiers: number;
  clients: number;
  ouvriers: number;
  affectedOuvriers: number;
  users: number;
  lastMouvement: Mouvement[];
  chantiersNotCompleted: {
    count: number;
    rows: number[];
  };
  incompletePaiements: {
    chantierId: number;
    cout: number;
    paid: number;
  }[];
  noPaiment: {
    id: number
  }[];
}
