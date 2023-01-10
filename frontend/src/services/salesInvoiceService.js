import httpInstance from "./httpInstance";

export const fetchSalesInvoices = async request => {
    const params = request ? { params: request.params } : {}
    return await httpInstance.get("/sales-invoices/index", { ...params });
}
  
export const fetchSalesInvoice = async id => {
    return await httpInstance.get(`/sales-invoices/show/${id}`);
}
  
export const saveSalesInvoice = async salesInvoice => {
    if (salesInvoice.id) {
        return await httpInstance.patch(`/sales-invoices/update/${salesInvoice.id}`, salesInvoice);
    }

    return await httpInstance.post('/sales-invoices/store', salesInvoice);
}
  
export const deleteSalesInvoice = async id => {
    return await httpInstance.delete(`/sales-invoices/destroy/${id}`);
}
