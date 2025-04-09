import dotenv from "dotenv";
import { getExistAcuseDelete } from "../database/quejas.Queries.js";

dotenv.config();

const validateExistAcuse = async (errors, institucionClave) => {
  try {
    const ENCFECCIERRE = await getExistAcuseDelete(institucionClave);
  
    if (ENCFECCIERRE !== null) {
      errors.push(`No se pueden eliminar quejas una vez que ya se generó su acuse en el portal.`);
    }
  } catch (error) {
    console.error("Error en validateExistAcuse:", error);
  }
};

export const validateAcuseDelete = async (req, res, next) => {
  try {
    //const quejas = req.body; // Obtiene los datos de la solicitud
    const errors = [];
    const { institucionClave } = req; // Obtén institucionClave de req
/*
    // Verifica si quejas es un array
    if (!Array.isArray(quejas)) {
      throw new TypeError('quejas debe ser un array');
    }

    for (const queja of quejas) {
      //const { QuejasNoMes } = queja;
      await validateExistAcuse(errors, institucionClave);
    }
*/
await validateExistAcuse(errors, institucionClave);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next(); // Si no hay errores, continuar con la siguiente función en el middleware
  } catch (error) {
    console.error("Error en validateAcuse:", error);
    return res.status(500).json({ error: "No se pudo verificar el estado del acuse." });
  }
};