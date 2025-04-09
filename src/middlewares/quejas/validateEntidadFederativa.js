import dotenv from 'dotenv'; // Importa la biblioteca dotenv
import { getEstadosData } from '../../database/quejas.Queries.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateEntidadFederativaIsOnRequest = (errors, QuejasEstados, QuejasFolio) => {
    if ((QuejasEstados === undefined || QuejasEstados === null) && errors.length === 0) {
        errors.push(`El campo Entidad Federativa es obligatorio. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateEntidadFederativaIsANumber = (errors, QuejasEstados, QuejasFolio) => {
    if (QuejasEstados !== null && typeof QuejasEstados !== 'number' && errors.length === 0) {
        errors.push(`El campo Entidad Federativa debe ser de tipo number. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateEntidadFederativaNotMatch = async (errors, QuejasEstados, QuejasFolio) => {
    try {
        if (QuejasEstados !== null) {
            const QuejasEstadosExists = await getEstadosData(QuejasEstados);

            if (!QuejasEstadosExists && errors.length === 0) {
                errors.push(`El campo Entidad Federativa no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`);
                return true; // Indica que se ha detectado un error
            }
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

export const validateEntidadFederativa = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasEstados, QuejasFolio, QuejasMedio } = queja;

            if (QuejasMedio === 5 || QuejasMedio === 3 || QuejasMedio === 17) {
                if (validateEntidadFederativaIsOnRequest(errors, QuejasEstados, QuejasFolio)) continue;
                if (validateEntidadFederativaIsANumber(errors, QuejasEstados, QuejasFolio)) continue;
                if (await validateEntidadFederativaNotMatch(errors, QuejasEstados, QuejasFolio)) continue;
            } else {
                if ((QuejasEstados === undefined || QuejasEstados === 0) && errors.length === 0) {
                    errors.push(`Si el campo Entidad Federativa es opcional, debe ser null en el folio ${QuejasFolio}.`);
                } else if (QuejasEstados !== null) {
                    if (validateEntidadFederativaIsANumber(errors, QuejasEstados, QuejasFolio)) continue;
                    if (await validateEntidadFederativaNotMatch(errors, QuejasEstados, QuejasFolio)) continue;
                }
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
