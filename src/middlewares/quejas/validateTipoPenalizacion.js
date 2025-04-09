import dotenv from 'dotenv';
import { getPenalizacion } from '../../database/quejas.Queries.js';

dotenv.config();

const validatePenalizacionIsOnRequest = (errors, QuejasPenalizacion, QuejasFolio) => {
    if (QuejasPenalizacion === undefined && errors.length === 0) {
        errors.push(`El campo Penalización es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validatePenalizacionIsANumber = (errors, QuejasPenalizacion, QuejasFolio) => {
    if (QuejasPenalizacion !== null && typeof QuejasPenalizacion !== 'number' && errors.length === 0) {
        errors.push(`El campo Penalización debe ser de tipo number. En el folio ${QuejasFolio}`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validatePenalizacionNotExist = async (errors, QuejasPenalizacion, QuejasFolio) => {
    try {
        const reclamacionesSentidoRecExists = await getPenalizacion(QuejasPenalizacion);

        if (!reclamacionesSentidoRecExists && errors.length === 0) {
            errors.push(`El campo Penalización no es válido. No existe en el catálogo. En el folio ${QuejasFolio}`)
            return true; // Indica que se ha detectado un error
        }
        return false;
    } catch (error) {
        console.log(error);
        return true; // Indica que se ha detectado un error
    }
}

export const validatePenalizacion = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasPenalizacion, QuejasEstatus, QuejasFolio } = queja;
        
            if (QuejasPenalizacion === null) {
                // Continuar con la siguiente iteración del bucle si QuejasPenalizacion es null
                continue;
            }
        
            if (QuejasPenalizacion === undefined || (QuejasPenalizacion === 0 && errors.length === 0)) {
                errors.push(`Si el campo Tipo de Penalización es opcional, debe ser null en el folio ${QuejasFolio}.`)
            } else if (QuejasEstatus === 1) {
                if (QuejasPenalizacion !== null) {
                    if (validatePenalizacionIsANumber(errors, QuejasPenalizacion, QuejasFolio)) continue;
                    if (await validatePenalizacionNotExist(errors, QuejasPenalizacion, QuejasFolio)) continue;
                }
            } else if (QuejasEstatus === 2) {
                if (validatePenalizacionIsANumber(errors, QuejasPenalizacion, QuejasFolio)) continue;
                if (await validatePenalizacionNotExist(errors, QuejasPenalizacion, QuejasFolio)) continue;
            } else { 
                if (QuejasPenalizacion !== null && errors.length === 0) {
                    errors.push(`El campo Penalización debe ser null ya que el folio ${QuejasFolio} está pendiente.`)
                }
            }
        }
    };
    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};