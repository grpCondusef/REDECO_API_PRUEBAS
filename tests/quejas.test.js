import request from "supertest";
import app from "../src/app";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlNTZkOWFkNi0yOTFlLTQzNjgtYTVjMi0zMDgwMzA4MWZkOTMiLCJpbnN0aXR1Y2lvbmlkIjoiNTBENkQ3NjktNkI1Qy00QjBDLThBMTItQTg1NDJFNTAiLCJpbnN0aXR1Y2lvbkNsYXZlIjozMTAsImRlbm9taW5hY2lvbl9zb2NpYWwiOiJIU0JDIE3DqXhpY28sIFMuQS4sIEluc3RpdHVjacOzbiBkZSBCYW5jYSBNw7psdGlwbGUsIEdydXBvIEZpbmFuY2llcm8gSFNCQy4iLCJzZWN0b3JpZCI6MSwic2VjdG9yIjoiSU5TVElUVUNJT05FUyBERSBCQU5DQSBNVUxUSVBMRSIsImlhdCI6MTcwNDkxNjc2MCwiZXhwIjoxNzA3NTA4NzYwfQ.zIojQhSyOvq0ZErR2ipurkSriqAweLQg3ZbAIV2YevM'


describe('POST /redeco/quejas', () => {
    test('debe de agregar las quejas a la base de datos', async () => {

        const quejas = [
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test21",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test22",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        expect(response.body.addedRows).toBeDefined()
        expect(response.body.errors).toBeDefined()

    }, 30000)

    test('debe devolver el errors con los folios que ya existen', async () => {

        const quejas = [
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test21",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test22",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        // Verificar que la cantidad de errores coincida con las quejas existentes
        expect(response.body.errors.length).toBe(2); // Actualiza este número con el esperado

    }, 30000)

    test('debe devolver los errores del campo QuejasNoTrim', async () => {

        const quejas = [
            {
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test_trim",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": "1",
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test_trim",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 13,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test_trim",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        // Verificar que la cantidad de errores coincida con las quejas existentes
        expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

        expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasNoTrim es obligatorio');
        expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasNoTrim debe ser de tipo Number');
        expect(response.body.errors[2].queja.errors[0]).toBe('El mes de la queja no corresponde al mes actual');

    }, 30000)

    test('debe devolver los errores del campo QuejasNum', async () => {

        const quejas = [
            {
                "QuejasNoTrim": 1,
                "QuejasFolio": "1020-0597-CC test_quejasNum",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": "1",
                "QuejasFolio": "1020-0597-CC test_quejasNum",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 10,
                "QuejasFolio": "1020-0597-CC test_quejasNum",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        // Verificar que la cantidad de errores coincida con las quejas existentes
        expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

        expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasNum es obligatorio');
        expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasNum debe ser de tipo Number');
        expect(response.body.errors[2].queja.errors[0]).toBe('La longitud máxima de QuejasNum debe ser de 1, actual: 2');

    }, 30000)

    test('debe devolver los errores del campo QuejasFolio', async () => {

        const quejas = [
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": 1020,
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC-100000oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test22",
                "QuejasFecRecepcion": "10/01/2024",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        // Verificar que la cantidad de errores coincida con las quejas existentes
        expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

        expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasFolio es obligatorio');
        expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasFolio debe ser de tipo String');
        expect(response.body.errors[2].queja.errors[0]).toBe(`La longitud máxima de QuejasFolio no debe ser mayor a 50, actual: ${quejas[2].QuejasFolio.toString().length}`);

    }, 30000)

    test('debe devolver los errores del campo QuejasFecRecepcion', async () => {

        const quejas = [
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test_QuejasFecRecepcion",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 2,
                "QuejasSexo": "H",
                "QuejasEdad": 63,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 1,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            },
            {
                "QuejasNoTrim": 1,
                "QuejasNum": 1,
                "QuejasFolio": "1020-0597-CC test_QuejasFecRecepcion",
                "QuejasFecRecepcion": "10/01/2023-e",
                "MedioId": 1,
                "NivelATId": 1,
                "product": "025110321083",
                "CausasId": 877,
                "QuejasPORI": "NO",
                "QuejasEstatus": 2,
                "EstadosId": 28,
                "QuejasMunId": 22,
                "QuejasLocId": 9,
                "QuejasColId": 298,
                "QuejasCP": 87330,
                "QuejasTipoPersona": 1,
                "QuejasSexo": "H",
                "QuejasEdad": 67,
                "QuejasFecResolucion": "10/01/2024",
                "QuejasFecNotificacion": "10/01/2024",
                "QuejasRespuesta": 2,
                "QuejasNumPenal": 0,
                "PenalizacionId": 3
            }
        ]

        const response = await request(app)
            .post('/redeco/quejas')
            .set('Authorization', `${token}`)
            .send(quejas)
            .expect(200)

        // Verificar que la cantidad de errores coincida con las quejas existentes
        expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

        expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasFecRecepcion es obligatorio');
        expect(response.body.errors[1].queja.errors[0]).toBe('La fecha de la queja no se encuentra dentro del rango del periodo.');

    }, 30000)
})


test('debe devolver los errores del campo MedioId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test50",
            "QuejasFecRecepcion": "10/01/2024",
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test50",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": "1",
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 67,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 2,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test50",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1000,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 67,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 2,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo MedioId es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo MedioId debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe('El campo MedioId no coincide con ningún registro.');

}, 30000)


test('debe devolver los errores del campo NivelATId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test51",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test51",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": "1",
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test51",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 666,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo NivelATId es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo NivelATId debe ser de tipo number');
    expect(response.body.errors[2].queja.errors[0]).toBe('El campo NivelATId no coincide con ningún registro.');

}, 30000)


test('debe devolver los errores del campo product', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test53",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test53",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": 25110321083,
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test53",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083000",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test53",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "155110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo product es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo product debe ser de tipo string');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El número de carácteres de product debe ser igual a 12, actual: ${quejas[2].product.length}`);
    expect(response.body.errors[3].queja.errors[0]).toBe('El campo product no coincide con ninguna Causa.');

}, 30000)


test('debe devolver los errores del campo QuejasPORI', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test54",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test54",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": 1,
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test54",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NOOO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test54",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "no",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasPORI es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasPORI debe ser de tipo String');
    expect(response.body.errors[2].queja.errors[0]).toBe(`La longitud máxima de QuejasPORI debe ser de 2, actual: ${quejas[2].QuejasPORI.length}`);
    expect(response.body.errors[3].queja.errors[0]).toBe('El valor de QuejasPORI debe estar en mayúsculas.');

}, 30000)


test('debe devolver los errores del campo QuejasEstatus', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test55",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test55",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": "2",
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test55",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 1,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 5,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasEstatus es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasEstatus debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasEstatus no coincide con ningún registro.`);
    
}, 30000)


test('debe devolver los errores del campo EstadosId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test56",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test56",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": "28",
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test56",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 288,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo EstadosId es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo EstadosId debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo EstadosId no es valido.`);
    
}, 30000)


test('debe devolver los errores del campo QuejasMunId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": "22",
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 2222,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasMunId es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasMunId debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasMunId no es valido.`);    
    
}, 30000)


test('debe devolver los errores del campo QuejasLocId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": "298",
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test57",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 29889,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasColId es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasColId debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasColId no es valido.`);    
    
}, 30000)



test('debe devolver los errores del campo QuejasCP', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test90",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test90",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": "87330",
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test90",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 8733000000,
            "QuejasTipoPersona": 2,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasCP es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasCP debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasCP no es valido.`);    
    
}, 30000)


test('debe devolver los errores del campo QuejasTipoPersona', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test80",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test80",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": "2",
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test80",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 5,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasTipoPersona es obligatorio');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasTipoPersona debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasTipoPersona no es valido.`);    
    
}, 30000)



test('debe devolver los errores del campo QuejasSexo', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test100",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test100",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": 2,
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test100",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "N",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasSexo es obligatorio para Persona Física');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasSexo debe ser de tipo String');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El valor de QuejasSexo debe ser 'H' o 'M'.`);    
    
}, 30000)


test('debe devolver los errores del campo QuejasEdad', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": "63",
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 6333,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasEdad es obligatorio para Persona Física');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasEdad debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`La longitud máxima de QuejasEdad debe ser igual o menor de 3, actual: ${quejas[2].QuejasEdad.toString().length}`);    
    
}, 30000)



test('debe devolver los errores del campo QuejasFecResolucion', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "50/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/13/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/202",
            "QuejasFecNotificacion": "10/13/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasFecResolucion es obligatorio porque su estado es 2 (Concluido)');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasFecResolucion no es una fecha válida');
    expect(response.body.errors[2].queja.errors[0]).toBe('El campo QuejasFecResolucion no es una fecha válida');
    expect(response.body.errors[3].queja.errors[0]).toBe(`El formato de QuejasFecResolucion debe ser dd/mm/aaaa`);    
    
}, 30000)


test('debe devolver los errores del campo QuejasFecNotificacion', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/12/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/12/2024",
            "QuejasFecNotificacion": "50/12/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/12/2024",
            "QuejasFecNotificacion": "10/13/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test64",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/12/202",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasFecNotificacion es obligatorio porque su estado es 2 (Concluido)');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasFecNotificacion no es una fecha válida');
    expect(response.body.errors[2].queja.errors[0]).toBe('El campo QuejasFecNotificacion no es una fecha válida');
    expect(response.body.errors[3].queja.errors[0]).toBe(`El formato de QuejasFecNotificacion debe ser dd/mm/aaaa`);    
    
}, 30000)



test('debe devolver los errores del campo QuejasRespuesta', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test63",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test63",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": "1",
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test63",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 4,
            "QuejasNumPenal": 0,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasRespuesta es obligatorio cuando el Estado de la Queja es Concluido (2)');
    expect(response.body.errors[1].queja.errors[0]).toBe('El campo QuejasRespuesta debe ser de tipo Number');
    expect(response.body.errors[2].queja.errors[0]).toBe(`El campo QuejasRespuesta no es valido.`);    
    
}, 30000)



test('debe devolver los errores del campo QuejasNumPenal', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test62",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": "0",
            "PenalizacionId": 3
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test62",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 11111,
            "PenalizacionId": 3
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo QuejasNumPenal debe ser de tipo Number o nulo');
    expect(response.body.errors[1].queja.errors[0]).toBe(`La longitud máxima de QuejasNumPenal debe ser de 4`);
    
}, 30000)



test('debe devolver los errores del campo PenalizacionId', async () => {

    const quejas = [
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test61",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 1,
            "PenalizacionId": "3"
        },
        {
            "QuejasNoTrim": 1,
            "QuejasNum": 1,
            "QuejasFolio": "1020-0597-CC test61",
            "QuejasFecRecepcion": "10/01/2024",
            "MedioId": 2,
            "NivelATId": 1,
            "product": "025110321083",
            "CausasId": 877,
            "QuejasPORI": "NO",
            "QuejasEstatus": 2,
            "EstadosId": 28,
            "QuejasMunId": 22,
            "QuejasLocId": 9,
            "QuejasColId": 298,
            "QuejasCP": 87330,
            "QuejasTipoPersona": 1,
            "QuejasSexo": "H",
            "QuejasEdad": 63,
            "QuejasFecResolucion": "10/01/2024",
            "QuejasFecNotificacion": "10/01/2024",
            "QuejasRespuesta": 1,
            "QuejasNumPenal": 1,
            "PenalizacionId": 333
        }
    ]

    const response = await request(app)
        .post('/redeco/quejas')
        .set('Authorization', `${token}`)
        .send(quejas)
        .expect(200)

    // Verificar que la cantidad de errores coincida con las quejas existentes
    expect(response.body.errors.length).toBe(quejas.length); // Actualiza este número con el esperado

    expect(response.body.errors[0].queja.errors[0]).toBe('El campo PenalizacionId debe ser de tipo number');
    expect(response.body.errors[1].queja.errors[0]).toBe(`El campo PenalizacionId no coincide con ningún registro.`);
    
}, 30000)


