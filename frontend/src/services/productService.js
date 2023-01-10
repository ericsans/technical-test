import httpInstance from "./httpInstance";

export const fetchProducts = async () => {
    return await httpInstance.get("/products/index");
}
  
export const fetchProduct = async id => {
    return await httpInstance.get(`/products/show/${id}`);
}
  
export const saveProduct = async product => {
    if (product.id) {
        return await httpInstance.patch(`/products/update/${product.id}`, product);
    }

    return await httpInstance.post('/products/store', product);
}
  
export const deleteProduct = async id => {
    return await httpInstance.delete(`/products/destroy/${id}`);
}
  