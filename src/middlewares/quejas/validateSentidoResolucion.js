import dotenv from 'dotenv';

dotenv.config();

const validateSentidoResolucionIsOnRequest = (errors, QuejasRespuesta, QuejasFolio) => {
    if (!QuejasRespuesta && errors.length === 0) {
        errors.push(`El campo Sentido de la resolución es obligatorio. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateSentidoResolucionIsANumber = (errors, QuejasRespuesta, QuejasFolio) => {
    if (QuejasRespuesta !== null && typeof QuejasRespuesta !== 'number' && errors.length === 0) {
        errors.push(`El campo Sentido de la resolución debe ser de tipo number. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateSentidoResolucionNotExist = (errors, QuejasRespuesta, QuejasFolio) => {
    if (QuejasRespuesta !== null && (QuejasRespuesta < 1 || QuejasRespuesta > 3) && errors.length === 0) {
        errors.push(`El campo Sentido de la resolución no es válido. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateSentidoResolucion = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasRespuesta, QuejasEstatus, QuejasFolio } = queja;

            if (QuejasEstatus !== 2) {
                if (QuejasRespuesta === undefined || QuejasRespuesta === 0 && errors.length === 0) {
                    errors.push(`Si el campo Sentido de la resolución es opcional, debe ser null en el folio ${QuejasFolio}.`)
                    continue;
                }
            }
            if (QuejasEstatus === 2 && errors.length === 0) {
                if (validateSentidoResolucionIsOnRequest(errors, QuejasRespuesta, QuejasFolio)) break;
                if (validateSentidoResolucionIsANumber(errors, QuejasRespuesta, QuejasFolio)) break;
                if (validateSentidoResolucionNotExist(errors, QuejasRespuesta, QuejasFolio)) break;
            }else {
                if (QuejasRespuesta !== null && errors.length === 0) {
                    errors.push(`El campo Sentido de la resolución debe ser null ya que el folio ${QuejasFolio} está pendiente.`)
                        break;
                }}
            if (QuejasEstatus === 1 && errors.length === 0) {
                if (QuejasRespuesta !== null) {
                    if (validateSentidoResolucionIsANumber(errors, QuejasRespuesta, QuejasFolio)) break;
                    if (validateSentidoResolucionNotExist(errors, QuejasRespuesta, QuejasFolio)) break;
                }
            }
        }
    };        
    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
