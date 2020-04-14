export interface Paiement {
  id: number;
  ChantierId: number;
  date_paiement: string;
  montant: number;
  montant_restant: number;
  type: string;
  commentaire: string;
  createdAt: string;
  updatedAt: string;
}
