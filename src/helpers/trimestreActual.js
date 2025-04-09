import { getCalendario } from '../database/quejas.Queries.js';

export const getTrimestreActual =  async () => {
    try {
    const trimestreQuery =  await getCalendario();
        if (trimestreQuery) {
            const quarter =  trimestreQuery.rows[0][6] 
            return quarter
        } 
        } catch (error) { }
}



