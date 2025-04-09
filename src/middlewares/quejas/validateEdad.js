import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateEdadIsOnRequest = (errors, QuejasEdad, QuejasFolio) => {
    if ((QuejasEdad === undefined || QuejasEdad === null) && errors.length === 0) {
        errors.push(`El campo Edad es obligatorio. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateEdadIsANumber = (errors, QuejasEdad, QuejasFolio) => {
    if (QuejasEdad !== null && typeof QuejasEdad !== 'number' && errors.length === 0) {
        errors.push(`El campo Edad debe ser de tipo number. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateEdadIsValid = (errors, QuejasEdad, QuejasFolio) => {
    if (QuejasEdad !== null && QuejasEdad < 18 && errors.length === 0) {
        errors.push(`El campo Edad debe de ser mayor o igual a 18 años. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateEdad = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasEdad, QuejasTipoPersona, QuejasFolio } = queja;

            if (QuejasTipoPersona === 1) {
                if (QuejasEdad === undefined || QuejasEdad === 0) {
                    errors.push(`Si el campo Edad es opcional, debe ser null en el folio ${QuejasFolio}.`);
                    continue;
                }
                // Realiza las validaciones y acumula los errores
                //if (validateEdadIsOnRequest(errors, QuejasEdad, QuejasFolio)) continue;
                if (validateEdadIsANumber(errors, QuejasEdad, QuejasFolio)) continue;
                if (validateEdadIsValid(errors, QuejasEdad, QuejasFolio)) continue;
            }
            if (QuejasTipoPersona === 2) {
                if (QuejasEdad !== null) {
                    errors.push(`El campo Edad debe ser null ya que el Tipo de persona es 2 (Persona moral). En el folio ${QuejasFolio}.`);
                    continue;
                }
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
