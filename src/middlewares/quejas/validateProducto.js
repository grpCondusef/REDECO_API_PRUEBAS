import dotenv from "dotenv"; // Importa la biblioteca dotenv
import { getProductoExist } from "../../database/quejas.Queries.js";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const validateProductoIsOnRequest = (errors, QuejasProducto, QuejasFolio) => {
  if (!QuejasProducto && errors.length === 0) {
    errors.push(`El campo Producto y/o servicio es obligatorio. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateProductoIsAString = (errors, QuejasProducto, QuejasFolio) => {
  if (typeof QuejasProducto !== "string" && errors.length === 0) {
    errors.push(`El campo Producto y/o servicio debe ser de tipo texto. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateProductoIsAStringNoEmpty = (errors, QuejasProducto, QuejasFolio) => {
  if (QuejasProducto.trim() === '' && errors.length === 0) {
    errors.push(`El campo Producto y/o servicio es obligatorio. En el folio ${QuejasFolio}.`);
    return true; // Indica que se ha detectado un error
  }
  return false;
};

const validateProductoExist = async (errors, institucionClave, QuejasProducto, QuejasFolio) => {
  try {
    const ProductoMatchExists = await getProductoExist(institucionClave, QuejasProducto);
  
    if (!ProductoMatchExists && errors.length === 0) {
      errors.push(`El campo Producto y/o servicio no es válido para la institución o no existe en el catálogo. En el folio ${QuejasFolio}.`);
      return true; // Indica que se ha detectado un error
    }
    return false;
  } catch (error) {
    console.log(error);
    return true; // Indica que se ha detectado un error
  }
};

export const validateProducto = async (quejas, request) => { // Agrega request como parámetro
  const errors = [];
  const { institucionClave } = request; // Obtén institucionClave de request

  // Verifica si quejas es un array
  if (!Array.isArray(quejas)) {
    throw new TypeError('quejas debe ser un array');
  }

  const validateQuejas = async () => {
    for (const queja of quejas) {
      const { QuejasProducto, QuejasFolio } = queja;

      // Realiza las validaciones y acumula los errores
      if (validateProductoIsOnRequest(errors, QuejasProducto, QuejasFolio)) continue;
      if (validateProductoIsAString(errors, QuejasProducto, QuejasFolio)) continue;
      if (validateProductoIsAStringNoEmpty(errors, QuejasProducto, QuejasFolio)) continue;
      if (await validateProductoExist(errors, institucionClave, QuejasProducto, QuejasFolio)) continue;
    }
  };

  await validateQuejas();
  return errors; // Devuelve el arreglo de errores
};
