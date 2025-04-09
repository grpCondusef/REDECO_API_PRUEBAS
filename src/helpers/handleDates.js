export const getTodayDate = () => {
    // Crear un nuevo objeto Date, que contendrá la fecha y la hora actuales
    let fechaActual = new Date();
  
    // Obtener el año, mes y día de la fecha actual
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
    let dia = fechaActual.getDate();
  
    // Formatear la fecha como una cadena en el formato deseado (por ejemplo, AAAA-MM-DD)
    let fechaFormateada =
      año + "-" + (mes < 10 ? "0" : "") + mes + "-" + (dia < 10 ? "0" : "") + dia;
  
    // Mostrar la fecha actual en la consola
    return fechaFormateada;
  };
  
  
  export const convertDateFormatToCustomISO = (dateString = null) => {
    if (dateString === null) {
      return dateString;
    }
  
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
    const formattedDateTime = `${formattedDate} 00:00:00`;
  
    return formattedDateTime;
  };
  
  
  export const getDateOnly = (today) => {
    const day = today.getDate();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Convert to string and pad
    const year = today.getFullYear();
  
    const formattedDate = `${year}-${month}-${day.toString().padStart(2, '0')}`;
  
    const formattedDateTime = `${formattedDate} 00:00:00`;
  
    return formattedDateTime;
  };
  
  export const getDatetime = (today) => {
    const day = today.getDate();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Convert to string and pad
    const year = today.getFullYear();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day.toString().padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate} ${hours}:${minutes}:00`;
    
    return formattedDateTime;
  };
  
  
  // Convierte una fecha al formato ISO (aaaa-mm-dd).
  export const convertDateToFormat = (date) => {
    // Fecha en el formato inicial
    let fechaInicial = date;
  
    // Crear un objeto Date con la fecha inicial
    let fechaInicio = new Date(fechaInicial);
  
    // Obtener los componentes de la fecha (año, mes y día)
    let añoInicio = fechaInicio.getFullYear();
    let mesInicio = ("0" + (fechaInicio.getMonth() + 1)).slice(-2); // Sumar 1 al mes porque en JavaScript los meses van de 0 a 11
    let diaInicio = ("0" + fechaInicio.getDate()).slice(-2);
  
    // Crear la nueva fecha en el formato deseado
    let fechaConversionInicio = añoInicio + "-" + mesInicio + "-" + diaInicio;
  
    // Retornar las fechas convertidas
    return fechaConversionInicio;
  };
  
  
  export const verifyFormatDate = (date) => {
  
    // Expresión regular para el formato dd/mm/yyyy
    var formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  
    // Verificar si la fecha coincide con el formato esperado
    if (formatoFecha.test(date)) {
      return true; // La fecha tiene el formato correcto (dd/mm/yyyy)
    } else {
      return false; // La fecha no tiene el formato correcto (dd/mm/yyyy)
    }
  } 