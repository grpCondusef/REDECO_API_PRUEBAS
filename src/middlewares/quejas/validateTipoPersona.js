import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateTipoPersonaIsOnRequest = (errors, QuejasTipoPersona, QuejasFolio) => {
    if (!QuejasTipoPersona && errors.length === 0) {
        errors.push(`El campo Tipo de Persona es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateTipoPersonaIsANumber = (errors, QuejasTipoPersona, QuejasFolio) => {
    if (typeof QuejasTipoPersona !== 'number' && errors.length === 0) {
        errors.push(`El campo Tipo de Persona debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateTipoPersonaHasAValidValue = (errors, QuejasTipoPersona, QuejasFolio) => {

    const estatus = QuejasTipoPersona;

    if (estatus !== 1 && estatus !== 2 && errors.length === 0) {
        errors.push(`El campo Tipo de Persona no corresponde con los valores permitidos. Tiene que ser 1 (Persona Física) o 2 (Persona Moral). En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateTipoPersona = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasTipoPersona, QuejasFolio } = queja;

            // Realiza las validaciones y acumula los errores
            if (validateTipoPersonaIsOnRequest(errors, QuejasTipoPersona, QuejasFolio)) break;
            if (validateTipoPersonaIsANumber(errors, QuejasTipoPersona, QuejasFolio)) break;
            if (validateTipoPersonaHasAValidValue(errors, QuejasTipoPersona, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};