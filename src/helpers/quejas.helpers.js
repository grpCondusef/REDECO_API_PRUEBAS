export const splitProduct = (QuejasProducto) => {

    const splitProductsIds = QuejasProducto.match(/.{1,4}/g);

    const item = {}
    item['prod1Id'] = parseInt(splitProductsIds[0], 10);
    item['prod2Id'] = parseInt(splitProductsIds[1], 10);
    item['prod3Id'] = parseInt(splitProductsIds[2], 10);

    return item
}

export const splitCausa = (QuejasCausa) => {

    const splitCausasIds = QuejasCausa.match(/.{1,4}/g);
    
    const item = {}
    item['causaid'] = parseInt(splitCausasIds[0], 10);
    
    return item; 
}