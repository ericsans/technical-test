import httpInstance from "./httpInstance";

export const fetchSuppliers = async () => {
    return await httpInstance.get("/suppliers/index");
}
  
export const fetchSupplier = async id => {
    return await httpInstance.get(`/suppliers/show/${id}`);
}
  
export const saveSupplier = async supplier => {
    if (supplier.id) {
        return await httpInstance.patch(`/suppliers/update/${supplier.id}`, supplier);
    }

    return await httpInstance.post('/suppliers/store', supplier);
}
  
export const deleteSupplier = async id => {
    return await httpInstance.delete(`/suppliers/destroy/${id}`);
}
  