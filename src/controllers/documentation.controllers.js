import * as url from 'url';
import * as path from 'path';

const __dirname = url.fileURLToPath(new URL('../public/', import.meta.url));

export const getApiDocumentation = (request, response) => {
    try {
        // Usa path.join para construir la ruta completa al archivo documentation.html
        const filePath = path.join(__dirname, 'views/documentation.html');
        response.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

export const getGral = (request, response) => {
    try {
        // Ruta absoluta al archivo PDF
        const filePath = path.join(__dirname, 'documents/Guia_API_REUNE_v1.12.pdf'); // Modifica esta línea con la ruta correcta
        // Envía el archivo PDF como respuesta
        response.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

export const getSeguros = (request, response) => {
    try {
        // Ruta absoluta al archivo PDF
        const filePath = path.join(__dirname, 'documents/Guía_seguros_REUNE_Layout2_v2.0.pdf'); // Modifica esta línea con la ruta correcta
        // Envía el archivo PDF como respuesta
        response.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

export const getSics = (request, response) => {
    try {
        // Ruta absoluta al archivo PDF
        const filePath = path.join(__dirname, 'documents/Guia_sic_API-REUNE_Layout3v1.pdf'); // Modifica esta línea con la ruta correcta
        // Envía el archivo PDF como respuesta
        response.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

export const getApiHome = (request, response) => {
    try {
        // Similar a getApiDocumentation, usa path.join para construir la ruta completa al archivo documentation.html
        const filePath = path.join(__dirname, 'views/index.html');
        response.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

