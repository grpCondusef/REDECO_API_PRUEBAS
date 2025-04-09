import request from "supertest";
import app from "../src/app";

////////////// TEST ESTADOS //////////////
describe('GET /sepomex/estados/', () => {
    test('Debe mostrar todos los estados del pais.', async () => {

        const response = await request(app)
            .get('/sepomex/estados/')
            .expect(200)

        expect(response.body.estados).toBeDefined()

    });
})

////////////// TEST CODIGO POSTAL //////////////
describe('GET /sepomex/codigos-postales/', () => {
    test('Debe mostrar los codigos postales de un estado.', async () => {
  
      const response = await request(app)
        .get('/sepomex/codigos-postales/?estado_id=9')
        .expect(200)
  
      expect(response.body.codigos_postales).toBeDefined()  
    });

    test('Debe indicar que falta el campo estado_id.', async () => {
        const response = await request(app)
            .get('/sepomex/codigos-postales/')
            .expect(400);

        expect(response.body.error).toBeDefined();
    });
})  


////////////// TEST MUNICIPIOS //////////////
describe('GET /sepomex/municipios/', () => {
    test('Debe mostrar todos los municipios del estado solicitado.', async () => {
        const response = await request(app)
            .get('/sepomex/municipios/?estado_id=9&cp=05400')
            .expect(200);

        expect(response.body.municipios).toBeDefined();
    });

    test('Debe indicar que falta el campo estado_id.', async () => {
        const response = await request(app)
            .get('/sepomex/municipios/')
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    test('Debe indicar que falta el campo CP.', async () => {
        const response = await request(app)
            .get('/sepomex/municipios/')
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    test('Debe indicar que faltan los campos CP y estado_id.', async () => {
        const response = await request(app)
            .get('/sepomex/municipios/')
            .expect(400);

        expect(response.body.error).toBeDefined();
    });
});


////////////// TEST COLONIAS //////////////
describe('GET /sepomex/colonias/', () => {
    test('Debe mostrar las colonias de un CP especifico.', async () => {
  
      const response = await request(app)
        .get('/sepomex/colonias/?cp=05410')
        .expect(200)
  
      expect(response.body.colonias).toBeDefined()  
    });

    test('Debe indicar que falta el cp.', async () => {
        const response = await request(app)
            .get('/sepomex/colonias/')
            .expect(400);

        expect(response.body.error).toBeDefined();
    });
})  