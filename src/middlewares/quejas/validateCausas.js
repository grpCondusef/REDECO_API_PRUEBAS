import dotenv from "dotenv"; // Importa la biblioteca dotenv
import { getCausaId } from "../../database/quejas.Queries.js";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateCausaIdIsOnRequest = (errors, QuejasCausa, QuejasFolio) => {
  if (!QuejasCausa && errors.length === 0) {
    errors.push(`El campo CausaId o motivo es obligatorio. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateCausaIdIsAString = (errors, QuejasCausa, QuejasFolio) => {
  if (typeof QuejasCausa !== "string") {
    errors.push(`El campo CausaId o motivo debe ser de tipo texto. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateCausaIdIsAStringNoEmpty = (errors, QuejasCausa, QuejasFolio) => {
  if (QuejasCausa.trim() === '' && errors.length === 0) {
    errors.push(`El campo CausaId o motivo es obligatorio. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateCausaIdExist = async (errors, QuejasCausa, institucionClave, QuejasFolio) => {
  try {
    const CausaIdData = await getCausaId(QuejasCausa, institucionClave);

    if (!CausaIdData && errors.length === 0) {
      errors.push(`El campo CausaId o motivo no es válido, no existe en el catálogo o no está vigente. En el folio ${QuejasFolio}.`);
      return true; // Indica que se ha detectado un error
    }
    return false;
  } catch (error) {
    console.log(error);
    return true; // Indica que se ha detectado un error
  }
};

export const validateCausaId = async (quejas, request) => { // Agrega request como parámetro
  const errors = [];
  const { institucionClave } = request; // Obtén institucionClave de request

  // Verifica si quejas es un array
  if (!Array.isArray(quejas)) {
    throw new TypeError('quejas debe ser un array');
  }

  const validateQuejas = async () => {
    for (const queja of quejas) {
      const { QuejasCausa, QuejasFolio } = queja;

      // Realiza las validaciones y acumula los errores
      if (validateCausaIdIsOnRequest(errors, QuejasCausa, QuejasFolio)) continue;
      if (validateCausaIdIsAString(errors, QuejasCausa, QuejasFolio)) continue;
      if (validateCausaIdIsAStringNoEmpty(errors, QuejasCausa, QuejasFolio)) continue;
      if (await validateCausaIdExist(errors, QuejasCausa, institucionClave, QuejasFolio)) continue;
    }
  };

  await validateQuejas();
  return errors; // Devuelve el arreglo de errores
};
