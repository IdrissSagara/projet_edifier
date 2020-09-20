import {BackendValidationError, ExtractedError, ExtractedErrorTypes} from "./errors-model";

export class ErrorHandler {
  static handleAPIErrors(error): ExtractedError {
    let errors: ExtractedError;
    if (error.status === 422) {
      errors = this.extractUnprocessableEntityErrors(error);
    }

    return errors;
  }

  static extractUnprocessableEntityErrors(error): ExtractedError {
    return {
      type: ExtractedErrorTypes.UnprocessableEntity,
      message: `L'entité envoyé n'a pas pu être traitée. Certains champs ne sont pas conformes`,
      errors: !!error.error.errors ? this.detailFieldErrors(error.error.errors) : undefined
    };
  }

  static detailFieldErrors(errors: []) {
    let details = {};
    errors.map((err: BackendValidationError) => {
      details[`${err.param}`] = err;
    });

    return details;
  }
}

