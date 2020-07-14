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
  oldPassword: string;
  newPassword: string;
}

export const ADMIN = 'admin';
export const ADVANCEDUSER = 'advanced-user';
export const MEDIUMUSER = 'medium-user';
export const BASICUSER = 'basic-user';

export const ROLES = [ADMIN, BASICUSER, MEDIUMUSER, ADVANCEDUSER];

export const USER_ROLES = {
  'ADMIN': ADMIN,
  'BASICUSER': BASICUSER,
  'MEDIUMUSER': MEDIUMUSER,
  'ADVANCEDUSER': ADVANCEDUSER
};


