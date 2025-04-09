import dotenv from 'dotenv';
import { getNivelAtencion } from '../../database/quejas.Queries.js';

dotenv.config();

const validateNivelAtencionIsOnRequest = (errors, QuejasNivelAT, QuejasFolio) => {
    if (!QuejasNivelAT && errors.length === 0) {
        errors.push(`El campo Nivel de atención o contacto es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateNivelAtencionIsANumber = (errors, QuejasNivelAT, QuejasFolio) => {
    if (typeof QuejasNivelAT !== 'number' && errors.length === 0) {
        errors.push(`El campo Nivel de atención o contacto debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateNivelAtencionNotExist = async (errors, QuejasNivelAT, QuejasFolio) => {
    try {
        const ConsultasNivelatenExists = await getNivelAtencion(QuejasNivelAT);

        if (!ConsultasNivelatenExists && errors.length === 0) {
            errors.push(`El campo Nivel de atención o contacto no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

export const validateNivelAtencion = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasNivelAT, QuejasFolio } = queja;

            // Realiza las validaciones y acumula los errores
            if (validateNivelAtencionIsOnRequest(errors, QuejasNivelAT, QuejasFolio)) break;
            if (validateNivelAtencionIsANumber(errors, QuejasNivelAT, QuejasFolio)) break;
            if (await validateNivelAtencionNotExist(errors, QuejasNivelAT, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
