import dotenv from 'dotenv';
import { getTrimestreActual } from '../../helpers/trimestreActual.js';

dotenv.config();

const validateTrimestreIsOnRequest = (errors, QuejasNoMes, QuejasFolio) => {
    if (!QuejasNoMes && errors.length === 0) {
        errors.push(`El campo mes es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateTrimestreIsANumber = (errors, QuejasNoMes, QuejasFolio) => {
    if (typeof QuejasNoMes !== 'number' && errors.length === 0) {
        errors.push(`El campo mes debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateTrimestreNoMatch = async (errors, QuejasNoMes, QuejasFolio) => {
    try {
        const trimestreActual = await getTrimestreActual();
        if (trimestreActual === undefined || QuejasNoMes !== trimestreActual && errors.length === 0) {
            errors.push(`El mes no corresponde al periodo actual o no ha sido aperturado. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

export const validateTrimestre = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasNoMes, QuejasFolio } = queja;

            // Realiza las validaciones y acumula los errores
            if (validateTrimestreIsOnRequest(errors, QuejasNoMes, QuejasFolio)) break;
            if (validateTrimestreIsANumber(errors, QuejasNoMes, QuejasFolio)) break;
            if (await validateTrimestreNoMatch(errors, QuejasNoMes, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};