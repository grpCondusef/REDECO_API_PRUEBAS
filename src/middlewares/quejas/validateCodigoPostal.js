import dotenv from 'dotenv';
import { getCPData, getCodigoPostalMatchColonia, getCodigoPostalMatchLocalidad, getCodigoPostalMatchMunicipio, getCodigoPostalMatchEstado } from '../../database/quejas.Queries.js';

dotenv.config();

const validateCodigoPostalIsOnRequest = (errors, QuejasCP, QuejasFolio) => {
    if (!QuejasCP && errors.length === 0) {
        errors.push(`El campo Código Postal es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateCodigoPostalIsANumber = (errors, QuejasCP, QuejasFolio) => {
    if (typeof QuejasCP !== 'number' && errors.length === 0) {
        errors.push(`El campo Código Postal debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateCodigoPostalNotExist = async (errors, QuejasCP, QuejasFolio) => {
    try {
        const QuejasCPExists = await getCPData(QuejasCP);

        if (!QuejasCPExists && errors.length === 0) {
            errors.push(`El campo Código Postal no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

const validateCodigoPostalMatchColonia = async (errors, QuejasCP, QuejasColId, QuejasFolio) => {
    try {            
        if (QuejasColId === null || QuejasColId === undefined){
            return false;
        }
        const CodigoPostalMatch = await getCodigoPostalMatchColonia(QuejasCP, QuejasColId);
    
        if (!CodigoPostalMatch && errors.length === 0) {
            errors.push(`El campo Código Postal no corresponde a la Colonia. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

const validateCodigoPostalMatchLocalidad = async (errors, QuejasCP, QuejasLocId, QuejasFolio) => {
    try {
        if (QuejasLocId === null || QuejasLocId === undefined){
            return false;
        }
        const CodigoPostalMatch = await getCodigoPostalMatchLocalidad(QuejasCP, QuejasLocId);
    
        if (!CodigoPostalMatch && errors.length === 0) {
            errors.push(`El campo Código Postal no corresponde a la Localidad. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

const validateCodigoPostalMatchMunicipio = async (errors, QuejasCP, QuejasMunId, QuejasFolio) => {
    try {
        if (QuejasMunId === null || QuejasMunId === undefined){
            return false;
        }
        const CodigoPostalMatch = await getCodigoPostalMatchMunicipio(QuejasCP, QuejasMunId);
    
        if (!CodigoPostalMatch && errors.length === 0) {
            errors.push(`El campo Código Postal no corresponde al Municipio. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

const validateCodigoPostalMatchEstado = async (errors, QuejasCP, QuejasEstados, QuejasFolio) => {
    try {
        if (QuejasEstados === null || QuejasEstados === undefined){
            return false;
        }
        const CodigoPostalMatch = await getCodigoPostalMatchEstado(QuejasCP, QuejasEstados);

        if (!CodigoPostalMatch && errors.length === 0) {
            errors.push(`El campo Código Postal no corresponde a la Entidad Federativa. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

export const validateCodigoPostal = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasCP, QuejasMedio, QuejasColId, QuejasLocId, QuejasMunId, QuejasEstados, QuejasFolio } = queja;

            if ((QuejasMedio === 5 || QuejasMedio === 3 || QuejasMedio === 17)) {
                if (validateCodigoPostalIsOnRequest(errors, QuejasCP, QuejasFolio)) continue;
                if (validateCodigoPostalIsANumber(errors, QuejasCP, QuejasFolio)) continue;
                if ((QuejasEstados !== null && QuejasEstados !== undefined && await validateCodigoPostalMatchEstado(errors, QuejasCP, QuejasEstados, QuejasFolio))) continue;
                if (await validateCodigoPostalMatchColonia(errors, QuejasCP, QuejasColId, QuejasFolio)) continue;
                if (await validateCodigoPostalMatchLocalidad(errors, QuejasCP, QuejasLocId, QuejasFolio)) continue;
                if (await validateCodigoPostalMatchMunicipio(errors, QuejasCP, QuejasMunId, QuejasFolio)) continue;
                if (await validateCodigoPostalNotExist(errors, QuejasCP, QuejasFolio)) continue;
            }
            if ( QuejasCP === undefined || QuejasCP === 0 && errors.length === 0) {
                errors.push(`Si el campo Código Postal es opcional, debe ser null en el folio ${QuejasFolio}.`)
            }
            if (QuejasCP) {
                if (validateCodigoPostalIsANumber(errors, QuejasCP, QuejasFolio)) continue;
                if (await validateCodigoPostalMatchColonia(errors, QuejasCP, QuejasColId, QuejasFolio)) continue;
                if (await validateCodigoPostalMatchLocalidad(errors, QuejasCP, QuejasLocId, QuejasFolio)) continue;
                if (await validateCodigoPostalMatchMunicipio(errors, QuejasCP, QuejasMunId, QuejasFolio)) continue;
                if (await validateCodigoPostalNotExist(errors, QuejasCP, QuejasFolio)) continue;           
                if ((QuejasEstados !== null && QuejasEstados !== undefined && await validateCodigoPostalMatchEstado(errors, QuejasCP, QuejasEstados, QuejasFolio))) continue;
            } 
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
