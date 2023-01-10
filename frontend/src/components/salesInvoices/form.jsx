import React from "react";
import Cleave from 'cleave.js/react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCustomers } from "../../services/customerService";
import { fetchProducts } from "../../services/productService";
import { fetchSalesInvoice, saveSalesInvoice } from "../../services/salesInvoiceService";

const SalesInvoiceForm = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [customers, setCustomers] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [formInput, setFormInput] = React.useState({
        customer_id: "",
        invoice_date: moment().format('YYYY-MM-DD'),
        sales_invoice_details: []
    });
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        fetchCustomers()
            .then(response => {
                setCustomers(response.data.customers)
            });

        fetchProducts()
            .then(response => {
                setProducts(response.data.products)
            });
    }, []);

    React.useEffect(() => {
        if (id) {
            fetchSalesInvoice(id)
                .then(response => {
                    setFormInput(response.data.salesInvoice);
                });
        }
    }, [id])

    const handleChanged = event => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name]: value});
    }

    const handleDateChanged = date => {
        setFormInput({...formInput, invoice_date: moment(date).format("YYYY-MM-DD")});
    }

    const handleAddSalesInvoiceDetails = () => {
        setFormInput({ 
            ...formInput, 
            ...formInput.sales_invoice_details.push({ product_id: "", quantity: 0, price: 0, total: 0 }) 
        });
    }

    const handleDeleteSalesInvoiceDetails = index => {
        const sales_invoice_details =  [...formInput.sales_invoice_details];
        sales_invoice_details.splice(index, 1);

        setFormInput({ ...formInput, sales_invoice_details });
    }

    const handleSalesInvoiceDetailsProductChanged = event => {
        const { index } = event.target.dataset;
        const sales_invoice_details =  [...formInput.sales_invoice_details];
        const salesInvoiceDetail = { ...sales_invoice_details[index] };
        const selectedProduct = products.find(product => product.id === Number(event.target.value));
        
        salesInvoiceDetail.product_id = event.target.value
        salesInvoiceDetail.quantity = 1;
        salesInvoiceDetail.price = selectedProduct.price;
        salesInvoiceDetail.total = selectedProduct.price;

        sales_invoice_details[index] = salesInvoiceDetail;
        setFormInput({ ...formInput, sales_invoice_details });
    }

    const handleSaleInvoiceDetailsQuantityChanged = event => {
        const { index } = event.target.dataset;
        const sales_invoice_details =  [...formInput.sales_invoice_details];
        const salesInvoiceDetail = { ...sales_invoice_details[index] };
        const selectedProduct = products.find(product => product.id === Number(salesInvoiceDetail.product_id));

        salesInvoiceDetail.quantity = event.target.rawValue;
        salesInvoiceDetail.total = event.target.rawValue * selectedProduct.price;
        
        sales_invoice_details[index] = salesInvoiceDetail;
        setFormInput({ ...formInput, sales_invoice_details });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        
        await saveSalesInvoice(formInput)
            .then(() => navigate("/sales-invoices"))
            .catch(exception => {
                const { errors } = exception.response.data;
                setErrors({ ...errors })
            });
    }

    return <React.Fragment>
        <div className=" mt-5">
            <h1>Sales Invoice Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customer_id" className="form-label">Customer</label>
                    <select className="form-control" id="customer_id" name="customer_id" value={formInput.customer_id} onChange={handleChanged}>
                        <option value="">-Pilih Customer-</option>
                        {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option> )}
                    </select>
                    {errors.customer_id && <label className="text-danger">{errors.customer_id}</label>}
                </div>
                <div className="mb-3">
                    <label htmlFor="invoice_date" className="form-label">Invoice Date</label>
                    <DatePicker className="form-control" id="invoice_date" name="invoice_date" value={formInput.invoice_date} onChange={handleDateChanged} />
                    {errors.invoice_date && <label className="text-danger">{errors.invoice_date}</label>}
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-success" onClick={handleAddSalesInvoiceDetails}>Add Product</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sub Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formInput.sales_invoice_details.map((salesInvoiceDetail, index) => 
                                <tr key={index}>
                                    <td>
                                        <select className="form-control" id="product_id" name="product_id" data-index={index} value={salesInvoiceDetail.product_id} onChange={handleSalesInvoiceDetailsProductChanged}>
                                            <option value="">-Pilih Product-</option>
                                            {products.map(product => <option key={product.id} value={product.id}>{product.name}</option> )}
                                        </select>
                                        {errors.sales_invoice_details && errors.sales_invoice_details[index].product_id && <label className="text-danger">{errors.sales_invoice_details && errors.sales_invoice_details[index].product_id}</label>}
                                    </td>
                                    <td>
                                        <Cleave 
                                            type="text" 
                                            className="form-control" 
                                            id="quantity" 
                                            name="quantity" 
                                            data-index={index}
                                            value={salesInvoiceDetail.quantity} 
                                            onChange={handleSaleInvoiceDetailsQuantityChanged}
                                            options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }} 
                                        />
                                        {errors.sales_invoice_details && errors.sales_invoice_details[index].quantity && <label className="text-danger">{errors.sales_invoice_details && errors.sales_invoice_details[index].quantity}</label>}
                                    </td>
                                    <td>
                                        <Cleave 
                                            type="text" 
                                            className="form-control bg-light" 
                                            id="price" 
                                            name="price" 
                                            value={salesInvoiceDetail.price} 
                                            options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }} 
                                            readOnly
                                        />
                                        {errors.sales_invoice_details && errors.sales_invoice_details[index].price && <label className="text-danger">{errors.sales_invoice_details && errors.sales_invoice_details[index].price}</label>}
                                    </td>
                                    <td>
                                        <Cleave 
                                            type="text" 
                                            className="form-control bg-light" 
                                            id="total" 
                                            name="total" 
                                            value={salesInvoiceDetail.total} 
                                            options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }} 
                                            readOnly
                                        />
                                        {errors.sales_invoice_details && errors.sales_invoice_details[index].total && <label className="text-danger">{errors.sales_invoice_details && errors.sales_invoice_details[index].total}</label>}
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleDeleteSalesInvoiceDetails(index)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </React.Fragment>;
}
 
export default SalesInvoiceForm;