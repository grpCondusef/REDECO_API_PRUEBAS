import { pool } from "../database/redeco_db.js";

export const getQuejas = async (request, response) => {

    const { institucionClave } = request
    const { year, month } = request.query
  
    try {
      const quejas = await pool.execute(
        `
          SELECT INSTITUCIONCLAVE, QUEJASFOLIO, ANIOID
          FROM REDECO.QUEJAS 
          WHERE 
          EXTRACT(YEAR FROM QUEJASFECRECEPCION) = :year 
          AND EXTRACT(MONTH FROM QUEJASFECRECEPCION) = :month
          AND INSTITUCIONCLAVE = :intitucionClave
        `,
        {
          year: Number(year),
          month: Number(month),
          intitucionClave: institucionClave
        }
      )
  
      let quejasList = [];
  
      const quejasItem = quejas.rows.map(async (queja, index) => {
        let item = {};
        item["institucionClave"] = queja[0];
        item["folio"] = queja[1];
        item["year"] = queja[2];
        item["month"] = month;
        quejasList.push(item);
      });
  
      response.status(200).json({
        quejas: quejasList,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        msg: "Ocurrió un error al intentar consultar datos",
      });
    }
  };
  