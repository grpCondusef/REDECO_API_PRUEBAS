import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validatePORIIsOnRequest = (errors, QuejasPORI, QuejasFolio) => {
    if (!QuejasPORI && errors.length === 0) {
        errors.push(`El campo PORI es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validatePORIIsAString = (errors, QuejasPORI, QuejasFolio) => {
    if (typeof QuejasPORI !== 'string' && errors.length === 0) {
        errors.push(`El campo PORI debe ser de tipo texto. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateQuejasPORIIsAStringNoEmpty = (errors, QuejasPORI, QuejasFolio) => {
    if (typeof QuejasPORI !== 'string' || QuejasPORI.trim() === '' && errors.length === 0) {
        errors.push(`El campo PORI es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validatePORIIsCapital = (errors, QuejasPORI, QuejasFolio) => {
    
    if (!QuejasPORI.split("").every((char) => char === char.toUpperCase()) && QuejasPORI.length ===2 && errors.length === 0) {
        errors.push(`El campo PORI debe estar en mayúsculas. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validatePORIIsValid = (errors, QuejasPORI, QuejasFolio) => {
    const pori = ["SI", "NO"]
    
    if (!pori.includes(QuejasPORI) && pori.length ===2 && errors.length === 0) {
        errors.push(`El campo PORI debe de ser SI o NO. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validatePORI = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasPORI, QuejasFolio } = queja;

            // Realiza las validaciones y acumula los errores
            if (validatePORIIsOnRequest(errors, QuejasPORI, QuejasFolio)) break;
            if (validatePORIIsAString(errors, QuejasPORI, QuejasFolio)) break;
            if (validateQuejasPORIIsAStringNoEmpty(errors, QuejasPORI, QuejasFolio)) break;
            if (validatePORIIsCapital(errors, QuejasPORI, QuejasFolio)) break;
            if (validatePORIIsValid(errors, QuejasPORI, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
