import { validateInstitucionClave } from './validateInstitucionClave.js';
import { validateSector } from './validateSector.js';
import { validateTrimestre } from './validateTrimestre.js';
import { validateNumeroQuejas } from './validateNumeroQuejas.js';
import { validateNumeroFolio } from './validateNumFolio.js';
import { validateFechaRecepcion } from './validateFechaRecepcion.js';
import { validateMedioRec } from './validateMedioRec.js';
import { validateNivelAtencion } from './validateNivelAtencion.js';
import { validatePORI } from './validatePORI.js';
import { validateEstado } from './validateEstado.js';
import { validateEntidadFederativa } from './validateEntidadFederativa.js';
import { validateMunicipio } from './validateMunicipio.js';
import { validateLocalidad } from './validateLocalidad.js';
import { validateColonia } from './validateColonia.js';
import { validateCodigoPostal } from './validateCodigoPostal.js';
import { validateTipoPersona } from './validateTipoPersona.js';
import { validateSexo } from './validateSexo.js';
import { validateEdad } from './validateEdad.js';
import { validateFecResolucion } from './validateFecResolucion.js';
import { validateFecNotificacion } from './validateFecNotificacion.js';
import { validateSentidoResolucion } from './validateSentidoResolucion.js';
import { validateNumeroPenalizacion } from './validateNumPenalizacion.js';
import { validatePenalizacion } from './validateTipoPenalizacion.js';
import { validateProducto } from './validateProducto.js';
import { validateCausaId } from './validateCausas.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // TTL de 1 minuto (60 segundos)

export const validateErrors = async (request, response, next) => {
    try {
        const quejas = request.body;
        const { institucionClave: institucionId } = request;

        const allErrors = {};
        const cacheKey = 'validation-' + JSON.stringify(quejas);

        // Verificar en caché
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return response.status(400).json({
                errors: cachedData,
                message: 'Ninguno de los registros enviados fue adicionado hasta que se haga la corrección total de los folios.'
            });
        }

        const validationPromises = quejas.map(async (queja) => {
            const folio = queja.QuejasFolio;

            const [errorsInstitucionClave, errorsSector, errorsTrimestre, errorsNumeroQuejas, errorsNumeroFolio, errorsFechaRecepcion, errorsMedioRec,
                errorsNivelAtencion, errorsPORI, errorsEstado, errorsEntidadFederativa, errorsMunicipio, errorsLocalidad, errorsColonia, errorsCodigoPostal,
                errorsTipoPersona, errorsSexo, errorsEdad, errorsFecResolucion, errorsFecNotificacion, errorsSentidoResolucion, errorsNumeroPenalizacion,
                errorsTipoPenalizacion, errorsProducto, errorsCausaId] = await Promise.all([
                    validateInstitucionClave([queja], institucionId), validateSector([queja]), validateTrimestre([queja]), validateNumeroQuejas([queja]),
                    validateNumeroFolio([queja], request), validateFechaRecepcion([queja]), validateMedioRec([queja]), validateNivelAtencion([queja]),
                    validatePORI([queja]), validateEstado([queja]), validateEntidadFederativa([queja]), validateMunicipio([queja]), validateLocalidad([queja]),
                    validateColonia([queja]), validateCodigoPostal([queja]), validateTipoPersona([queja]), validateSexo([queja]), validateEdad([queja]),
                    validateFecResolucion([queja]), validateFecNotificacion([queja]), validateSentidoResolucion([queja]), validateNumeroPenalizacion([queja]),
                    validatePenalizacion([queja]), validateProducto([queja], request), validateCausaId([queja], request)]);

            const errors = [...errorsInstitucionClave, ...errorsSector, ...errorsTrimestre, ...errorsNumeroQuejas, ...errorsNumeroFolio, ...errorsFechaRecepcion,
                ...errorsMedioRec, ...errorsNivelAtencion, ...errorsPORI, ...errorsEstado, ...errorsEntidadFederativa, ...errorsMunicipio,
                ...errorsLocalidad, ...errorsColonia, ...errorsCodigoPostal, ...errorsTipoPersona, ...errorsSexo, ...errorsEdad, ...errorsFecResolucion,
                ...errorsFecNotificacion, ...errorsSentidoResolucion, ...errorsNumeroPenalizacion, ...errorsTipoPenalizacion, ...errorsProducto, ...errorsCausaId
            ];

            if (errors.length > 0) {
                allErrors[folio] = errors;
            }
        });

        await Promise.all(validationPromises);

        if (Object.keys(allErrors).length > 0) {
            // Mezclar errores en caché con los nuevos errores
            const newCachedData = { ...cachedData, ...allErrors };
            cache.set(cacheKey, newCachedData); // Almacenar errores en caché
            return response.status(400).json({
                errors: newCachedData,
                message: 'Ninguno de los registros enviados fue adicionado hasta que se haga la corrección total de los folios.'
            });
        }

        next(); // Si no se detectaron errores, pasa al siguiente middleware
    } catch (error) {
        console.error(error);
        response.status(406).json({ error: 'Formato no valido.' });
    }
};
