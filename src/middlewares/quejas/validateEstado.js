import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateEstadoIsOnRequest = (errors, QuejasEstatus, QuejasFolio) => {
    if (!QuejasEstatus && errors.length === 0) {
        errors.push(`El campo Estado de concluido o pendiente es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateEstadoIsANumber = (errors, QuejasEstatus, QuejasFolio) => {
    if (typeof QuejasEstatus !== 'number' && errors.length === 0) {
        errors.push(`El campo Estado de concluido o pendiente debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
}

const validateEstadoHasAValidValue = (errors, QuejasEstatus, QuejasFolio) => {

    const estatus = QuejasEstatus;

    if (estatus !== 1 && estatus !== 2 && errors.length === 0) {
        errors.push(`El campo Estado de concluido o pendiente no corresponde con los valores permitidos. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
}

export const validateEstado = async (quejas) => {
    const errors = [];

    // Verifica si consultas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('consultas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasEstatus, QuejasFolio } = queja;
           
            // Realiza las validaciones y acumula los errores
            if (validateEstadoIsOnRequest(errors, QuejasEstatus, QuejasFolio)) break;
            if (validateEstadoIsANumber(errors, QuejasEstatus, QuejasFolio)) break;
            if (validateEstadoHasAValidValue(errors, QuejasEstatus, QuejasFolio)) break;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
