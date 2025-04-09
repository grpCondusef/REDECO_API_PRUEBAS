import dotenv from "dotenv"; // Importa la biblioteca dotenv
import { getMedioRecepcion } from "../../database/quejas.Queries.js";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateMedioRecIsOnRequest = (errors, QuejasMedio, QuejasFolio) => {
  if (!QuejasMedio && errors.length === 0) {
    errors.push(`El campo Medio de recepción o canal es obligatorio. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateMedioRecIsANumber = (errors, QuejasMedio, QuejasFolio) => {
  if (typeof QuejasMedio !== "number" && errors.length === 0) {
    errors.push(`El campo Medio de recepción o canal debe ser de tipo number. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateMedioRecExist = async (errors, QuejasMedio, QuejasFolio ) => {
    const QuejasMedioExists = await getMedioRecepcion(QuejasMedio);

    if (QuejasMedioExists) {
      errors.push(`El campo Medio de recepción o canal no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
      return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateMedioRec = async (quejas) => {
  const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasMedio, QuejasFolio } = queja;

            // Realiza las validaciones y acumula los errores
            if (validateMedioRecIsOnRequest(errors, QuejasMedio, QuejasFolio)) break;
            if (validateMedioRecIsANumber(errors, QuejasMedio, QuejasFolio)) break;
            if (await validateMedioRecExist(errors, QuejasMedio, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
