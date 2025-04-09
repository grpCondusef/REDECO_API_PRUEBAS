import { response } from "express";
import { pool } from "../database/redeco_db.js"
import { splitProduct } from "../helpers/quejas.helpers.js";

export const getInstitucionesFinancieras = async (request, response) => {
    try {

        const insticitucionesArray = []

        const institucionesData = await pool.execute(`
            SELECT I.INSTITUCIONCLAVE, I.INSTITUCIONNOMBRE, I.SECTORID, S.SECTORDESC
            FROM REDECO.INSTITUCION I
            INNER JOIN REDECO.SECTOR S ON I.SECTORID = S.SECTORID
        `);

        institucionesData.rows.map(institucion => {
            const item = {}
            item['clave'] = institucion[0]
            item['denominacion'] = institucion[1]
            item['sectorId'] = institucion[2]
            item['sectorDsc'] = institucion[3]
            insticitucionesArray.push(item)
        })

        response.status(200).json({
            'instituciones': insticitucionesArray
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            'error': 'Parece que ha ocurrido un error al intentar consultar el catálogo de instituciones financieras'
        });
    }
};


export const getProducts = async (request, response) => {

    const { institucionClave } = request

    try {

        let prod1List = []

        const prod1Query = await pool.execute(
            `
              SELECT P.PROD3CODIGO, P.PROD3DESC, I.INSTITUCIONNOMBRE
              FROM REDECO.PROD3 P
              INNER JOIN REDECO.INSTITUCION I ON I.INSTITUCIONCLAVE = P.INSTITUCIONCLAVE
              WHERE P.INSTITUCIONCLAVE = :institucionClave AND PROD3ESTATUS = 1
            `, [institucionClave])

        prod1Query.rows.map(prod => {
            const item = {}
            item['productId'] = prod[0]
            item['product'] = prod[1]
            item['institucion'] = prod[2]
            prod1List.push(item)
        })

        response.status(200).json({
            products: prod1List
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: 'Parece que hubo un error al intentar consultar la tabla de prod1.'
        })
    }
}



export const getCausasList = async (request, response) => {

    const { institucionClave } = request
    const { product } = request.query
    const products = splitProduct(product)
    const { prod1Id, prod2Id, prod3Id } = products

    try {

        let causasList = []

        const causasQuery = await pool.execute(
            `
                SELECT C.INSTITUCIONCLAVE, C.CAUSASCODIGO, C.CAUSASDESC, I.INSTITUCIONNOMBRE
                FROM REDECO.CAUSAS C
                INNER JOIN REDECO.INSTITUCION I ON I.INSTITUCIONCLAVE = C.INSTITUCIONCLAVE
                WHERE C.INSTITUCIONCLAVE = :institucionClave AND C.PROD1ID = :prod1 AND C.PROD2ID = :prod2 AND C.PROD3ID = :prod3 AND CAUSASESTATUS = 1
            `, [institucionClave, prod1Id, prod2Id, prod3Id])

        causasQuery.rows.map(causa => {
            const item = {}
            item['causaId'] = causa[1]
            item['causa'] = causa[2]
            item['institucion'] = causa[3]
            causasList.push(item)
        })

        response.status(200).json({
            causas: causasList
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: 'Parece que hubo un error al intentar consultar las causas'
        })
    }
}



export const getMediosDeRecepcion = async (request, response) => {
    try {

        const mediosArray = []

        const mediosQuery = await pool.execute(`SELECT * FROM REDECO.MEDIO WHERE MEDIOESTATUS=1`, [])

        const medios = mediosQuery.rows.map(medio => {
            const item = {}
            item['medioId'] = medio[0]
            item['medioDsc'] = medio[1]
            mediosArray.push(item)
        })

        response.status(200).json({
            'medio': mediosArray
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que ha ocurrido un error al intentar consultar los medios de Recepción'
        })
    }
}



export const getNivelesDeAtencion = async (request, response) => {
    try {

        const nivelesdeAtencionArray = []

        const nivelesQuery = await pool.execute(`SELECT * FROM REDECO.NIVELAT`, [])

        const niveles = nivelesQuery.rows.map(nivel => {
            const item = {}
            item['nivelDeAtencionId'] = nivel[0]
            item['nivelDeAtencionDsc'] = nivel[1]
            nivelesdeAtencionArray.push(item)
        })

        response.status(200).json({
            'nivelesDeAtencion': nivelesdeAtencionArray
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            'error': 'Parece que ha ocurrido un error al intentar consultar los medios de Recepción'
        })
    }
}
