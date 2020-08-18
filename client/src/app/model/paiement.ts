export class Paiement {
  id: number;
  ChantierId: number;
  date_paiement: string;
  montant: number;
  montant_restant: number;
  type: string;
  commentaire: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;

  constructor() {
    this.type = ESPÈCE;
  }
}

export const ESPÈCE = 'especes';
export const CHEQUE = 'cheque';
export const VIREMENT_BANCAIRE = 'virement';

export const TYPES_PAIEMENTS = [ESPÈCE, CHEQUE, VIREMENT_BANCAIRE];
