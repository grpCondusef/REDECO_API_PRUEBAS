import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateSexoIsOnRequest = (errors, QuejasSexo, QuejasFolio) => {
    if (!QuejasSexo && errors.length === 0) {
        errors.push(`El campo Sexo es obligatorio. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateSexoIsAString = (errors, QuejasSexo, QuejasFolio) => {
    if (QuejasSexo !== null && typeof QuejasSexo !== 'string' && errors.length === 0) {
        errors.push(`El campo Sexo debe ser de tipo texto. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateSexoIsCapital = (errors, QuejasSexo, QuejasFolio) => {
    if (QuejasSexo !== null && (!QuejasSexo.split("").every((char) => char === char.toUpperCase()) || QuejasSexo.length !== 1) && errors.length === 0) {
        errors.push(`El campo Sexo debe estar en mayúsculas. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

const validateSexoIsValid = (errors, QuejasSexo, QuejasFolio) => {
    const sexos = ["H", "M"];
    if (QuejasSexo !== null && !sexos.includes(QuejasSexo) && errors.length === 0) {
        errors.push(`El campo Sexo debe de ser H o M. En el folio ${QuejasFolio}.`);
        return true; // Indica que se ha detectado un error
    }
    return false;
};

export const validateSexo = async (quejas) => {
    const errors = [];

    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
        throw new TypeError('quejas debe ser un array');
    }

    const validateQuejas = async () => {
        for (const queja of quejas) {
            const { QuejasSexo, QuejasTipoPersona, QuejasFolio } = queja;

            if (QuejasTipoPersona === 1) {
                if (QuejasSexo === undefined || QuejasSexo === 0) {
                    errors.push(`Si el campo Sexo es opcional, debe ser null en el folio ${QuejasFolio}.`);
                    continue;
                }
                // Realiza las validaciones y acumula los errores
                //if (validateSexoIsOnRequest(errors, QuejasSexo, QuejasFolio)) continue;
                if (validateSexoIsAString(errors, QuejasSexo, QuejasFolio)) continue;
                if (validateSexoIsCapital(errors, QuejasSexo, QuejasFolio)) continue;
                if (validateSexoIsValid(errors, QuejasSexo, QuejasFolio)) continue;
            }
            if (QuejasTipoPersona === 2) {
                if (QuejasSexo !== null) {
                    errors.push(`El campo Sexo debe ser null ya que el Tipo de persona es 2 (Persona moral). En el folio ${QuejasFolio}.`);
                    continue;
                }
            }
        }
    };

    await validateQuejas();
    return errors; // Devuelve el arreglo de errores
};
