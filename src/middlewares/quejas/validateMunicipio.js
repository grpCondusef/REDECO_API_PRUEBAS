import dotenv from 'dotenv';
import { getMunicipio, getMunicipioMatchCodigoPostal, getMunicipioMatchEstado } from '../../database/quejas.Queries.js';

dotenv.config();

const validateMunicipioIsOnRequest = (errors, QuejasMunId, QuejasFolio) => {
    if (!QuejasMunId && errors.length === 0) {
        errors.push(`El campo Municipio o Alcaldía es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateMunicipioIsANumber = (errors, QuejasMunId, QuejasFolio) => {
    if (typeof QuejasMunId !== 'number' && errors.length === 0) {
        errors.push(`El campo Municipio o Alcaldía debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateMunicipioNotExist = async (errors, QuejasMunId, QuejasFolio) => {
    try {
        const QuejasMunIdExists = await getMunicipio(QuejasMunId);

        if (!QuejasMunIdExists && errors.length === 0) {
            errors.push(`El campo Municipio o Alcaldía no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
};

const validateMunicipioMatchEstado = async (errors, QuejasMunId, QuejasEstados, QuejasFolio) => {
    try {
        if (QuejasEstados === null){
            return false;
        }
        const QuejasMunIdExists = await getMunicipioMatchEstado(QuejasMunId, QuejasEstados);

        if (!QuejasMunIdExists && errors.length === 0) {
            errors.push(`El campo Municipio o Alcaldía no corresponde con el Estado. En el folio ${QuejasFolio}.`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error)
        return true; // Indica que se ha detectado un error
    }
}

export const validateMunicipio = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasMunId, QuejasEstados, QuejasMedio, QuejasFolio } = queja;

            if ((QuejasMedio === 5 || QuejasMedio === 3 || QuejasMedio === 17)) {                       
                if (validateMunicipioIsOnRequest(errors, QuejasMunId, QuejasFolio)) continue;
                if (validateMunicipioIsANumber(errors, QuejasMunId, QuejasFolio)) continue;
                if (await validateMunicipioNotExist(errors, QuejasMunId, QuejasFolio)) continue;
                if (await validateMunicipioMatchEstado(errors, QuejasMunId, QuejasEstados, QuejasFolio)) continue;
            }
            if (QuejasMunId === undefined || QuejasMunId === 0 && errors.length === 0) {
                errors.push(`Si el campo Municipio o Alcaldía es opcional, debe ser null en el folio ${QuejasFolio}.`)
            }
            if (QuejasMunId) {
                
                if (validateMunicipioIsANumber(errors, QuejasMunId, QuejasFolio)) continue;
                if (await validateMunicipioNotExist(errors, QuejasMunId, QuejasFolio)) continue;
                if (await validateMunicipioMatchEstado(errors, QuejasMunId, QuejasEstados, QuejasFolio)) continue;
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
