import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Importa la biblioteca dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export const validarJWT = async (request, response, next) => {
    const token = request.header('Authorization');

    if (!token) {
        return response.status(401).json({
            msg: 'Es necesario incluir un token en la petición'
        });
    };

    try {

        const { uid, username, institucionid, institucionClave, denominacion_social, sectorid, sector, system, exp } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        request.uid = uid;
        request.username = username;
        request.institucionid = institucionid;
        request.institucionClave = institucionClave;
        request.denominacion_social = denominacion_social;
        request.sectorid = sectorid;
        request.sector = sector;
        request.system = system;

        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime >= exp) {
            return response.status(400).json({
                error: 'El token ha expirado'
            });
        };
        if (system !== 'REDECO') {
            return response.status(403).json({
                error: 'El token no corresponde al sistema REDECO, por lo que no puedes realizar el envío de información.'
            });
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return response.status(400).json({
                error: 'El token ha expirado'
            });
        };

        console.error(error);
        return response.status(401).json({
            error: 'Token no válido'
        });
    }
};
