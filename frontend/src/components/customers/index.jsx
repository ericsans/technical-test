import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCustomer, fetchCustomers } from '../../services/customerService';

const Customers = () => {

    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {
        fetchCustomers()
            .then(response => {
                setCustomers(response.data.customers);
            });
    }, [])

    const handleDelete = async id => {
        await deleteCustomer(id)
            .then(response => {
                setCustomers(customers.filter(customer => customer.id !== response.data.customer.id));
            });
    }

    return <React.Fragment>
        <div className="row mt-5">
            <div className="col">
                <Link to="/customer/add" className="btn btn-primary" style={{ marginBottom: 20 }}>
                    New Customer
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => 
                            <tr key={customer.id}>
                                <td>{customer.code}</td>
                                <td>{customer.name}</td>
                                <td>
                                    <Link to={`/customer/edit/${customer.id}`} className="btn btn-success btn-sm me-1">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm">
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
 
export default Customers;