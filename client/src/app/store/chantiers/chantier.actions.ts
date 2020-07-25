import {Chantier} from "../../model/chantier";

export class GetChantiers {
  static readonly type = '[Chantiers] Get';

  constructor(public offset: number) {
  }
}

export class GetChantierById {
  static readonly type = '[Chantiers] Get by id';

  constructor(public id: number) {
  }
}

export class AddChantier {
  static readonly type = '[Chantiers] Create';

  constructor(public payload: Chantier) {
  }
}

export class DeleteChantier {
  static readonly type = '[Chantiers] Delete';

  constructor(public id: number) {
  }
}

export class UpdateChantier {
  static readonly type = '[Chantiers] Update';

  constructor(public id: number, public payload: Chantier) {
  }
}

