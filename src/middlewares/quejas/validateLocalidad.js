import dotenv from 'dotenv';
import { getLocalidad, getLocalidadMatchMunicipio, getLocalidadMatchEstado } from '../../database/quejas.Queries.js';

dotenv.config();

const validateLocalidadIsANumber = (errors, QuejasLocId, QuejasFolio) => {
    if (QuejasLocId === undefined || QuejasLocId === null) {
        return false; // No hacemos ninguna validación si QuejasLocId es opcional o null
    }

    if (typeof QuejasLocId !== 'number' && errors.length === 0) {
        errors.push(`El campo Localidad debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
}

const validateLocalidadNotExist = async (errors, QuejasLocId, QuejasFolio) => {
    if (QuejasLocId === undefined || QuejasLocId === null) {
        return false; // No hacemos ninguna validación si QuejasLocId es opcional o null
    }

    try {
        const QuejasLocIdExists = await getLocalidad(QuejasLocId);

        if (!QuejasLocIdExists && errors.length === 0) {
            errors.push(`El campo Localidad no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
}

const validateLocalidadMatchMunicipio = async (errors, QuejasLocId, QuejasMunId, QuejasFolio) => {
    if (QuejasLocId === undefined || QuejasLocId === null || QuejasMunId === undefined || QuejasMunId === null) {
        return false; // No hacemos ninguna validación si QuejasLocId o QuejasMunId es opcional o null
    }

    try {
        const localidadMatch = await getLocalidadMatchMunicipio(QuejasLocId, QuejasMunId);

        if (!localidadMatch && errors.length === 0) {
            errors.push(`El campo Localidad no corresponde al Municipio. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
}

const validateLocalidadMatchEstado = async (errors, QuejasLocId, QuejasEstados, QuejasFolio) => {
    if (QuejasLocId === undefined || QuejasLocId === null || QuejasEstados === undefined || QuejasEstados === null) {
        return false; // No hacemos ninguna validación si QuejasLocId o QuejasEstados es opcional o null
    }

    try {
        const QuejasMunIdExists = await getLocalidadMatchEstado(QuejasLocId, QuejasEstados);

        if (!QuejasMunIdExists && errors.length === 0) {
            errors.push(`El campo Localidad no corresponde con el Estado. En el folio ${QuejasFolio}`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
}

export const validateLocalidad = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasLocId, QuejasMunId, QuejasMedio, QuejasFolio, QuejasEstados } = queja;

            if ((QuejasMedio === 5 || QuejasMedio === 3 || QuejasMedio === 17)) {
                if (validateLocalidadIsANumber(errors, QuejasLocId, QuejasFolio)) continue;
                if (await validateLocalidadNotExist(errors, QuejasLocId, QuejasFolio)) continue;
                if ((QuejasMunId !== undefined && QuejasMunId !== null && await validateLocalidadMatchMunicipio(errors, QuejasLocId, QuejasMunId, QuejasFolio))) continue;
                if ((QuejasEstados !== undefined && QuejasEstados !== null && await validateLocalidadMatchEstado(errors, QuejasLocId, QuejasEstados, QuejasFolio))) continue;
            }
            if (QuejasLocId === undefined || QuejasLocId === 0 && errors.length === 0) {
                errors.push(`Si el campo Localidad es opcional, debe ser null en el folio ${QuejasFolio}.`)
            }
            if (QuejasLocId !== undefined && QuejasLocId !== null) {
                if (validateLocalidadIsANumber(errors, QuejasLocId, QuejasFolio)) continue;
                if (await validateLocalidadNotExist(errors, QuejasLocId, QuejasFolio)) continue;
                if ((QuejasMunId !== undefined && QuejasMunId !== null && await validateLocalidadMatchMunicipio(errors, QuejasLocId, QuejasMunId, QuejasFolio))) continue;
                if ((QuejasEstados !== undefined && QuejasEstados !== null && await validateLocalidadMatchEstado(errors, QuejasLocId, QuejasEstados, QuejasFolio))) continue;
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
