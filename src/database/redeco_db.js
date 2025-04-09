import oracledb from "oracledb"
import dotenv from 'dotenv'

dotenv.config(); // Carga las variables de entorno

const getConnection = async () => {
    let connection;
    while (true) {
        try {
            // Intentar establecer la conexión
            connection = await oracledb.getConnection({
                // DATOS DE DESARROLLO
                user: 'REDECO',
                password: '0neOne$1',
                connectString: '10.33.200.184/SIAL'

                // DATOS DE SIOTEST
                //user: 'REDECO',
                //password: 'SIOT3St',
                //connectString: 'scan-cluster.condusef.gob.mx/siotest'

                // DATOS DE PRODUCCIÓN
                //user: 'REDECO',
                //password: 'r3D3c0_$1014#',
                //connectString: 'scan-cluster.condusef.gob.mx/SIA'
            });

            // Si la conexión es exitosa, romper el bucle
            break;
        } catch (error) {
            console.error("Error de conexión:", error.message);

            // Esperar un tiempo antes de intentar nuevamente
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    return connection;
};

export const pool = await getConnection();