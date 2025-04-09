import dotenv from "dotenv";
import { convertDateToFormat, convertDateFormatToCustomISO } from "../../helpers/handleDates.js";
import { getCalendario, getFechaAñoFecRecepcion } from "../../database/quejas.Queries.js";


dotenv.config();

const validateDateFormat = (errors, QuejasFecResolucion, QuejasFolio) => {
  const fechaFormato = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!fechaFormato.test(QuejasFecResolucion) && errors.length === 0) {
    errors.push(`El formato del campo Fecha de Resolución no es válido. Debe de ser dd/mm/aaaa en el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateFecResolucionIsOnRequest = (errors, QuejasFecResolucion, QuejasFolio) => {
  if (!QuejasFecResolucion) {
    errors.push(`El campo Fecha de Resolución es obligatorio. El asunto está concluido. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatDay = (errors, QuejasFecResolucion, QuejasFolio) => {
  const [day, month, year] = QuejasFecResolucion.split("/").map(Number);

  // Verificar si el mes es válido
  if (month < 1 || month > 12 && errors.length === 0) {
    errors.push(`La Fecha de Resolución no es válida. El mes proporcionado (${month}) es inválido. La fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatMonth = (errors, QuejasFecResolucion, QuejasFolio) => {

  const [day, month] = QuejasFecResolucion.split("/").map(String);
  //const fechaConve = new Date(year, month - 1, day);
  if (month < 1 || month > 12 || month.length < 2 && errors.length === 0) {
    errors.push(`La Fecha de Resolución no es válida. El formato del mes no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatYear = (errors, QuejasFecResolucion, QuejasFolio) => {

  const [day, month, year] = QuejasFecResolucion.split("/").map(String);
  //const fechaConve = new Date(year, month - 1, day);
  if (year.length !== 4 && errors.length === 0) {
    errors.push(`La Fecha de Resolución no es válida. El formato del año no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateIsOnTheRangeIni = (errors, QuejasFecResolucion, calendarioFec, QuejasFolio) => {
  // Espera a que se resuelva la promesa devuelta por getCalendario()

  const fecha = convertDateFormatToCustomISO(QuejasFecResolucion);
  const fechaInicioProceso = calendarioFec.rows[0][3];
  let fechaConvercionInicio = convertDateToFormat(fechaInicioProceso);
  
  if (fecha <= fechaConvercionInicio && errors.length === 0) {
    return errors.push(`La Fecha de Resolución no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`)
  }
};

const validateDayOnTheRange = async (errors, QuejasFecResolucion, QuejasFolio) => {
  
  try {
    const fechaExists = await getFechaAñoFecRecepcion(QuejasFecResolucion);
    //console.log(fechaExists.rows)
    if (!fechaExists.rows && errors.length === 0) {
        errors.push(`El día no es válido en el campo Fecha de Resolución. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
} catch (error) {
    console.log(error)
    return true; // Indica que se ha detectado un error
}
};

const validateDateIsOnTheRangeFin = (errors, QuejasFecResolucion, calendarioFec, QuejasFolio) => {
  // Espera a que se resuelva la promesa devuelta por getCalendario()

  const fecha = convertDateFormatToCustomISO(QuejasFecResolucion);
  const fecharecepcion = fecha.substring(0,10)
  const fechaFinalProceso = calendarioFec.rows[0][4];
  let fechaConvercionFinal = convertDateToFormat(fechaFinalProceso);
    
  if (fecharecepcion > fechaConvercionFinal && errors.length === 0) {
    return errors.push(`La Fecha de Resolución no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`)
  }
};

const validateDateIsOnTheRangeFechaRecepcion = (errors, QuejasFecResolucion, QuejasFecRecepcion, QuejasFolio) => {
  const fechaAtencion = convertDateFormatToCustomISO(QuejasFecResolucion);
  const fechaConsulta = convertDateFormatToCustomISO(QuejasFecRecepcion);
  
  if (fechaAtencion < fechaConsulta && errors.length === 0) {
      errors.push(`La Fecha de Resolución debe de ser mayor o igual a la Fecha de Recepción. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

export const validateFecResolucion = async (quejas) => {
  const errors = [];
  const calendarioFec = await getCalendario();

  // Verifica si quejas es un array
  if (!Array.isArray(quejas)) {
      throw new TypeError('quejas debe ser un array');
  }

  const validateQuejas = async () => {
      for (const queja of quejas) {
          const { QuejasFecResolucion, QuejasFecRecepcion, QuejasEstatus, QuejasFolio } = queja;

          if (QuejasEstatus === 1 && QuejasFecResolucion !== null && errors.length === 0) {
             errors.push(`La Fecha de Resolución debe ser null ya que el folio ${QuejasFolio} está pendiente.`)
          }
          if (QuejasEstatus === 2) {
          if (validateFecResolucionIsOnRequest(errors, QuejasFecResolucion, QuejasFolio)) continue;
          if (validateDateFormat(errors, QuejasFecResolucion, QuejasFolio)) continue;  
          if (validateDateFormatDay(errors, QuejasFecResolucion, QuejasFolio)) continue;
          if (validateDateFormatMonth(errors, QuejasFecResolucion, QuejasFolio)) continue;
          if (validateDateFormatYear(errors, QuejasFecResolucion, QuejasFolio)) continue;
          if (await validateDateIsOnTheRangeIni(errors, QuejasFecResolucion, calendarioFec, QuejasFolio)) continue;
          if (await validateDateIsOnTheRangeFechaRecepcion(errors, QuejasFecResolucion, QuejasFecRecepcion, QuejasFolio)) continue;
          if (await validateDayOnTheRange(errors, QuejasFecResolucion, QuejasFolio)) continue;
          }
      }
  };

  await validateQuejas();
  return errors; // Devuelve el arreglo de errores
};
