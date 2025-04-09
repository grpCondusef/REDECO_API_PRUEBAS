import dotenv from 'dotenv';
import { getInstitucionClave } from '../../database/quejas.Queries.js';

dotenv.config();

const validateInstitucionClaveIsOnRequest = (errors, QuejasDenominacion, QuejasFolio) => {
    if (!QuejasDenominacion && errors.length === 0) {
        errors.push(`El campo Denominación o razón social es obligatorio. En el folio ${QuejasFolio}.`);
    }
};

const validateInstitucionClaveIsAString = (errors, QuejasDenominacion, QuejasFolio) => {
    if (QuejasDenominacion !== undefined && typeof QuejasDenominacion !== 'string' && errors.length === 0) {
        errors.push(`El campo Denominación o razón social debe ser de tipo texto. En el folio ${QuejasFolio}.`);
    }
};

const validateInstitucionClaveIsAStringNoEmpty = (errors, QuejasDenominacion, QuejasFolio) => {
    if (typeof QuejasDenominacion === 'string' && QuejasDenominacion.trim() === '' && errors.length === 0) {
        errors.push(`El campo Denominación o razón social es obligatorio. En el folio ${QuejasFolio}.`);
    }
};

const validateInstitucionClaveExist = async (errors, QuejasDenominacion, QuejasFolio) => {
    try {
        if (typeof QuejasDenominacion === 'string' && errors.length === 0) {
            const InstitucionClaveExists = await getInstitucionClave(QuejasDenominacion.trim());
            if (!InstitucionClaveExists) {
                errors.push(`El campo Denominación o razón social no es válido. No existe en el catálogo. En el folio ${QuejasFolio}.`);
            }
        }
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

const validateInstitucionClaveMatchToken = async (errors, QuejasDenominacion, institucionId, ConsultasFolio) => {
    try {
        const InstitucionClaveExists = await getInstitucionClave(QuejasDenominacion);
    
        //PARA TRAER UN ELEMENTO DE UN ARREGLO
        const institucionclaves = []
        InstitucionClaveExists.rows.map(institucion =>{
        const clave = institucion[0]
        institucionclaves.push(clave); 
    });     
        if ((!institucionclaves.includes(institucionId)) && errors.length === 0) {
            errors.push(`El campo Denominación o razón social no es válido para el token. En el folio ${ConsultasFolio}.`)
            return true; // Indica que se ha detectado un error
        } 
        return false;
  
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
};

export const validateInstitucionClave = async (quejas, institucionId) => {
    const errors = []; // Inicializa el arreglo para los errores

    if (!Array.isArray(quejas)) {
        throw new TypeError('Las quejas deben de venir en un arreglo.');
    }

    const validatequejas = async () => {
        for (const queja of quejas) {
            const { QuejasDenominacion, QuejasFolio } = queja;

            if (validateInstitucionClaveIsOnRequest(errors, QuejasDenominacion, QuejasFolio)) continue;
            if (validateInstitucionClaveIsAString(errors, QuejasDenominacion, QuejasFolio)) continue;
            if (validateInstitucionClaveIsAStringNoEmpty(errors, QuejasDenominacion, QuejasFolio)) continue;
            if (await validateInstitucionClaveExist(errors, QuejasDenominacion, QuejasFolio)) continue;
            if (await validateInstitucionClaveMatchToken(errors, QuejasDenominacion, institucionId, QuejasFolio)) continue;
        }
    };

    await validatequejas(); // Esperar a que se completen todas las validaciones
    return errors; // Devuelve el arreglo de errores
};
