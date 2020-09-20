import {BackendValidationError, ExtractedError, ExtractedErrorTypes} from "./errors-model";

export function handleAPIErrors(error): ExtractedError {
  let errors: ExtractedError = {
    type: ExtractedErrorTypes.Unknown,
    message: `Une erreur inconnue est survenue lors de la validation du formulaire`,
    errors: [],
  };

  if (error.status === 422) {
    errors = extractUnprocessableEntityErrors(error);
  }

  return errors;
}

export function extractUnprocessableEntityErrors(error): ExtractedError {
  return {
    type: ExtractedErrorTypes.UnprocessableEntity,
    message: `L'entité envoyé n'a pas pu être traitée car certains champs ne sont pas conformes. Corrigez-les puis réessayez`,
    errors: !!error.error.errors ? detailFieldErrors(error.error.errors) : undefined
  };
}

export function detailFieldErrors(errors: []) {
  let details = {};
  errors.map((err: BackendValidationError) => {
    details[`${err.param}`] = err;
  });

  return details;
}
