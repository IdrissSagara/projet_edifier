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

  constructor() {
    this.type = MACON;
  }
}

export const MACON = 'Maçon';
export const MENUISIER = 'Menuisier';
export const CHEF_MACON = 'Chef maçon';
export const ELECTRICIEN = 'Electricien';

export const TYPES_OUVRIER = [MACON, MENUISIER, CHEF_MACON, ELECTRICIEN];
