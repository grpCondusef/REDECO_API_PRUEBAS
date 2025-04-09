import { getConnection } from "oracledb";
import { pool } from "../database/reune_db.js";
import {
  convertDateToFormat,
  getTodayDate,
  verifyFormatDate,
  convertDateFormatToCustomISO,
} from "./handleDates.js";

/////////// MES A INFORMAR ///////////
export const validateQuejasNoTrim = (queja) => {
  const errors = [];

  if (!queja.QuejasNoTrim) {
    errors.push("El campo QuejasNoTrim es obligatorio");
  } else if (typeof queja.QuejasNoTrim !== "number") {
    errors.push("El campo QuejasNoTrim debe ser de tipo Number");
  } else {
    // Obtener el mes actual
    const mesActual = new Date().getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11

    // Comparar el mes actual con el mes de QuejasNoTrim
    if (queja.QuejasNoTrim !== mesActual) {
      errors.push("El mes de la queja no corresponde al periodo actual");
    }
  }
  
  return errors;
};


/////////// NÚMERO DE FOLIO ///////////

export const validateQuejasFolio = (queja, quejasFolioQuery) => {
  const errors = [];

  const folioExists = quejasFolioQuery;

  if (!queja.QuejasFolio) {
    errors.push("El campo QuejasFolio es obligatorio");
  } else if (typeof queja.QuejasFolio !== "string") {
    errors.push("El campo QuejasFolio debe ser de tipo String");
  } else if (queja.QuejasFolio.toString().length > 50) {
    errors.push(
      `La longitud máxima de QuejasFolio no debe ser mayor a 50, actual: ${queja.QuejasFolio.toString().length}`
    );
  } else if (folioExists === true) {
    errors.push(`Ya existe un folio ${queja.QuejasFolio} y debe de ser único`);
  }

  return errors;
};

/////////// FECHA DE LA QUEJA ///////////

export const validateQuejasFecRecepcion = (queja, calendario) => {
  const errors = [];

  const fechaQueja = convertDateFormatToCustomISO(queja.QuejasFecRecepcion);
  //const fechaQuejaFormat = convertDateFormatToCustomISO(fechaQueja);
  const fechaInicioProceso = calendario.rows[0][2];
  const fechaFinalProceso = calendario.rows[0][3];
  // Crear la nueva fecha en el formato deseado
  let fechaConvercionInicio = convertDateToFormat(fechaInicioProceso);
  let fechaConvercionFinal = convertDateToFormat(fechaFinalProceso);

  if (!queja.QuejasFecRecepcion) {
    errors.push("El campo QuejasFecRecepcion es obligatorio");
  } else if (
    fechaQueja < fechaConvercionInicio ||
    fechaQueja > fechaConvercionFinal
  ) {
    errors.push(
      "La fecha de la queja no se encuentra dentro del rango del periodo."
    );
  }

  return errors;
};


//////////// MEDIO DE RECEPCIÓN O CANAL ////////

export const validateMedioRecep = (queja, medioRecepcionQuery) => {
  const errors = [];
  const medioRecepcionExists = medioRecepcionQuery;

  if (!queja.MedioId) {
    errors.push("El campo MedioId es obligatorio");
  } else if (typeof queja.MedioId !== "number") {
    errors.push("El campo MedioId debe ser de tipo Number");
  } else if (!medioRecepcionExists) {
    errors.push(`El campo MedioId no coincide con ningún registro.`);
  }

  return errors;
};


//////////// NIVEL DE ATENCIÓN O CONTACTO ////////

export const validateNivelAtencion = (queja, nivelAtencionQuery) => {
  const errors = [];
  const nivelAtencionExists = nivelAtencionQuery;

  if (!queja.QuejasNivelAT) {
    errors.push("El campo QuejasNivelAT es obligatorio");
  } else if (typeof queja.QuejasNivelAT !== "number") {
    errors.push("El campo QuejasNivelAT debe ser de tipo number");
  } else if (!nivelAtencionExists) {
    errors.push(`El campo QuejasNivelAT no coincide con ningún registro.`);
  }

  return errors;
};


//////////// VALIDAR PRODUCTOS Y SUS CausaId ////////

export const validateProductsCausaId = (queja, productCausaIdQuery) => {
  const errors = [];
  const productsCausaIdExists = productCausaIdQuery;

  if (!queja.product) {
    errors.push("El campo product es obligatorio");
  } else if (typeof queja.product !== "string") {
    errors.push("El campo product debe ser de tipo string");
  } else if (!productsCausaIdExists) {
    errors.push(`El campo product no coincide con ninguna Causa.`);
  }

  return errors;
};



/////////// PORI ///////////

export const validateQuejasPORI = (queja) => {
  const errors = [];

  if (!queja.QuejasPORI) {
    errors.push("El campo QuejasPORI es obligatorio");
  } else if (typeof queja.QuejasPORI !== "string") {
    errors.push("El campo QuejasPORI debe ser de tipo String");
  } else if (queja.QuejasPORI.toString().length !== 2) {
    errors.push(
      `La longitud máxima de QuejasPORI debe ser de 2, actual: ${queja.QuejasPORI.length}`
    );
  } else {
    //Validación de Mayúsculas
    if (
      !queja.QuejasPORI.split("").every((char) => char === char.toUpperCase())
    ) {
      errors.push("El valor de QuejasPORI debe estar en mayúsculas.");
    }
  }

  return errors;
};

/////////// ESTADO ///////////

export const validateQuejasEstatus = (queja) => {
  const errors = [];

  if (!queja.QuejasEstatus) {
    errors.push("El campo QuejasEstatus es obligatorio");
  } else if (typeof queja.QuejasEstatus !== "number") {
    errors.push("El campo QuejasEstatus debe ser de tipo Number");
  } else {
    const estatus = queja.QuejasEstatus;

    if (estatus !== 1 && estatus !== 2) {
      errors.push(
        `El campo QuejasEstatus no coincide con ningún registro.`
      );
    }
  }

  return errors;
};


/////////// ENTIDAD FEDERATIVA ///////////

export const validateEntidadFederativa = (medioId, queja, EstadosIdQuery) => {

  const errors = [];

  if (medioId !== 1) {
    const EstadosIdExists = EstadosIdQuery;

    if (!queja.EstadosId) {
      errors.push("El campo EstadosId es obligatorio");
    } else if (typeof queja.EstadosId !== "number") {
      errors.push("El campo EstadosId debe ser de tipo Number");
    } else if (!EstadosIdExists) {
      errors.push(`El campo EstadosId no es valido.`);
    }

  }
  return errors

};


/////////// MUNICIPIO O ALCALDIA ///////////

export const validateQuejasMunId = (medioId, queja, municipiosQuery) => {

  const errors = [];

  if (medioId !== 1) {
    const municipioIdExists = municipiosQuery;

    if (!queja.QuejasMunId) {
      errors.push("El campo QuejasMunId es obligatorio");
    } else if (typeof queja.QuejasMunId !== "number") {
      errors.push("El campo QuejasMunId debe ser de tipo Number");
    } else if (!municipioIdExists) {
      errors.push(`El campo QuejasMunId no es valido.`);
    }

  }

  return errors

};


//////////// LOCALIDAD ////////

export const validateQuejasLocId = (medioId, queja, localidadesQuery) => {
  const errors = [];

  if (medioId !== 1) {
    const localidadesExists = localidadesQuery;

    if (queja.QuejasLocId === undefined || queja.QuejasLocId === null) {
      queja.QuejasLocId = null; // El campo QuejasLocId no está presente se guarda como null
    } else if (typeof queja.QuejasLocId !== "number") {
      errors.push("El campo QuejasLocId debe ser de tipo number");
    } else if (!localidadesExists) {
      errors.push(`El campo QuejasLocId no es valido.`);
    }

  }

  return errors;
};


/////////// COLONIA ///////////

export const validateQuejasColId = (medioId, queja, coloniasQuery) => {

  const errors = [];

  if (medioId !== 1) {
    const coloniaIdExists = coloniasQuery;

    if (!queja.QuejasColId) {
      errors.push("El campo QuejasColId es obligatorio");
    } else if (typeof queja.QuejasColId !== "number") {
      errors.push("El campo QuejasColId debe ser de tipo Number");
    } else if (!coloniaIdExists) {
      errors.push(`El campo QuejasColId no es valido.`);
    }

  }

  return errors

};


/////////// CODIGO POSTAL ///////////

export const validateQuejasCP = (medioId, queja, codigoPostalQuery) => {

  const errors = [];

  if (medioId !== 1) {
    const codigoPostalExists = codigoPostalQuery;

    if (!queja.QuejasCP) {
      errors.push("El campo QuejasCP es obligatorio");
    } else if (typeof queja.QuejasCP !== "number") {
      errors.push("El campo QuejasCP debe ser de tipo Number");
    } else if (!codigoPostalExists) {
      errors.push(`El campo QuejasCP no es valido.`);
    }

  }

  return errors

};


/////////// TIPO DE PERSONA ///////////

export const validateQuejasTipoPersona = (queja) => {
  const errors = [];

  if (!queja.QuejasTipoPersona) {
    errors.push("El campo QuejasTipoPersona es obligatorio");
  } else if (typeof queja.QuejasTipoPersona !== "number") {
    errors.push("El campo QuejasTipoPersona debe ser de tipo Number");
  } else {
    const tipoPersona = queja.QuejasTipoPersona;

    if (tipoPersona !== 1 && tipoPersona !== 2) {
      errors.push(
        `El campo QuejasTipoPersona no es valido.`
      );
    }

  }

  return errors;
};

/////////// SEXO ///////////

export const validateQuejasSexo = (queja) => {
  const errors = [];

  if (queja.QuejasTipoPersona === 1) {
    if (queja.QuejasSexo === undefined) {
      errors.push("El campo QuejasSexo es obligatorio para Persona Física");
    } else if (typeof queja.QuejasSexo !== "string") {
      errors.push("El campo QuejasSexo debe ser de tipo String");
    } else {
      const sexo = ["H", "M"];
      const quejasSexo = queja.QuejasSexo.toUpperCase();

      if (!sexo.includes(quejasSexo)) {
        errors.push(
          `El valor de QuejasSexo debe ser 'H' o 'M'.`
        );
      }
    }
  } 
  return errors;
};

/////////// EDAD ///////////

export const validateQuejasEdad = (queja) => {
  const errors = [];

  if (queja.QuejasTipoPersona === 1) {
    if (queja.QuejasEdad === undefined) {
      errors.push("El campo QuejasEdad es obligatorio para Persona Física");
    } else if (typeof queja.QuejasEdad !== "number") {
      errors.push("El campo QuejasEdad debe ser de tipo Number");
    } else if (queja.QuejasEdad.toString().length === 4) {
      errors.push(
        `La longitud máxima de QuejasEdad debe ser igual o menor de 3, actual: ${queja.QuejasEdad.toString().length
        }`
      );
    }
  } 

  return errors;
};

/////////// FECHA DE RESOLUCIÓN ///////////

export const validateQuejasFecResolucion = (queja) => {
  const errors = [];

  if (queja.QuejasEstatus === 2) {
    if (!queja.QuejasFecResolucion) {
      errors.push(
        "El campo QuejasFecResolucion es obligatorio porque su estado es 2 (Concluido)"
      );
    } else {
      const fechaFormato =
        /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

      const [day, month, year] =
        queja.QuejasFecResolucion.split("/").map(Number);

      // Verificar si el día es válido
      if (
        day < 1 ||
        day > 31 ||
        (month === 2 && day > 29) ||
        ((month === 4 || month === 6 || month === 9 || month === 11) &&
          day > 30)
      ) {
        errors.push("El campo QuejasFecResolucion no es una fecha válida");
      } else {
        const fechaConve = new Date(year, month - 1, day);

        if (
          isNaN(fechaConve.getTime()) ||
          fechaConve.getDate() !== day ||
          fechaConve.getMonth() !== month - 1 ||
          fechaConve.getFullYear() !== year
        ) {
          errors.push("El campo QuejasFecResolucion no es una fecha válida");
        } else if (!fechaFormato.test(queja.QuejasFecResolucion)) {
          errors.push(
            "El formato de QuejasFecResolucion debe ser dd/mm/aaaa"
          );
        }
      }
    }
  }

  return errors;
};


/////////// FECHA EN LA QUE SE NOTIFICÓ AL USUARIO ///////////

export const validateQuejasFecNotificacion = (queja) => {
  const errors = [];

  verifyFormatDate(queja.QuejasFecNotificacion);

  if (queja.QuejasEstatus === 2) {
    if (!queja.QuejasFecNotificacion) {
      errors.push(
        "El campo QuejasFecNotificacion es obligatorio porque su estado es 2 (Concluido)"
      );
    } else {
      const fechaFormato =
        /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

      const [day, month, year] =
        queja.QuejasFecNotificacion.split("/").map(Number);

      // Verificar si el día es válido
      if (
        day < 1 ||
        day > 31 ||
        (month === 2 && day > 29) ||
        ((month === 4 || month === 6 || month === 9 || month === 11) &&
          day > 30)
      ) {
        errors.push("El campo QuejasFecNotificacion no es una fecha válida");
      } else {
        const fechaConve = new Date(year, month - 1, day);

        if (
          isNaN(fechaConve.getTime()) ||
          fechaConve.getDate() !== day ||
          fechaConve.getMonth() !== month - 1 ||
          fechaConve.getFullYear() !== year
        ) {
          errors.push("El campo QuejasFecNotificacion no es una fecha válida");
        } else if (!fechaFormato.test(queja.QuejasFecNotificacion)) {
          errors.push(
            "El formato de QuejasFecNotificacion debe ser dd/mm/aaaa"
          );
        }
      }
    }
  }

  return errors;
};

/////////// SENTIDO DE LA RESOLUCIÓN ///////////

export const validateQuejasRespuesta = (queja) => {
  const errors = [];

  if (queja.QuejasEstatus === 2) {
    if (!queja.QuejasRespuesta) {
      errors.push(
        "El campo QuejasRespuesta es obligatorio cuando el Estado de la Queja es Concluido (2)"
      );
    } else if (typeof queja.QuejasRespuesta !== "number") {
      errors.push("El campo QuejasRespuesta debe ser de tipo Number");
    } else if (queja.QuejasRespuesta < 1 || queja.QuejasRespuesta > 3) {
      errors.push("El campo QuejasRespuesta no es valido.");
    }
  }

  return errors;
};

/////////// NÚMERO DE PENALIZACIÓN ///////////

export const validateQuejasNumPenal = (queja) => {
  const errors = [];

  if (queja.QuejasNumPenal) {
    if (
      queja.QuejasNumPenal !== null &&
      typeof queja.QuejasNumPenal !== "number"
    ) {
      errors.push("El campo QuejasNumPenal debe ser de tipo Number o nulo");
    } else if (queja.QuejasNumPenal !== null) {
      const numPenal = queja.QuejasNumPenal.toString();
      if (numPenal.length > 4) {
        errors.push(
          `La longitud máxima de QuejasNumPenal debe ser de 4`
        );
      }
    }

  }

  return errors;
};


//////////// TIPO DE PENALIZACIÓN ////////

export const validateTipoPenalizacion = (queja, tipoPenalizacionQuery) => {
  const errors = [];
  const tipoPenalizacionExists = tipoPenalizacionQuery;

  if (queja.PenalizacionId === undefined || queja.PenalizacionId === null) {
    queja.PenalizacionId = null; // El campo PenalizacionId no está presente se guarda como null
  } else if (typeof queja.PenalizacionId !== "number") {
    errors.push("El campo PenalizacionId debe ser de tipo number");
  } else if (!tipoPenalizacionExists) {
    errors.push(`El campo PenalizacionId no coincide con ningún registro.`);
  }

  return errors;
};

