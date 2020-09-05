export class Agence {
  id: number;
  rccm: string;
  fiscal: string;
  libelle: string;
  telephone: string;
  fax: string;
  mail: string;
  adresse: string;
  logo: File;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;

  constructor() {
    this.id = 1;
  }
}
