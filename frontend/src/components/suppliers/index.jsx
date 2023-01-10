import React from 'react';
import { Link } from 'react-router-dom';
import { deleteSupplier, fetchSuppliers } from '../../services/supplierService';

const Suppliers = () => {

    const [suppliers, setSuppliers] = React.useState([]);

    React.useEffect(() => {
        fetchSuppliers()
            .then(response => {
                setSuppliers(response.data.suppliers);
            });
    }, [])

    const handleDelete = async id => {
        await deleteSupplier(id)
            .then(response => {
                setSuppliers(suppliers.filter(supplier => supplier.id !== response.data.supplier.id));
            });
    }

    return <React.Fragment>
        <div className="row mt-5">
            <div className="col">
                <Link to="/supplier/add" className="btn btn-primary" style={{ marginBottom: 20 }}>
                    New Supplier
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
                        {suppliers.map(supplier => 
                            <tr key={supplier.id}>
                                <td>{supplier.code}</td>
                                <td>{supplier.name}</td>
                                <td>
                                    <Link to={`/supplier/edit/${supplier.id}`} className="btn btn-success btn-sm me-1">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(supplier.id)} className="btn btn-danger btn-sm">
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
 
export default Suppliers;