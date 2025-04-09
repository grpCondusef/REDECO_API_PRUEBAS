import { pool } from "../database/redeco_db.js";
import { getMunicipioDesc, getLocalidadDesc, getColoniaDesc } from "../database/quejas.Queries.js";
import { splitProduct, splitCausa } from "../helpers/quejas.helpers.js";
import { convertDateFormatToCustomISO, getDatetime, getDateOnly } from "../helpers/handleDates.js";
import { response } from "express";


export const addQuejas = async (request, response) => {
  try {
    const quejas = request.body;
    const addedQuejas = [];
    let counter = 0;
    const { institucionClave, sectorid, username, denominacion_social } = request;
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
        
    for (const queja of quejas) {
      try {
        let prod1Id;
        let prod2Id;
        let prod3Id;
        let causaid;
        const quejaProduct = queja.QuejasProducto;
        const quejaCausa = queja.QuejasCausa;

        const [ municipiosDesc, localidadDesc, coloniaDesc ] = await Promise.all([
          getMunicipioDesc(queja.QuejasEstados, queja.QuejasCP, queja.QuejasMunId),
          getLocalidadDesc(queja.QuejasEstados, queja.QuejasCP, queja.QuejasMunId, queja.QuejasLocId),
          getColoniaDesc(queja.QuejasEstados, queja.QuejasCP, queja.QuejasMunId, queja.QuejasLocId, queja.QuejasColId)
      ]);


        if (quejaProduct && typeof quejaProduct === "string") {
          const products = splitProduct(quejaProduct);
          ({ prod1Id, prod2Id, prod3Id } = products);
        }

        if (quejaCausa && typeof quejaCausa === "string") {
          const causas = splitCausa(quejaCausa);
          ({ causaid } = causas);
        }

        //if (currentMonth == 0) {
        //  let currentYear = currentDate.getFullYear();
        //  currentYear = currentYear - 1
        //}
        
        const quejaData = {
          INSTITUCIONCLAVE: institucionClave,
          QUEJASFOLIO: queja.QuejasFolio.trim(),
          CAUSASID: causaid,
          ANIOID: (currentYear),
          QUEJASNOTRIM: queja.QuejasNoMes,
          PROD1ID: prod1Id,
          PROD2ID: prod2Id,
          PROD3ID: prod3Id,
          QUEJASESTATUS: queja.QuejasEstatus,
          QUEJASRESPUESTA: queja.QuejasRespuesta,
          QUEJASREGESTATUS: "A",
          QUEJASTIPOCARGA: "A",
          QUEJASUSUARIO: username,
          QUEJASFECREG: getDatetime(currentDate),
          QUEJASFECRECEPCION: queja.QuejasFecRecepcion ? convertDateFormatToCustomISO(queja.QuejasFecRecepcion) : null,
          QUEJASFECCARGA: getDateOnly(currentDate),
          QUEJASIFNOMBRE: denominacion_social,
          QUEJASSECTORCVE: sectorid,
          QUEJASSECTOR: queja.QuejasSector,
          NIVELATID: queja.QuejasNivelAT,
          QUEJASNUM: queja.QuejasNum,
          QUEJASNUMPENAL: queja.QuejasNumPenal,
          QUEJASFECNOTIFICACION: convertDateFormatToCustomISO(queja.QuejasFecNotificacion),
          QUEJASFECRESOLUCION: convertDateFormatToCustomISO(queja.QuejasFecResolucion),
          QUEJASEDAD: queja.QuejasEdad,
          QUEJASSEXO: queja.QuejasSexo,
          QUEJASTIPOPERSONA: queja.QuejasTipoPersona,
          QUEJASCP: queja.QuejasCP,
          QUEJASCOLDSC: coloniaDesc && coloniaDesc.coloniadesc ? coloniaDesc.coloniadesc : null,
          QUEJASCOLID: queja.QuejasColId,
          QUEJASLOCDSC: localidadDesc && localidadDesc.localidaddesc ? localidadDesc.localidaddesc : null,
          QUEJASLOCID: queja.QuejasLocId,
          QUEJASMUNDSC: municipiosDesc && municipiosDesc.municipiodesc ? municipiosDesc.municipiodesc : null,
          QUEJASMUNID: queja.QuejasMunId,
          ESTADOSID: queja.QuejasEstados,
          QUEJASPORI: queja.QuejasPORI,
          MEDIOID: queja.QuejasMedio,
          PENALIZACIONID: queja.QuejasPenalizacion,
        }; 
        // Construye la consulta SQL para insertar la consulta
        const result = await pool.execute(
          `
          INSERT INTO REDECO.QUEJAS (
            INSTITUCIONCLAVE,
            QUEJASFOLIO,
            CAUSASID,
            ANIOID,
            QUEJASNOTRIM,
            PROD1ID,
            PROD2ID,
            PROD3ID,
            QUEJASESTATUS,
            QUEJASRESPUESTA,
            QUEJASREGESTATUS,
            QUEJASTIPOCARGA,
            QUEJASUSUARIO,
            QUEJASFECREG,
            QUEJASFECRECEPCION,
            QUEJASFECCARGA,
            QUEJASIFNOMBRE,
            QUEJASSECTORCVE,
            QUEJASSECTOR,
            NIVELATID,
            QUEJASNUM,
            QUEJASNUMPENAL,
            QUEJASFECNOTIFICACION,
            QUEJASFECRESOLUCION,
            QUEJASEDAD,
            QUEJASSEXO,
            QUEJASTIPOPERSONA,
            QUEJASCP,
            QUEJASCOLDSC,
            QUEJASCOLID,
            QUEJASLOCDSC,
            QUEJASLOCID,
            QUEJASMUNDSC,
            QUEJASMUNID,
            ESTADOSID,
            QUEJASPORI,
            MEDIOID,
            PENALIZACIONID
        ) VALUES (
            :INSTITUCIONCLAVE,
            :QUEJASFOLIO,
            :CAUSASID,
            :ANIOID,
            :QUEJASNOTRIM,
            :PROD1ID,
            :PROD2ID,
            :PROD3ID,
            :QUEJASESTATUS,
            :QUEJASRESPUESTA,
            :QUEJASREGESTATUS,
            :QUEJASTIPOCARGA,
            :QUEJASUSUARIO,
            TO_DATE(:QUEJASFECREG, 'YYYY-MM-DD HH24:MI:SS'),
            TO_DATE(:QUEJASFECRECEPCION, 'YYYY-MM-DD HH24:MI:SS'),
            TO_DATE(:QUEJASFECCARGA, 'YYYY-MM-DD HH24:MI:SS'),
            :QUEJASIFNOMBRE,
            :QUEJASSECTORCVE,
            :QUEJASSECTOR,
            :NIVELATID,
            :QUEJASNUM,
            :QUEJASNUMPENAL,
            TO_DATE(:QUEJASFECNOTIFICACION, 'YYYY-MM-DD HH24:MI:SS'),
            TO_DATE(:QUEJASFECRESOLUCION, 'YYYY-MM-DD HH24:MI:SS'),
            :QUEJASEDAD,
            :QUEJASSEXO,
            :QUEJASTIPOPERSONA,
            :QUEJASCP,
            :QUEJASCOLDSC,
            :QUEJASCOLID,
            :QUEJASLOCDSC,
            :QUEJASLOCID,
            :QUEJASMUNDSC,
            :QUEJASMUNID,
            :ESTADOSID,
            :QUEJASPORI,
            :MEDIOID,
            :PENALIZACIONID 
        )`
          , [
              quejaData.INSTITUCIONCLAVE,
              quejaData.QUEJASFOLIO,
              quejaData.CAUSASID,
              quejaData.ANIOID,
              quejaData.QUEJASNOTRIM,
              quejaData.PROD1ID,
              quejaData.PROD2ID,
              quejaData.PROD3ID,
              quejaData.QUEJASESTATUS,
              quejaData.QUEJASRESPUESTA,
              quejaData.QUEJASREGESTATUS,
              quejaData.QUEJASTIPOCARGA,
              quejaData.QUEJASUSUARIO,
              quejaData.QUEJASFECREG,
              quejaData.QUEJASFECRECEPCION,
              quejaData.QUEJASFECCARGA,
              quejaData.QUEJASIFNOMBRE,
              quejaData.QUEJASSECTORCVE,
              quejaData.QUEJASSECTOR,
              quejaData.NIVELATID,
              quejaData.QUEJASNUM,
              quejaData.QUEJASNUMPENAL,
              quejaData.QUEJASFECNOTIFICACION,
              quejaData.QUEJASFECRESOLUCION,
              quejaData.QUEJASEDAD,
              quejaData.QUEJASSEXO,
              quejaData.QUEJASTIPOPERSONA,
              quejaData.QUEJASCP,
              quejaData.QUEJASCOLDSC,
              quejaData.QUEJASCOLID,
              quejaData.QUEJASLOCDSC,
              quejaData.QUEJASLOCID,
              quejaData.QUEJASMUNDSC,
              quejaData.QUEJASMUNID,
              quejaData.ESTADOSID,
              quejaData.QUEJASPORI,
              quejaData.MEDIOID,
              quejaData.PENALIZACIONID

          ], { autoCommit: true });
          
        counter += 1;
        addedQuejas.push(quejaData.QUEJASFOLIO);
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({
          error: 'Parece que hubo un error al intentar agregar una queja a la base de datos.'
        });
      }
    }

    response.status(200).json({
      'Número total de envios': counter,
      'Quejas enviadas': addedQuejas,
      message: 'Los registros mostrados arriba fueron adicionados.'
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
};
