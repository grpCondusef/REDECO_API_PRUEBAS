import dotenv from 'dotenv'; // Importa la biblioteca dotenv
import { getQuejaFolio } from '../../database/quejas.Queries.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateNumeroFolioIsOnRequest = (errors, QuejasFolio) => {
    if (!QuejasFolio && errors.length === 0) {
        errors.push(`El campo Número de Folio es obligatorio.`)
        return true; // Indica que se ha detectado un error
    }
    return false; // Indica que no se ha detectado un error
};

const validateNumeroFolioIsAString = (errors, QuejasFolio) => {
    if (typeof QuejasFolio !== 'string' && errors.length === 0) {
        errors.push(`El campo Número de Folio debe ser de tipo texto.`)
        return true; // Indica que se ha detectado un error
    }
    return false; // Indica que no se ha detectado un error
};

const validateNumeroFolioIsAStringNoEmpty = (errors, QuejasFolio) => {
    if ( QuejasFolio.trim() === '' && errors.length === 0) {
        errors.push(`El campo Número de Folio es obligatorio.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateNumeroFolioDuplicate = async (errors, QuejasFolio, institucionClave) => {

    try {
        const folioExists = await getQuejaFolio(QuejasFolio, institucionClave);

        if (folioExists === true && errors.length === 0) {
            errors.push(`Folio duplicado. Ya existe un folio ${QuejasFolio} para la Institución Finenaciera y debe de ser único.`)
        }
    } catch (error) { }
}

export const validateNumeroFolio = async (quejas, request) => {
    const errors = [];
    const { institucionClave } = request; // Obtén institucionClave de request

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasFolio } = queja;

            if (validateNumeroFolioIsOnRequest(errors, QuejasFolio)) continue;
            if (validateNumeroFolioIsAString(errors, QuejasFolio)) continue;
            if (validateNumeroFolioIsAStringNoEmpty(errors, QuejasFolio)) continue;
            if (await validateNumeroFolioDuplicate(errors, QuejasFolio, institucionClave)) continue;
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
