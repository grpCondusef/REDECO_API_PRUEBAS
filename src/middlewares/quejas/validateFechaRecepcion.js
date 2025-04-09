import dotenv from "dotenv";
import { convertDateToFormat, convertDateFormatToCustomISO } from "../../helpers/handleDates.js";
import { getCalendario, getFechaAñoFecRecepcion } from "../../database/quejas.Queries.js";

dotenv.config();

const validateDateFormat = (errors, QuejasFecRecepcion, QuejasFolio) => {
  const fechaFormato = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!fechaFormato.test(QuejasFecRecepcion) && errors.length === 0) {
    errors.push(`El formato del campo Fecha de Recepción no es válido. Debe de ser dd/mm/aaaa en el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateFechaRecepcionIsOnRequest = (errors, QuejasFecRecepcion, QuejasFolio) => {
  if (!QuejasFecRecepcion && errors.length === 0){
    errors.push(`El campo Fecha de Recepción es obligatorio. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatDay =  (errors, QuejasFecRecepcion, QuejasFolio) => {
  
  const [day] = QuejasFecRecepcion.split("/").map(String);
  if (day < 1 || day > 31 || day.length < 2 && errors.length === 0) {
    errors.push(`La Fecha de Recepción no es válida. El formato del día no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatMonth =  (errors, QuejasFecRecepcion, QuejasFolio) => {
  
  const [day ,month] = QuejasFecRecepcion.split("/").map(String);
  if (month < 1 || month > 12 || month.length < 2 && errors.length === 0) {
    errors.push(`La Fecha de Recepción no es válida. El formato del mes no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`)
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatYear =  (errors, QuejasFecRecepcion, QuejasFolio) => {
  
  const [day ,month, year] = QuejasFecRecepcion.split("/").map(String);
  if (year.length !== 4 && errors.length === 0) {
  errors.push(`La Fecha de Recepción no es válida. El formato del año no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}`)
  return true; // Indica que se ha detectado un error
  }
 return false;
};

const validateDateIsOnTheRangeIni = (errors, QuejasFecRecepcion, calendarioFec, QuejasFolio) => {
  // Espera a que se resuelva la promesa devuelta por getCalendario()

  const fecha = convertDateFormatToCustomISO(QuejasFecRecepcion);
  const fechaInicioProceso = calendarioFec.rows[0][3];
  let fechaConvercionInicio = convertDateToFormat(fechaInicioProceso);
  
  if (fecha <= fechaConvercionInicio && errors.length === 0) {
    return errors.push(`La Fecha de Recepción no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`)
  }
};

const validateDayOnTheRange = async (errors, QuejasFecRecepcion, QuejasFolio) => {
    
  try {
    const fechaExists = await getFechaAñoFecRecepcion(QuejasFecRecepcion);
  
    if (!fechaExists && errors.length === 0) {
        errors.push(`El día no es válido en el campo Fecha de Recepción. En el folio ${QuejasFolio}.`)
        return true; // Indica que se ha detectado un error
    }
    return false;
} catch (error) {
    console.log(error)
    return true; // Indica que se ha detectado un error
}
};

const validateDateIsOnTheRangeFin = (errors, QuejasFecRecepcion, calendarioFec, QuejasFolio) => {
  // Espera a que se resuelva la promesa devuelta por getCalendario()

  const fecha = convertDateFormatToCustomISO(QuejasFecRecepcion);
  const fecharecepcion = fecha.substring(0,10)
  const fechaFinalProceso = calendarioFec.rows[0][4];
  let fechaConvercionFinal = convertDateToFormat(fechaFinalProceso);
    
  if (fecharecepcion > fechaConvercionFinal && errors.length === 0) {
    return errors.push(`La Fecha de Recepción no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`)
  }
};

export const validateFechaRecepcion = async (quejas) => {
  const errors = [];
  const calendarioFec = await getCalendario();

  // Verifica si quejas es un array
  if (!Array.isArray(quejas)) {
      throw new TypeError('quejas debe ser un array');
  }

  const validateQuejas = async () => {
      for (const queja of quejas) {
          const { QuejasFecRecepcion, QuejasFolio } = queja;
          if (validateFechaRecepcionIsOnRequest(errors, QuejasFecRecepcion, QuejasFolio)) continue;
          if (validateDateFormat(errors, QuejasFecRecepcion, QuejasFolio)) continue;  
          if (validateDateFormatDay(errors, QuejasFecRecepcion, QuejasFolio)) continue;
          if (validateDateFormatMonth(errors, QuejasFecRecepcion, QuejasFolio)) continue;
          if (validateDateFormatYear(errors, QuejasFecRecepcion, QuejasFolio)) continue;
          if (await validateDateIsOnTheRangeIni(errors, QuejasFecRecepcion, calendarioFec, QuejasFolio)) continue;
          if (await validateDateIsOnTheRangeFin(errors, QuejasFecRecepcion, calendarioFec, QuejasFolio)) continue;
          if (await validateDayOnTheRange(errors, QuejasFecRecepcion, QuejasFolio)) continue;
          }
      };
  await validateQuejas();
  return errors; // Devuelve el arreglo de errores
};
