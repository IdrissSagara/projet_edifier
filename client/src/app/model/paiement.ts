export class Paiement {
  id: number;
  chantierId: number;
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
    this.type = ESPECE;
  }
}

export const ESPECE = 'Especes';
export const CHEQUE = 'Cheque';
export const VIREMENT_BANCAIRE = 'Virement';

export const TYPES_PAIEMENTS = [ESPECE, CHEQUE, VIREMENT_BANCAIRE];
