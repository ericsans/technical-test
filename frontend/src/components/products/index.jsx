import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../services/productService';

const Products = () => {

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetchProducts()
            .then(response => {
                setProducts(response.data.products);
            });
    }, [])

    const handleDelete = async id => {
        await deleteProduct(id)
            .then(response => {
                setProducts(products.filter(product => product.id !== response.data.product.id));
            });
    }

    return <React.Fragment>
        <div className="row mt-5">
            <div className="col">
                <Link to="/product/add" className="btn btn-primary" style={{ marginBottom: 20 }}>
                    New Product
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Price</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Updated By</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => 
                            <tr key={product.id}>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.supplier ? product.supplier.name : ""}</td>
                                <td>{Number(product.price).toLocaleString()}</td>
                                <td>{product.created_by}</td>
                                <td>{product.updated_by}</td>
                                <td>
                                    <Link to={`/product/edit/${product.id}`} className="btn btn-success btn-sm me-1">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">
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
 
export default Products;