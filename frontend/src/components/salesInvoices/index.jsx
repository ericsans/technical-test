import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { deleteSalesInvoice, fetchSalesInvoices } from '../../services/salesInvoiceService';

const SalesInvoices = () => {

    const [salesInvoices, setSalesInvoices] = React.useState([]);
    const [formInput, setFormInput] = React.useState({
        from_date: moment().startOf('month').format('YYYY-MM-DD'),
        to_date: moment().endOf('month').format('YYYY-MM-DD')
    });

    React.useEffect(() => {
        fetchSalesInvoices()
            .then(response => {
                setSalesInvoices(response.data.salesInvoices);
            });
    }, [])

    const handleFromDateChanged = date => {
        setFormInput({...formInput, from_date: moment(date).format("YYYY-MM-DD")});
    }

    const handleToDateChanged = date => {
        setFormInput({...formInput, to_date: moment(date).format("YYYY-MM-DD")});
    }

    const handleFilterSalesInvoice = async () => {
        const params = { 
            from_date: moment(formInput.from_date).format("YYYYMMDD"),
            to_date: moment(formInput.to_date).format("YYYYMMDD"),
        };
        await fetchSalesInvoices({ params })
            .then(response => {
                setSalesInvoices(response.data.salesInvoices);
            });
    }

    const handleDelete = async id => {
        await deleteSalesInvoice(id)
            .then(response => {
                setSalesInvoices(salesInvoices.filter(salesInvoice => salesInvoice.id !== response.data.salesInvoice.id));
            });
    }

    return <React.Fragment>
        <div className="row mt-5">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <Link to="/sales-invoice/add" className="btn btn-primary" style={{ marginBottom: 20 }}>
                            New Sales Invoice
                        </Link>
                    </div>
                    <div className="col m-auto">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <DatePicker className="form-control" id="from_date" name="from_date" value={formInput.from_date} onChange={handleFromDateChanged} />
                                </div>
                                <div className="col-md-3">
                                    <DatePicker className="form-control" id="to_date" name="to_date" value={formInput.to_date} onChange={handleToDateChanged} />
                                </div>
                                <div className="col-md-3">
                                    <button type="button" onClick={handleFilterSalesInvoice} className="btn btn-primary">
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Sub Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesInvoices.map(salesInvoice => 
                            <tr key={salesInvoice.id}>
                                <td>{salesInvoice.code}</td>
                                <td>{salesInvoice.invoice_date}</td>
                                <td>{salesInvoice.customer.name}</td>
                                <td>{Number(salesInvoice.sub_total).toLocaleString()}</td>
                                <td>
                                    <Link to={`/sales-invoice/edit/${salesInvoice.id}`} className="btn btn-success btn-sm me-1">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(salesInvoice.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>;
}
 
export default SalesInvoices;