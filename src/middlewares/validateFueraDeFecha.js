import dotenv from "dotenv";
import { convertDateToFormat } from "../helpers/handleDates.js";
import { getCalendarioInPeriod } from "../database/quejas.Queries.js";

dotenv.config();

const validateDateIsOnTheRangeIni = (fechaHora, errors, calendarioFec) => {
  const fechaInicioProceso = calendarioFec.rows[0][4];  
  const fechaConvercionInicio = convertDateToFormat(fechaInicioProceso);
  const fechaHoraConvercionFinal = convertDateToFormat(fechaHora);
  
  if (fechaHoraConvercionFinal < fechaConvercionInicio) {
    errors.push(`No es posible enviar quejas. Información fuera de los 5 primeros días hábiles.`);
  }
};

const validateDateIsOnTheRangeFin = (fechaHora, errors, calendarioFec) => {
  const fechaFinalProceso = calendarioFec.rows[0][5];  
  const fechaConvercionFinal = convertDateToFormat(fechaFinalProceso);
  const fechaHoraConvercionFinal = convertDateToFormat(fechaHora);
  
  if (fechaHoraConvercionFinal > fechaConvercionFinal) {
    errors.push(`No es posible enviar quejas. Información fuera de los 5 primeros días hábiles.`);
  }
};

export const validateFechaRecepcion = async (req, res, next) => {
  try {
    const errors = [];
    const calendarioFec = await getCalendarioInPeriod();
    const fechaHora = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO
    
    validateDateIsOnTheRangeIni(fechaHora, errors, calendarioFec);
    validateDateIsOnTheRangeFin(fechaHora, errors, calendarioFec);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next(); // Si no hay errores, continuar con la siguiente función en el middleware
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No hay periodo abierto para el envío de información." });
  }
};
