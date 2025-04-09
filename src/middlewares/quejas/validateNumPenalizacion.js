import dotenv from 'dotenv';

dotenv.config();

const validateNumeroPenalizacionIsOnRequest = (errors, QuejasNumPenal, QuejasFolio) => {
    if (QuejasNumPenal === undefined && errors.length === 0) {
        errors.push(`El campo Número de Penalización es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateNumeroPenalizacionIsANumber = (errors, QuejasNumPenal, QuejasFolio) => {
    if (QuejasNumPenal !== null && typeof QuejasNumPenal !== 'number' && errors.length === 0) {
        errors.push(`El campo Número de Penalización debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateNumeroPenalizacion = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasNumPenal, QuejasEstatus, QuejasFolio } = queja;

            if (QuejasNumPenal === undefined || QuejasNumPenal === 0 && errors.length === 0) {
                errors.push(`Si el campo Número de Penalización es opcional, debe ser null en el folio ${QuejasFolio}.`)
                continue;
            }
            if (QuejasEstatus === 1 && errors.length === 0) {
                if (QuejasNumPenal !== null) {
                    if (validateNumeroPenalizacionIsANumber(errors, QuejasNumPenal, QuejasFolio)) continue;
                }
            } else if (QuejasEstatus === 2 && errors.length === 0) {
                    if (validateNumeroPenalizacionIsANumber(errors, QuejasNumPenal, QuejasFolio)) continue;
            } else {
                if (QuejasNumPenal !== null && errors.length === 0) {
                    errors.push(`El campo Número de Penalización debe ser null ya que el folio ${QuejasFolio} está pendiente.`)
                }
            }
        }    
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
