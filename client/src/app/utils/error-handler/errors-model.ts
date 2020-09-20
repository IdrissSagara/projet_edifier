export interface ExtractedError {
  type: ExtractedErrorTypes;
  message: string;
  errors: {};
}

export interface BackendValidationError {
  location: string;
  msg: string;
  param: string;
}

export enum ExtractedErrorTypes {
  UnprocessableEntity,
  Unauthorized,
}
