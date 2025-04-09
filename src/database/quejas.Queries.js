import { query } from "express";
import { pool } from "./redeco_db.js";

export const getCalendario = async () => {
  const currentDate = new Date();
    const currentYear = (currentDate.getFullYear());
  
    try {
        // Realizar la consulta a la base de datos
        const calendarioQuery = await pool.execute(
            `   SELECT ANIOID, PERIODOID, CALFECHACIERRE, CALFECHAINICIO, CALFECHAFIN, PROCESOID, CALNOTRIM, CALESTATUS
                FROM REDECO.CALENDARIO
                WHERE ANIOID= :currentDate AND PERIODOID = 1 AND PROCESOID = 1 AND CALESTATUS = 1 AND CALFECHACIERRE IS NULL AND CALNOTRIM IS NOT NULL
            `,
            [currentYear]
        ); 
        return calendarioQuery;
    } catch (error) {
        console.error(error);
    }
};

export const getCalendarioInPeriod = async () => {
  const currentDate = new Date();
    //const currentYear = currentDate.getFullYear();
    const currentYear = (currentDate.getFullYear());
    
    try {
        // Realizar la consulta a la base de datos
        const calendarioQuery = await pool.execute(
            `
            SELECT ANIOID, PERIODOID, PROCESOID, CALESTATUS, CALFECHAINICIOPROCESO, CALFECHAFINPROCESO, CALNOTRIM
            FROM REDECO.CALENDARIO
            WHERE ANIOID = :currentYear AND PERIODOID = 1 AND PROCESOID = 1 AND CALESTATUS = 1 AND CALFECHAINICIOPROCESO IS NOT NULL AND CALFECHAFINPROCESO IS NOT NULL
            `,
            [currentYear]
        ); 
        return calendarioQuery;
    } catch (error) {
        console.error(error);
    }
};

export const getFechaAñoFecRecepcion = async (QuejasFecRecepcion) => {
  try {
    // Realizar la consulta a la base de datos
    const calendarioQuery = await pool.execute(
      `
      SELECT C.FECHAANIO, F.FECHA
      FROM REDECO.FECHA C
      INNER JOIN REDECO.FECHAS F ON C.FECHAANIO = F.ANIO
      WHERE F.FECHA = TO_DATE(:QuejasFecRecepcion, 'DD-MM-YYYY')
      `,
      [QuejasFecRecepcion]
    );
    if (calendarioQuery.rows[0]) {
      return calendarioQuery;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const getFechaAñoFecAtencion = async (QuejasFecNotificacion) => {
  try {
    // Realizar la consulta a la base de datos
    const calendarioQuery = await pool.execute(
      `
      SELECT C.FECHAANIO, F.FECHA
      FROM REDECO.FECHA C
      INNER JOIN REDECO.FECHAS F ON C.FECHAANIO = F.ANIO
      WHERE F.FECHA = TO_DATE(:QuejasFecNotificacion, 'DD-MM-YYYY') 
      `,
      [QuejasFecNotificacion]
    );
    
    if (calendarioQuery.rows[0]) {
      return calendarioQuery;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const getFechaAñoFecNotificacion = async (QuejasFecNotificacion) => {
  try {
    // Realizar la consulta a la base de datos
    const calendarioQuery = await pool.execute(
      `
      SELECT C.ANIOID, F.FECHA
      FROM REDECO.CALENDARIO C
      INNER JOIN REDECO.FECHAS F ON C.ANIOID = F.ANIO
      WHERE F.FECHA = TO_DATE(:QuejasFecNotificacion, 'DD-MM-YYYY')
      `,
      [QuejasFecNotificacion]
    );
  
    if (calendarioQuery.rows[0]) {
      return calendarioQuery;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};


export const getInstitucionClave = async (QuejasDenominacion) => {
  try {
    const consultaInstitucionClaveQuery = await pool.execute(
      `SELECT INSTITUCIONCLAVE, SECTORID, INSTITUCIONNOMBRE
      FROM REDECO.INSTITUCION
      WHERE INSTITUCIONNOMBRE = :QuejasDenominacion `,
      [QuejasDenominacion.trim()]
    );
    if (consultaInstitucionClaveQuery.rows[0]) {
      return consultaInstitucionClaveQuery;
    }
  } catch (error) {
    console.error(error);
  }
};


export const getSector = async (QuejasSector) => {
  try {
    const consultaSectorQuery = await pool.execute(
      `SELECT  *
            FROM REDECO.SECTOR
            WHERE SECTORDESC =:QuejasSector `,
      [QuejasSector]
    );
    if (consultaSectorQuery.rows[0]) {
      return consultaSectorQuery;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getSectorMatchInstitucion = async (QuejasDenominacion, QuejasSector) => {
  
  try {
    const consultaSectorQuery = await pool.execute(
      `SELECT  I.INSTITUCIONCLAVE, S.SECTORID, I.INSTITUCIONNOMBRE
            FROM REDECO.INSTITUCION I
            INNER JOIN REDECO.SECTOR S
            ON I.SECTORID =  S.SECTORID
            WHERE I.INSTITUCIONNOMBRE =:QuejasDenominacion  AND S.SECTORDESC = :QuejasSector`,
      [QuejasDenominacion.trim(), QuejasSector]
    ); 
    if (consultaSectorQuery.rows[0]) {
      return consultaSectorQuery;
    }
  } catch (error) {
    console.error(error);
  }
};


export const getQuejaFolio = async (folio = "", institucionClave) => {
  try {
    const consultaFolioQuery = await pool.execute(
      `SELECT QUEJASFOLIO FROM REDECO.QUEJAS WHERE QUEJASFOLIO =:folio AND INSTITUCIONCLAVE = :institucionClave `,
      [folio, institucionClave]
    );
    if (!consultaFolioQuery.rows[0]) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const getEstadosData = async (QuejasEstados) => {
  try {
    const EstadosIdQuery = await pool.execute(
      `
        SELECT ESTADOSDESC
        FROM REDECO.ESTADOS 
        WHERE ESTADOSID = :QuejasEstados
        `,
      [QuejasEstados]
    );

    // Verificar si 'rows' está definido y tiene al menos un elemento antes de acceder a [0][0]
    if (
      EstadosIdQuery.rows &&
      EstadosIdQuery.rows.length > 0 &&
      EstadosIdQuery.rows[0][0]
    ) {
      return EstadosIdQuery.rows[0][0];
    } else {
      // Manejar el caso en el que no hay resultados
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMedioRecepcion = async (QuejasMedio) => {
  // EXTRAER LOS MEDIOS DEL ARRAY Y SEPARARLOS POR COMAS
  //const mediosAplicaList = mediosAplica.map(medio => `'${medio}'`).join(",");
  
  try {
    const medioRecepcionQuery = await pool.execute(
      `
        SELECT MEDIOID, MEDIODESC 
        FROM REDECO.MEDIO
        WHERE MEDIOID = :QuejasMedio AND MEDIOESTATUS = 1
        `,
      [QuejasMedio]
    );  

    if (!medioRecepcionQuery.rows[0]) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const getNivelAtencion = async (QuejasNivelAT) => {
  try {
    const nivelAtencionQuery = await pool.execute(
      `
        SELECT NIVELATID
        FROM REDECO.NIVELAT
        WHERE NIVELATID = :QuejasNivelAT
        `,
      [QuejasNivelAT]
    );

    if (!nivelAtencionQuery.rows[0]) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const getCPData = async (QuejasCP = 0) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCP = :QuejasCP
      `,
      [QuejasCP]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getMunicipio = async (QuejasMunId) => {
  try {
    const municipiosQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNDESC
      FROM REDECO.SEPOMEX 
      WHERE SEPOMEXMUNID = :QuejasMunId
      `,
      [QuejasMunId]
    );

    // Verificar si 'rows' está definido y tiene al menos un elemento antes de acceder a [0][0]
    if (
      municipiosQuery.rows &&
      municipiosQuery.rows.length > 0 &&
      municipiosQuery.rows[0][0]
    ) {
      return municipiosQuery.rows[0][0];
    } else {
      // Manejar el caso en el que no hay resultados
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMunicipioDesc = async (QuejasEstados, QuejasCP, QuejasMunId) => {

  const queryNoCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC
      FROM REDECO.SEPOMEX S
      INNER JOIN REDECO.ESTADOS E 
      ON S.ESTADOSID = E.ESTADOSID
      WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXMUNID = :QuejasMunId  
    `,
    [QuejasEstados, QuejasMunId]
  );

  const queryCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC
      FROM REDECO.SEPOMEX S
      INNER JOIN REDECO.ESTADOS E 
      ON S.ESTADOSID = E.ESTADOSID
      WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId  
    `,
    [QuejasEstados, QuejasCP, QuejasMunId]
  );
  
  try {
    const municipiosDescQuery = QuejasCP !== null ? queryCP : queryNoCP
    
    // Verificar si 'rows' está definido y tiene al menos un elemento antes de acceder a [0][0]
    if (
      municipiosDescQuery.rows &&
      municipiosDescQuery.rows.length > 0 &&
      municipiosDescQuery.rows[0][0]
    ) {
      const item = {}
      item['municipiodesc'] = municipiosDescQuery.rows[0][1];
      return item;
      } 
      return null;
  } catch (error) {
    console.error(error);
  }
};


export const getMunicipioMatchCodigoPostal = async (QuejasMunId, QuejasCP) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNDESC
      FROM REDECO.SEPOMEX 
      WHERE SEPOMEXMUNID = :QuejasMunId AND SEPOMEXCP = :QuejasCP
      `,
      [QuejasMunId, QuejasCP]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getMunicipioMatchEstado = async (QuejasMunId, QuejasEstados) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, ESTADOSID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXMUNID = :QuejasMunId AND ESTADOSID = :QuejasEstados
      `,
      [QuejasMunId, QuejasEstados]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getCodigoPostalMatchEstado = async (QuejasCP, QuejasEstados) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, ESTADOSID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCP = :QuejasCP AND ESTADOSID = :QuejasEstados
      `,
      [QuejasCP, QuejasEstados]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getCodigoPostalMatchColonia = async (QuejasCP, QuejasColId) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, SEPOMEXCOLID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCP = :QuejasCP AND SEPOMEXCOLID = :QuejasColId
      `,
      [QuejasCP, QuejasColId]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getCodigoPostalMatchLocalidad = async (QuejasCP, QuejasLocId) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, SEPOMEXCOLID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCP = :QuejasCP AND SEPOMEXTIPASEID = :QuejasLocId
      `,
      [QuejasCP, QuejasLocId]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getCodigoPostalMatchMunicipio = async (QuejasCP, QuejasMunId) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, SEPOMEXCOLID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCP = :QuejasCP AND SEPOMEXMUNID = :QuejasMunId
      `,
      [QuejasCP, QuejasMunId]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalidad = async (localidadId) => {
  try {
    const localidadesQuery = await pool.execute(
      `
      SELECT SEPOMEXTIPASEDESC
      FROM REDECO.SEPOMEX 
      WHERE SEPOMEXTIPASEID = :localidadId
      `,
      [localidadId]
    );
    if (localidadesQuery.rows[0]) {
      return localidadesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalidadDesc = async (QuejasEstados, QuejasCP, QuejasMunId, QuejasLocId) => {

  const queryNoMun = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXTIPASEID = :QuejasLocId  
    `,
    [QuejasEstados, QuejasCP, QuejasLocId]
  ); 

  const queryMun = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId  AND S.SEPOMEXTIPASEID = :QuejasLocId 
    `,
    [QuejasEstados, QuejasCP, QuejasMunId, QuejasLocId]
  );
  
  
  const queryNoCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXMUNID = :QuejasMunId  AND S.SEPOMEXTIPASEID = :QuejasLocId  
    `,
    [QuejasEstados, QuejasMunId, QuejasLocId]
  ); 

  const queryCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId  AND S.SEPOMEXTIPASEID = :QuejasLocId 
    `,
    [QuejasEstados, QuejasCP, QuejasMunId, QuejasLocId]
  );
  
  try {
    const localidadDescQuery = QuejasCP !== null ? queryCP : queryNoCP
    const localidadDescQueryMun = QuejasMunId !== null ? queryMun : queryNoMun
    // Verificar si 'rows' está definido y tiene al menos un elemento antes de acceder a [0][0]
    if (
      localidadDescQuery.rows &&
      localidadDescQuery.rows.length > 0 &&
      localidadDescQuery.rows[0][0]
    ) {
      const item = {}
      item['localidaddesc'] = localidadDescQuery.rows[0][2];
      return item;
      } 
      if (
        localidadDescQueryMun.rows &&
        localidadDescQueryMun.rows.length > 0 &&
        localidadDescQueryMun.rows[0][0]
      ) {
        const item = {}
        item['localidaddesc'] = localidadDescQueryMun.rows[0][2];
        return item;
        }   
      return null;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalidadMatchMunicipioCP = async (QuejasLocId, QuejasMunId, QuejasCP) => {
  
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXTIPASEID = :QuejasLocId AND SEPOMEXMUNID = :QuejasMunId AND SEPOMEXCP = :QuejasCP
      `,
      [QuejasLocId, QuejasMunId, QuejasCP]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalidadMatchMunicipio = async (QuejasLocId, QuejasMunId) => {
  
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXTIPASEID = :QuejasLocId AND SEPOMEXMUNID = :QuejasMunId
      `,
      [QuejasLocId, QuejasMunId]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalidadMatchEstado = async (QuejasLocId, QuejasEstados) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC, ESTADOSID, SEPOMEXCP
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXTIPASEID = :QuejasLocId AND ESTADOSID = :QuejasEstados
      `,
      [QuejasLocId, QuejasEstados]
    );
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getColonia = async (QuejasColId = 0) => {
  try {
    const coloniasQuery = await pool.execute(
      `
      SELECT SEPOMEXCOLDESC
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCOLID = :QuejasColId
      `,
      [QuejasColId]
    );
    if (coloniasQuery.rows[0]) {
      return coloniasQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getColoniaDesc = async (QuejasEstados, QuejasCP, QuejasMunId, QuejasLocId, QuejasColId) => {
  const queryNoLoc = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXMUNID = :QuejasMunId  AND S.SEPOMEXCOLID = :QuejasColId AND S.SEPOMEXCP = :QuejasCP
    `,
    [QuejasEstados, QuejasMunId, QuejasColId, QuejasCP]
  );

  const queryLoc = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId AND S.SEPOMEXTIPASEID = :QuejasLocId  AND S.SEPOMEXCOLID = :QuejasColId
    `,
    [QuejasEstados, QuejasMunId, QuejasLocId, QuejasColId, QuejasCP]
  );
  
  
  const queryNoMun = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXTIPASEID = :QuejasLocId  AND S.SEPOMEXCOLID = :QuejasColId AND S.SEPOMEXCP = :QuejasCP
    `,
    [QuejasEstados, QuejasLocId, QuejasColId, QuejasCP]
  );

  const queryMun = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId AND S.SEPOMEXTIPASEID = :QuejasLocId  AND S.SEPOMEXCOLID = :QuejasColId
    `,
    [QuejasEstados, QuejasMunId, QuejasLocId, QuejasColId, QuejasCP]
  );
  
  
  const queryNoCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXMUNID = :QuejasMunId AND S.SEPOMEXTIPASEID = :QuejasLocId  AND S.SEPOMEXCOLID = :QuejasColId 
    `,
    [QuejasEstados, QuejasMunId, QuejasLocId, QuejasColId]
  );

  const queryCP = await pool.execute(
    `
    SELECT E.ESTADOSDESC, S.SEPOMEXMUNDESC, S.SEPOMEXTIPASEDESC, S.SEPOMEXCOLDESC
        FROM REDECO.SEPOMEX S
        INNER JOIN REDECO.ESTADOS E 
        ON S.ESTADOSID = E.ESTADOSID
        WHERE S.ESTADOSID = :QuejasEstados AND S.SEPOMEXCP = :QuejasCP AND S.SEPOMEXMUNID = :QuejasMunId AND S.SEPOMEXTIPASEID = :QuejasLocId  AND S.SEPOMEXCOLID = :QuejasColId
    `,
    [QuejasEstados, QuejasCP, QuejasMunId, QuejasLocId, QuejasColId]
  );
  
  try {
    const coloniaDescQuery = QuejasCP !== null ? queryCP : queryNoCP
    const coloniaDescQueryMun = QuejasMunId !== null ? queryMun : queryNoMun
    const coloniaDescQueryLoc = QuejasLocId !== null ? queryLoc : queryNoLoc
    
    if (
      coloniaDescQuery.rows &&
      coloniaDescQuery.rows.length > 0 &&
      coloniaDescQuery.rows[0][0] // Accessing the correct property here
    ) {
      const item = {}
      item['coloniadesc'] = coloniaDescQuery.rows[0][3]; // Accessing the correct property here
      return item;
    }
    if (
      coloniaDescQueryMun.rows &&
      coloniaDescQueryMun.rows.length > 0 &&
      coloniaDescQueryMun.rows[0][0] // Accessing the correct property here
    ) {
      const item = {}
      item['coloniadesc'] = coloniaDescQueryMun.rows[0][3]; // Accessing the correct property here
      return item;
    }
    if (
      coloniaDescQueryLoc.rows &&
      coloniaDescQueryLoc.rows.length > 0 &&
      coloniaDescQueryLoc.rows[0][0] // Accessing the correct property here
    ) {
      const item = {}
      item['coloniadesc'] = coloniaDescQueryLoc.rows[0][3]; // Accessing the correct property here
      return item;
    }
    
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getColoniaMatchLocalidadCP = async (QuejasLocId, QuejasColId, QuejasCP) => {
  
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXTIPASEID = :QuejasLocId AND SEPOMEXCOLID = :QuejasColId AND  SEPOMEXCP = :QuejasCP
      `,
      [QuejasLocId, QuejasColId, QuejasCP]
    ); 
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getColoniaMatchLocalidad = async (QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId) => {
  
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXTIPASEID = :QuejasLocId AND SEPOMEXCOLID = :QuejasColId AND SEPOMEXCODIGOPOSTAL = :QuejasCP AND ESTADOSID = :QuejasEstados AND SEPOMEXMUNID = :QuejasMunId
      `,
      [QuejasLocId, QuejasColId, QuejasCP, QuejasEstados, QuejasMunId]
    ); 
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    } 
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getColoniaMatchMunicipio = async (QuejasColId, QuejasMunId) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCOLID = :QuejasColId AND SEPOMEXMUNID = :QuejasMunId
      `,
      [QuejasColId, QuejasMunId]
    ); 
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getColoniaMatchEstado = async (QuejasColId, QuejasEstados) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID, ESTADOSID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCOLID = :QuejasColId AND ESTADOSID = :QuejasEstados
      `,
      [QuejasColId, QuejasEstados]
    ); 
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getColoniaMatchMunicipioCP = async (QuejasColId, QuejasMunId, QuejasCP) => {
  try {
    const codigosPostalesQuery = await pool.execute(
      `
      SELECT SEPOMEXMUNID, SEPOMEXTIPASEID
      FROM REDECO.SEPOMEX
      WHERE SEPOMEXCOLID = :QuejasColId AND SEPOMEXMUNID = :QuejasMunId AND SEPOMEXCP = :QuejasCP
      `,
      [QuejasColId, QuejasMunId, QuejasCP]
    ); 
    if (codigosPostalesQuery.rows[0]) {
      return codigosPostalesQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getProducto = async (Producto) => {
  try {
    const productoQuery = await pool.execute(
      `
      SELECT C.SECTORID, C.CATCAUSASECTORIDSIO, C.CATCAUSACODPROD
      FROM REDECO.CATCAUSA C
      INNER JOIN REDECO.SECTORINT S
      ON C.SECTORID = S.SECTORINTSIPRES AND C.CATCAUSASECTORIDSIO = S.SECTORINTSIO
      WHERE CATCAUSACONSULTA = 1 AND CATCAUSAESTATUS = 1 AND CATCAUSACODPROD = :Producto
      `,
      [Producto]
    );
    if (productoQuery.rows[0]) {
      return productoQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getProductoExist = async (institucionClave, QuejasProducto) => {
 
  try {
    const consultaProductoMatchQuery = await pool.execute(
      `SELECT INSTITUCIONCLAVE, PROD1ID, PROD2ID, PROD3ID, PROD3DESC, PROD3CODIGO, PROD3FECREG, PROD3FECULTACT, PROD3USUARIO, PROD3ESTATUS, PROD3FECBAJA
      FROM REDECO.PROD3
      WHERE INSTITUCIONCLAVE = :institucionClave AND PROD3ESTATUS = '1' and PROD3CODIGO = :QuejasProducto
      `, [institucionClave, QuejasProducto]
    ); 
    if (consultaProductoMatchQuery.rows[0]) {
      return consultaProductoMatchQuery;
    } 
    
  } catch (error) {
    console.error(error);
  }
};

//export const getProductoMatchInstitucion = async (institucionClave) => {
// 
//  try {
//    const consultaProductoMatchQuery = await pool.execute(
//      `SELECT I.INSTITUCIONCLAVE, C.PROD3CODIGO, D.CAUSASCODIGO 
//      FROM INSTITUCION I, PROD1 A, PROD2 B, PROD3 C, CAUSAS D
//      WHERE I.INSTITUCIONCLAVE = A.INSTITUCIONCLAVE AND A.INSTITUCIONCLAVE = B.INSTITUCIONCLAVE AND A.PROD1ID = B.PROD1ID AND A.PROD1ESTATUS = 1 AND B.INSTITUCIONCLAVE = C.INSTITUCIONCLAVE
//      AND B.PROD1ID = C.PROD1ID AND B.PROD2ID = C.PROD2ID AND B.PROD2ESTATUS = 1 AND C.INSTITUCIONCLAVE = D.INSTITUCIONCLAVE AND C.PROD1ID = D.PROD1ID AND C.PROD2ID = D.PROD2ID
//      AND C.PROD3ID = D.PROD3ID AND C.PROD3ESTATUS = 1 AND D.CAUSASESTATUS = 1 AND A.INSTITUCIONCLAVE = :institucionClave
//      `, [institucionClave]
//    );
//    if (consultaProductoMatchQuery.rows[0]) {
//      return consultaProductoMatchQuery;
//    } 
//    
//  } catch (error) {
//    console.error(error);
//  }
//};


export const getProductoMatchSector = async (QuejasProducto, institucionClave) => {
 
  try {
    const consultaProductoMatchQuery = await pool.execute(
      `SELECT A.INSTITUCIONCLAVE, A.SECTORINTSIPRES, A.SECTORINTSIO, B.CATCAUSACODPROD, B.CATCAUSACODCAUSA
      FROM INSTITUCION A, CATCAUSA B
      WHERE A.SECTORINTSIPRES = B.SECTORID AND A.SECTORINTSIO = B.CATCAUSASECTORIDSIO AND B.CATCAUSAESTATUS = 1 AND B.CATCAUSACONSULTA = 1 AND B.CATCAUSACODPROD = :QuejasProducto AND A.INSTITUCIONCLAVE = :institucionClave
       
      `, [QuejasProducto, institucionClave]
    );
    if (consultaProductoMatchQuery.rows[0]) {
      return consultaProductoMatchQuery;
    } 
    
  } catch (error) {
    console.error(error);
  }
};

export const getCausaId = async (QuejasCausa, institucionClave) => {
  try {
    const CausaIdQuery = await pool.execute(
      `
      SELECT INSTITUCIONCLAVE, CAUSASID, CAUSASDESC, CAUSASCODIGO
      FROM REDECO.CAUSAS
      WHERE CAUSASESTATUS = '1' AND CAUSASCODIGO = :QuejasCausa AND INSTITUCIONCLAVE = :institucionClave
      `,
      [QuejasCausa, institucionClave]
    ); 
    if (CausaIdQuery.rows[0]) {
      return CausaIdQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getProductoCausaId = async (QuejasCausa, QuejasProducto) => {
  try {
    const CausaIdQuery = await pool.execute(
      `
        SELECT CATCAUSACODCAUSA, CATCAUSACONSULTA, CATCAUSAESTATUS, CATCAUSACODPROD
        FROM REDECO.CATCAUSA
        WHERE CATCAUSACODCAUSA = :QuejasCausa AND CATCAUSACONSULTA = 1 AND CATCAUSAESTATUS = 1 AND CATCAUSACODPROD = :QuejasProducto
      `,
      [QuejasCausa, QuejasProducto]
    ); 
    if (CausaIdQuery.rows[0]) {
      return CausaIdQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getRamo = async (Ramo) => {
  try {
    const ramoQuery = await pool.execute(
      `
      SELECT RAMOID, RAMODSC
      FROM REDECO.RAMO
      WHERE RAMOID = :Ramo
      `,
      [Ramo]
    );
    if (ramoQuery.rows[0]) {
      return ramoQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getClaveSIPRES = async (ClaveSIPRES) => {
  try {
    const claveSIPRESQuery = await pool.execute(
      `SELECT  INSTITUCIONCLAVE, INSTITUCIONNOMBRE
      FROM REDECO.INSTITUCION 
      WHERE INSTITUCIONCLAVE = :ClaveSIPRES`,
      [ClaveSIPRES]
    );

    if (!claveSIPRESQuery.rows[0]) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};


export const getClaveSIPRESMatchInstitucion = async (InstitucionClave, ClaveSIPRES) => {
  
  try {
    const consultaSIPRESQuery = await pool.execute(
      `SELECT  INSTITUCIONCLAVE, INSTITUCIONNOMBRE
      FROM REDECO.INSTITUCION 
      WHERE INSTITUCIONNOMBRE = :InstitucionClave AND INSTITUCIONCLAVE = :ClaveSIPRES`,
      [InstitucionClave, ClaveSIPRES]
    ); 
    if (consultaSIPRESQuery.rows[0]) {
      return consultaSIPRESQuery;
    }
  } catch (error) {
    console.error(error);
  }
};

//export const getSentidoResolucion = async (QuejasRespuesta) => {
//  try {
//    const sentidoResolucionQuery = await pool.execute(
//      `
//      SELECT SENTIDOID, SENTIDODSC
//      FROM REDECO.SENTIDO
//      WHERE SENTIDOID = :QuejasRespuesta
//      `,
//      [QuejasRespuesta]
//    );
//    if (sentidoResolucionQuery.rows[0]) {
//      return sentidoResolucionQuery.rows[0][0];
//    }
//    return null;
//  } catch (error) {
//    console.error(error);
//  }
//};

export const getPenalizacion = async (QuejasPenalizacion) => {
  try {
    const penalizacionQuery = await pool.execute(
      `
      SELECT PENALIZACIONID, PENALIZACIONDSC
      FROM REDECO.PENALIZACION
      WHERE PENALIZACIONID = :QuejasPenalizacion
      `,
      [QuejasPenalizacion]
    );
    if (penalizacionQuery.rows[0]) {
      return penalizacionQuery.rows[0][0];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};


export const getExistAcuse = async (QuejasNoMes, institucionClave) => {
  try {
    const currentYear = new Date().getFullYear(); // Obtener el año actual
    //const currentYear = (new Date().getFullYear()-1);
    
    const acuseQuery = await pool.execute(
      `
      SELECT ENCFECCIERRE
      FROM REDECO.ENCABEZADO
      WHERE ANIOID = :currentYear AND ENCTRIMESTRE = :QuejasNoMes AND INSTITUCIONCLAVE = :institucionClave 
      `,
      [currentYear, QuejasNoMes, institucionClave]
    );

    // Asegúrate de manejar el caso en que no haya resultados
    if (!acuseQuery.rows[0][0]) {
      return null;
    }


    return acuseQuery.rows[0][0];
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getExistAcuseDelete = async (institucionClave) => {
  try {
    const currentYear = new Date().getFullYear(); // Obtener el año actual
    const mesActual = new Date().getMonth();

    const acuseQuery = await pool.execute(
      `
      SELECT ENCFECCIERRE
      FROM REDECO.ENCABEZADO
      WHERE ANIOID = :currentYear AND INSTITUCIONCLAVE = :institucionClave AND ENCTRIMESTRE = :mesActual
      `,
      [currentYear,  institucionClave, mesActual]
    );

    // Asegúrate de manejar el caso en que no haya resultados
    if (!acuseQuery.rows[0][0]) {
      return null;
    }


    return acuseQuery.rows[0][0];
  } catch (error) {
    console.error(error);
    return null;
  }
};