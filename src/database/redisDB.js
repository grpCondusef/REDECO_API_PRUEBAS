/*
import { client } from "./redisCache.js";
import { 
    getCalendario, getFechaAñoFecRecepcion, getFechaAñoFecAtencion, getFechaAñoFecNotificacion, getInstitucionClave, getSector, getSectorMatchInstitucion,
    getQuejaFolio, getEstadosData, getMedioRecepcion, getNivelAtencion, getCPData, getMunicipio, getMunicipioDesc, getMunicipioMatchCodigoPostal, getMunicipioMatchEstado,
    getCodigoPostalMatchEstado, getCodigoPostalMatchColonia, getCodigoPostalMatchLocalidad, getCodigoPostalMatchMunicipio, getLocalidad, getLocalidadDesc, 
    getLocalidadMatchMunicipioCP, getLocalidadMatchMunicipio, getLocalidadMatchEstado, getColonia, getColoniaDesc, getColoniaMatchLocalidadCP, getColoniaMatchLocalidad, 
    getColoniaMatchMunicipio, getColoniaMatchEstado, getColoniaMatchMunicipioCP, getProducto, getProductoExist, getProductoMatchSector, getCausaId, getProductoCausaId,
    getRamo, getClaveSIPRES, getClaveSIPRESMatchInstitucion, getPenalizacion 
} from "./quejas.Queries.js";
import redis from 'redis';

export async function loadDataToRedis() {
    let redisClient;

    try {

        // Crear un array con todas las funciones de consulta
        const queries = [
            getCalendario(), getFechaAñoFecRecepcion(QuejasFecRecepcion), getFechaAñoFecAtencion, getFechaAñoFecNotificacion, getInstitucionClave, getSector, getSectorMatchInstitucion,
            getQuejaFolio, getEstadosData, getMedioRecepcion, getNivelAtencion, getCPData, getMunicipio, getMunicipioDesc, getMunicipioMatchCodigoPostal, getMunicipioMatchEstado,
            getCodigoPostalMatchEstado, getCodigoPostalMatchColonia, getCodigoPostalMatchLocalidad, getCodigoPostalMatchMunicipio, getLocalidad, getLocalidadDesc, 
            getLocalidadMatchMunicipioCP, getLocalidadMatchMunicipio, getLocalidadMatchEstado, getColonia, getColoniaDesc, getColoniaMatchLocalidadCP, getColoniaMatchLocalidad, 
            getColoniaMatchMunicipio, getColoniaMatchEstado, getColoniaMatchMunicipioCP, getProducto, getProductoExist, getProductoMatchSector, getCausaId, getProductoCausaId,
            getRamo, getClaveSIPRES, getClaveSIPRESMatchInstitucion, getPenalizacion
        ];

        // Iterar sobre cada consulta de manera asincrónica
        for (const queryFunction of queries) {
            const query = await queryFunction(); // Esperar a que la promesa se resuelva
            console.log(`Executing query from ${queryFunction.name}: ${query}`);
            
            const result = await redisClient.execute(query);
            
            if (result && result.rows) {
                for (const row of result.rows) {
                    // Asumiendo que la primera columna es un ID único
                    const key = `${queryFunction.name}:${row[0]}`;
                    client.set(key, JSON.stringify(row), redis.print);
                }
            } else {
                console.error(`No rows returned for query: ${query}`);
            }
        }

    } catch (err) {
        console.error("Error executing query: ", err);
    } finally {
        if (redisClient) {
            try {
                await redisClient.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

loadDataToRedis();
*/