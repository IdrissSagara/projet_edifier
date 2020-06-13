import {ClientModel} from "../../../model/clientModel";

export class GetClients {
  static readonly type = '[Clients] Get Clients';
}

export class AddClient {
  static readonly type = '[Client] Create Client';

  constructor(public payload: ClientModel) {
  }
}

export class DeleteClient {
  static readonly type = '[Client] Delete Client';

  constructor(public id: number) {
  }
}

export class UpdateClient {
  static readonly type = '[Client] Update Client';

  constructor(public id: number, public payload: ClientModel) {
  }
}
