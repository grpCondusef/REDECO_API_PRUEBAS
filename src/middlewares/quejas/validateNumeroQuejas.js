import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateNumeroQuejasIsOnRequest = (errors, QuejasNum, QuejasFolio) => {
    if (!QuejasNum && errors.length === 0) {
        errors.push(`El campo Número de quejas es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false; // Indica que no se ha detectado un error
};

const validateNumeroQuejasIsANumber = (errors, QuejasNum, QuejasFolio) => {
    if (typeof QuejasNum !== 'number' && errors.length === 0) {
        errors.push(`El campo Número de quejas debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false; // Indica que no se ha detectado un error
};

const validateNumeroQuejasIsOne = (errors, QuejasNum, QuejasFolio) => {
    if (QuejasNum !== 1 && errors.length === 0) {
        errors.push(`El campo Número de quejas no es correcto. Debe ser igual a 1. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false; // Indica que no se ha detectado un error
};

export const validateNumeroQuejas = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasNum, QuejasFolio } = queja;
            
            // Realiza las validaciones y acumula los errores
            if (validateNumeroQuejasIsOnRequest(errors, QuejasNum, QuejasFolio)) break;
            if (validateNumeroQuejasIsANumber(errors, QuejasNum, QuejasFolio)) break;
            if (validateNumeroQuejasIsOne(errors, QuejasNum, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
