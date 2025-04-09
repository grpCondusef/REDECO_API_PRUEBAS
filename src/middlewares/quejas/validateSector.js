import dotenv from 'dotenv'; // Importa la biblioteca dotenv
import { getSector, getSectorMatchInstitucion } from '../../database/quejas.Queries.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateSectorIsOnRequest = (errors, QuejasSector, QuejasFolio) => {
    if (!QuejasSector && errors.length === 0) {
        errors.push(`El campo Sector es obligatorio. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false; // No se ha detectado un error
};

const validateSectorIsAString = (errors, QuejasSector, QuejasFolio) => {
    if (typeof QuejasSector !== 'string' && errors.length === 0) {
        errors.push(`El campo Sector debe ser de tipo texto. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false; // No se ha detectado un error
};

const validateSectorIsAStringNoEmpty = (errors, QuejasSector, QuejasFolio) => {
    if (QuejasSector !== undefined && typeof QuejasSector !== 'string' && errors.length === 0) {
        errors.push(`El campo Sector es obligatorio. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false; // No se ha detectado un error
};

const validateSectorExist = async (errors, QuejasSector, QuejasFolio) => {
    try {
        if (typeof QuejasSector === 'string' && errors.length === 0) {
            const SectorExists = await getSector(QuejasSector.trim());
            if (!SectorExists) {
                errors.push(`El campo Sector no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`);
                return true; // Indica que se ha detectado un error
            }
        }
        return false; // No se ha detectado un error
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

const validateSectorMatch = async (errors, QuejasDenominacion, QuejasSector, QuejasFolio) => {
    try {
        const SectorMatchExists = await getSectorMatchInstitucion(QuejasDenominacion, QuejasSector);
        if (!SectorMatchExists && errors.length === 0) {
            errors.push(`El campo Sector no corresponde a la Institución Financiera. En el folio ${QuejasFolio}.`);
            return true; // Indica que se ha detectado un error
        }
        return false; // No se ha detectado un error
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

export const validateSector = async (quejas) => {
    const errors = []; // Inicializa el arreglo para los errores

    if (!Array.isArray(quejas)) {
        throw new TypeError('Las quejas deben de venir en un arreglo.');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            let { QuejasSector, QuejasDenominacion, QuejasFolio } = queja;

            // Asegurarnos de que QuejasSector no sea undefined antes de llamar a trim
            if (QuejasSector !== undefined && QuejasSector !== null) {
                QuejasSector = QuejasSector.trim();
            }

            if (validateSectorIsOnRequest(errors, QuejasSector, QuejasFolio)) break;
            if (validateSectorIsAString(errors, QuejasSector, QuejasFolio)) break;
            if (validateSectorIsAStringNoEmpty(errors, QuejasSector, QuejasFolio)) break;
            if (await validateSectorExist(errors, QuejasSector, QuejasFolio)) break;
            if (await validateSectorMatch(errors, QuejasDenominacion, QuejasSector, QuejasFolio)) break;
        }
    };

    await validateQuejas(); // Esperar a que se completen todas las validaciones
    return errors; // Devuelve el arreglo de errores
};
