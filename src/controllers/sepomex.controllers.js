import { response } from 'express'
import { pool } from '../database/redeco_db.js'


export const getEstados = async (request, response) => {
    try {
        const estadosArray = []
        const estadosQuery = await pool.execute(`SELECT * FROM REDECO.ESTADOS`, [])
        estadosQuery.rows.map(estado => {
            const item = {}
            item['claveEdo'] = estado[0]
            item['estado'] = estado[1]
            estadosArray.push(item)
        })
        response.status(200).json({
            'estados': estadosArray
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que ocurrió un error al intentar consultar los estados'
        })
    }
}


export const getCodigosPostales = async (request, response) => {

    const estadoId = request.query.estado_id

    if (!estadoId) {
        return response.status(400).json({
            error: 'El campo estado_id no fue proporcionado. Es obligatorio.'
        })
    }
    try {
        const codigosArray = []
        const codigosQuery = await pool.execute(`
            SELECT S.ESTADOSID, E.ESTADOSDESC, S.SEPOMEXCP
            FROM REDECO.SEPOMEX S
            INNER JOIN REDECO.ESTADOS E ON S.ESTADOSID = E.ESTADOSID
            WHERE S.ESTADOSID = :estadoId
        `, [estadoId])

        codigosQuery.rows.map(codigo => {
            const item = {}
            item['estadoId'] = codigo[0]
            item['estado'] = codigo[1]
            item['codigo_sepomex'] = codigo[2]
            codigosArray.push(item)
        })
        response.status(200).json({
            'codigos_postales': codigosArray
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que ha habido un error al consultar los códigos postales'
        })
    }
}



export const getMunicipiosEstado = async (request, response) => {
    const estadoId = request.query.estado_id
    const cp = request.query.cp

    if (!estadoId && !cp) {
        return response.status(400).json({
            error: 'Los campos estado_id y cp no fueron proporcionados. Son obligatorios.'
        })
    } else if (!estadoId) {
        return response.status(400).json({
            error: 'El campo estado_id no fue proporcionado. Es obligatorio.'
        })
    } else if (!cp) {
        return response.status(400).json({
            error: 'El campo cp no fue proporcionado. Es obligatorio.'
        })
    }
    try {
        const municipiosArray = []
        const municipiosQuery = await pool.execute(`
        SELECT DISTINCT ESTADOSID, SEPOMEXMUNID, SEPOMEXMUNDESC
        FROM REDECO.SEPOMEX 
        WHERE ESTADOSID = :estadoId AND SEPOMEXCODIGOPOSTAL =:cp
        ORDER BY SEPOMEXMUNID
        `, [estadoId, cp])
        municipiosQuery.rows.map(municipio => {
            const item = {}
            item['estadoId'] = municipio[0]
            item['municipioId'] = municipio[1]
            item['municipio'] = municipio[2]
            municipiosArray.push(item)
        })
        response.status(200).json({
            municipios: municipiosArray
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que ha habido un error al intentar consultar los municipios del estado seleccionado'
        })
    }
}


export const getColonias = async (request, response) => {
    const cp = request.query.cp

    if (!cp) {
        return response.status(400).json({
            error: 'El campo cp no fue proporcionado. Es obligatorio.'
        })
    }
    try {
        const coloniasArray = []
        const coloniasQuery = await pool.execute(`
        SELECT S.ESTADOSID, E.ESTADOSDESC, S.SEPOMEXMUNID, S.SEPOMEXMUNDESC, S.SEPOMEXCOLID, S.SEPOMEXCOLDESC, S.SEPOMEXTIPASEID, S.SEPOMEXTIPASEDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E ON S.ESTADOSID = E.ESTADOSID
        WHERE SEPOMEXCODIGOPOSTAL =:cp
        ORDER BY S.SEPOMEXCOLID
        `, [cp])
        coloniasQuery.rows.map(colonia => {
            const item = {}
            item['estadoId'] = colonia[0]
            item['estado'] = colonia[1]
            item['municipioId'] = colonia[2]
            item['municipio'] = colonia[3]
            item['coloniaId'] = colonia[4]
            item['colonia'] = colonia[5]
            item['tipoLocalidadId'] = colonia[6]
            item['tipoLocalidad'] = colonia[7]
            coloniasArray.push(item)
        })
        response.status(200).json({
            'colonias': coloniasArray
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que hubo un error al consultar las colonias'
        })
    }
}
