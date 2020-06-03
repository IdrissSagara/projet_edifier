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

  constructor() {
    this.type = ESPÈCE;
  }
}

export const ESPÈCE = 'Espèce';
export const CHEQUE = 'Chèque';
export const VIREMENT_BANCAIRE = 'Virement bancaire';

export const TYPES_PAIEMENTS = [ESPÈCE, CHEQUE, VIREMENT_BANCAIRE];
