import dotenv from "dotenv";
import { convertDateToFormat, convertDateFormatToCustomISO } from "../../helpers/handleDates.js";
import { getCalendario, getFechaAñoFecAtencion } from "../../database/quejas.Queries.js";

dotenv.config();

const validateDateFormat = (errors, QuejasFecNotificacion, QuejasFolio) => {
  const fechaFormato = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!fechaFormato.test(QuejasFecNotificacion) && errors.length === 0) {
    errors.push(`El formato del campo Fecha de Notificación al usuario no es válido. Debe de ser dd/mm/aaaa en el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateFecNotificacionIsOnRequest = (errors, QuejasFecNotificacion, QuejasFolio) => {
  if (!QuejasFecNotificacion && errors.length === 0) {
    errors.push(`El campo Fecha de Notificación al usuario es obligatorio. El asunto está concluido. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatDay = (errors, QuejasFecNotificacion, QuejasFolio) => {
  const [day, month, year] = QuejasFecNotificacion.split("/").map(Number);

  // Verificar si el mes es válido
  if (month < 1 || month > 12 && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario no es válida. El mes proporcionado (${month}) es inválido. La fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatMonth = (errors, QuejasFecNotificacion, QuejasFolio) => {
  const [day, month] = QuejasFecNotificacion.split("/").map(String);
  if (month < 1 || month > 12 || month.length < 2 && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario no es válida. El formato del mes no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateFormatYear = (errors, QuejasFecNotificacion, QuejasFolio) => {
  const [day, month, year] = QuejasFecNotificacion.split("/").map(String);
  if (year.length !== 4 && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario no es válida. El formato del año no es válido ya que la fecha debe ser dd/mm/aaaa. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateIsOnTheRangeIni = (errors, QuejasFecNotificacion, calendarioFec, QuejasFolio) => {
  const fecha = convertDateFormatToCustomISO(QuejasFecNotificacion);
  const fechaInicioProceso = calendarioFec.rows[0][3];
  const fechaConvercionInicio = convertDateToFormat(fechaInicioProceso);

  if (fecha <= fechaConvercionInicio && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDayOnTheRange = async (errors, QuejasFecNotificacion, QuejasFolio) => {
  try {
    const fechaExists = await getFechaAñoFecAtencion(QuejasFecNotificacion);
    
    if (!fechaExists && errors.length === 0) {
      errors.push(`El día no es válido en el campo Fecha de Notificación al usuario. En el folio ${QuejasFolio}.`);
      return true; // Indica que se ha detectado un error
    }
    return false;
  } catch (error) {
    console.log(error);
    errors.push('Hubo un error en el servidor');
    return true; // Indica que se ha detectado un error
  }
};

const validateDateIsOnTheRangeFin = (errors, QuejasFecNotificacion, calendarioFec, QuejasFolio) => {
  const fecha = convertDateFormatToCustomISO(QuejasFecNotificacion);
  const fecharecepcion = fecha.substring(0, 10);
  const fechaFinalProceso = calendarioFec.rows[0][4];
  const fechaConvercionFinal = convertDateToFormat(fechaFinalProceso);

  if (fecharecepcion > fechaConvercionFinal && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario no corresponde con el mes o el mes no está aperturado. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateIsOnTheRangeFechaRecepcion = (errors, QuejasFecNotificacion, QuejasFecRecepcion, QuejasFolio) => {
  const fechaAtencion = convertDateFormatToCustomISO(QuejasFecNotificacion);
  const fechaConsulta = convertDateFormatToCustomISO(QuejasFecRecepcion);

  if (fechaAtencion < fechaConsulta && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario debe de ser mayor o igual a la Fecha de Recepción. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateDateIsOnTheRangeResolucion = (errors, QuejasFecNotificacion, QuejasFecResolucion, QuejasFolio) => {
  const fechaNotificacion = convertDateFormatToCustomISO(QuejasFecNotificacion);
  const fechaResolucion = convertDateFormatToCustomISO(QuejasFecResolucion);

  if ((fechaNotificacion < fechaResolucion) && errors.length === 0) {
    errors.push(`La Fecha de Notificación al usuario debe de ser mayor o igual a la Fecha de Resolución. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

export const validateFecNotificacion = async (quejas) => {
  const errors = [];
  const calendarioFec = await getCalendario();

  // Verifica si quejas es un array
  if (!Array.isArray(quejas)) {
    throw new TypeError('quejas debe ser un array');
  }

  const validateQuejas = async () => {
    for (const queja of quejas) {
      const { QuejasFecNotificacion, QuejasFecRecepcion, QuejasFecResolucion, QuejasEstatus, QuejasFolio } = queja;

      if (QuejasEstatus === 1 && QuejasFecNotificacion !== null && errors.length === 0) {
        errors.push(`La Fecha de Notificación al Usuario debe ser null ya que el folio ${QuejasFolio} está pendiente.`);
      }

      if (QuejasEstatus === 2) {
        if (validateFecNotificacionIsOnRequest(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateFormat(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateFormatDay(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateFormatMonth(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateFormatYear(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateIsOnTheRangeIni(errors, QuejasFecNotificacion, calendarioFec, QuejasFolio)) continue;
        if (validateDateIsOnTheRangeFechaRecepcion(errors, QuejasFecNotificacion, QuejasFecRecepcion, QuejasFolio)) continue;
        if (await validateDayOnTheRange(errors, QuejasFecNotificacion, QuejasFolio)) continue;
        if (validateDateIsOnTheRangeResolucion(errors, QuejasFecNotificacion, QuejasFecResolucion, QuejasFolio)) continue;
      }
    }
  };

  await validateQuejas();
  return errors; // Devuelve el arreglo de errores
};
