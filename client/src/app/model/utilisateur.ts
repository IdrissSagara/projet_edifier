export class Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  userId: number;
  role: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.role = BASICUSER;
  }

  /**
   * Renvoie vraie si l'utilisateur a les droits
   * pour accéder au menu paramétrage
   */
  peutAccederAuParametrage(): boolean {
    if (this.role === ADMIN) {
      return true;
    }
  }


}

export const ADMIN = 'admin';
export const BASICUSER = 'basic-user';
export const MEDIUMUSER = 'medium-user';
export const ADVANCEDUSER = 'advanced-user';

export const ROLES = [ADMIN, BASICUSER, MEDIUMUSER, ADVANCEDUSER]



