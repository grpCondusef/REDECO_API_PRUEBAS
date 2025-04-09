import { pool } from "../database/redeco_db.js";

export const deleteQueja = async (request, response) => {

  const { institucionClave } = request
  const { quejaFolio } = request.query
  
  if (!quejaFolio) {
    return response.status(400).json({
      msg: `El parámetro quejaFolio es obligatorio`
    })
  }

  const mesActual = new Date().getMonth()+1; // Sumar 1 porque los meses van de 0 a 11
  //const mesActual = 12; // Sumar 1 porque los meses van de 0 a 11
  
  try {
    const quejaQuery = await pool.execute(`
      DELETE FROM REDECO.QUEJAS
      WHERE INSTITUCIONCLAVE = :institucionClave AND QUEJASFOLIO = :quejaFolio AND ANIOID = EXTRACT(YEAR FROM SYSDATE) AND QUEJASNOTRIM = :mesActual
    `, [institucionClave, quejaFolio, mesActual], { autoCommit: true })
   
    //WHERE INSTITUCIONCLAVE = :institucionClave AND QUEJASFOLIO = :quejaFolio AND ANIOID = 2024 AND QUEJASNOTRIM = :mesActua
    if (quejaQuery.rowsAffected < 1) {
      return response.status(400).json({
        msg: `Ya no es posible eliminar el folio ${quejaFolio}.`
      })
    }
    return response.status(200).json({
      msg: `La queja con el folio ${quejaFolio} ha sido eliminada correctamente`
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      error: 'Parece que ocurrió un error al intentar eliminar una queja'
    })
  }
}
