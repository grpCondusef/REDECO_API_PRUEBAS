export const transformFormatDate = (date) => {
    // Crear un objeto Date a partir de la fecha ISO
    const fecha = new Date(date);

    // Obtener los componentes de la fecha (día, mes, año)
    const dia = fecha.getDate();
    // El mes comienza desde 0, por lo que se agrega 1 para representar el mes correcto
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    // Formatear la fecha con el formato 'dd/mm/yyyy'
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

    return fechaFormateada

}