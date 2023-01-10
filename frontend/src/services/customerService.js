import httpInstance from "./httpInstance";

export const fetchCustomers = async () => {
    return await httpInstance.get("/customers/index");
}
  
export const fetchCustomer = async id => {
    return await httpInstance.get(`/customers/show/${id}`);
}
  
export const saveCustomer = async customer => {
    if (customer.id) {
        return await httpInstance.patch(`/customers/update/${customer.id}`, customer);
    }

    return await httpInstance.post('/customers/store', customer);
}
  
export const deleteCustomer = async id => {
    return await httpInstance.delete(`/customers/destroy/${id}`);
}
  