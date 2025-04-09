import dotenv from 'dotenv';
import { getColonia, getColoniaMatchLocalidad, getColoniaMatchMunicipio, getColoniaMatchEstado } from '../../database/quejas.Queries.js';

dotenv.config();

const validateColoniaIsOnRequest = (errors, QuejasColId, QuejasFolio) => {
    if (!QuejasColId && errors.length === 0) { 
        errors.push(`El campo Colonia es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateColoniaIsANumber = (errors, QuejasColId, QuejasFolio) => {
    if (QuejasColId === undefined) {
        return false; // No hacemos ninguna validación si QuejasColId es opcional
    }

    if (typeof QuejasColId !== 'number' && errors.length === 0) {
        errors.push(`El campo Colonia debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateColoniaNotExist = async (errors, QuejasColId, QuejasFolio) => {
    if (QuejasColId === undefined) {
        return false; // No hacemos ninguna validación si QuejasColId es opcional
    }

    try {
        if (QuejasColId === 0) {
            return false; // No hacemos ninguna validación si QuejasColId es 0
        }

        const QuejasColIdExists = await getColonia(QuejasColId);

        if (!QuejasColIdExists && errors.length === 0) {
            errors.push(`El campo Colonia no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
}

const validateColoniaMatchLocalidad = async (errors, QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId, QuejasFolio) => {
    if (QuejasColId === 0) {
        return false;
    }
    
    if (QuejasLocId) {
        try {
            const localidadMatch = await getColoniaMatchLocalidad(QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId);
            if (!localidadMatch && errors.length === 0) {
                errors.push(`El campo Colonia no corresponde a la Localidad. En el folio ${QuejasFolio}.`)
                return true; // Indica que se ha detectado un error
            }
            return false;
        } catch (error) {
            console.log(error);
            return true; // Indica que se ha detectado un error
        }
    }
    return false;
}

const validateColoniaMatchMunicipio = async (errors, QuejasColId, QuejasMunId, QuejasFolio) => {
    if (QuejasColId === 0) {
        return false;
    }

    if (QuejasMunId) {
        try {
            const localidadMatch = await getColoniaMatchMunicipio(QuejasColId, QuejasMunId);
            if (!localidadMatch && errors.length === 0) {
                errors.push(`El campo Colonia no corresponde al Municipio. En el folio ${QuejasFolio}.`)
                return true; // Indica que se ha detectado un error
            }
            return false;
        } catch (error) {
            console.log(error);
            return true; // Indica que se ha detectado un error
        }
    }
    return false;
}

const validateColoniaMatchEstado = async (errors, QuejasColId, EstadosId, QuejasFolio) => {
    if (QuejasColId === 0) {
        return false;
    }

    if (EstadosId) {
        try {
            const localidadMatch = await getColoniaMatchEstado(QuejasColId, EstadosId);
            if (!localidadMatch && errors.length === 0) {
                errors.push(`El campo Colonia no corresponde a la Entidad Federativa. En el folio ${QuejasFolio}.`)
                return true; // Indica que se ha detectado un error
            }
            return false;
        } catch (error) {
            console.log(error);
            return true; // Indica que se ha detectado un error
        }
    }
    return false;
}

export const validateColonia = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasColId, QuejasLocId, QuejasMunId, EstadosId, QuejasCP, QuejasEstados, QuejasMedio, QuejasFolio } = queja;

            if ((QuejasMedio === 5 || QuejasMedio === 3 || QuejasMedio === 17)) {          
                if (validateColoniaIsOnRequest(errors, QuejasColId, QuejasFolio)) continue;
                if (validateColoniaIsANumber(errors, QuejasColId, QuejasFolio)) continue;
                if (await validateColoniaNotExist(errors, QuejasColId, QuejasFolio)) continue;
                if (await validateColoniaMatchLocalidad(errors, QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId, QuejasFolio)) continue;
                if ((QuejasMunId !== null && QuejasMunId !== undefined && await validateColoniaMatchMunicipio(errors, QuejasColId, QuejasMunId, QuejasFolio))) continue;
                if (await validateColoniaMatchEstado(errors, QuejasColId, EstadosId, QuejasFolio)) continue;
            }
            if (QuejasColId === undefined || QuejasColId === 0 && errors.length === 0) {
                return errors.push(`Si el campo Colonia es opcional, debe ser null en el folio ${QuejasFolio}.`)
            }
            if (QuejasColId) {
                        if (await validateColoniaNotExist(errors, QuejasColId, QuejasFolio)) continue;
                        if (validateColoniaIsANumber(errors, QuejasColId, QuejasFolio)) continue;
                        if (await validateColoniaMatchLocalidad(errors, QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId, QuejasFolio)) continue;
                        if ((QuejasMunId !== null && QuejasMunId !== undefined && await validateColoniaMatchMunicipio(errors, QuejasColId, QuejasMunId, QuejasFolio))) continue;
                        if (await validateColoniaMatchEstado(errors, QuejasColId, EstadosId, QuejasFolio)) continue;
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
