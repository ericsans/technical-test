import React from "react";
import Cleave from 'cleave.js/react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct, saveProduct } from "../../services/productService";
import { fetchSuppliers } from "../../services/supplierService";

const ProductForm = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [suppliers, setSuppliers] = React.useState([]);
    const [formInput, setFormInput] = React.useState({
        supplier_id: "",
        code: "",
        name: "",
        price: 0,
    });
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        fetchSuppliers()
            .then(response => {
                setSuppliers(response.data.suppliers);
            });
    }, [])

    React.useEffect(() => {
        if (id) {
            fetchProduct(id)
                .then(response => {
                    setFormInput(response.data.product)
                });
        }
    }, [id])

    const handleChanged = event => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name]: value});
    }

    const handlePriceChanged = event => {
        setFormInput({...formInput, price: event.target.rawValue});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        await saveProduct(formInput)
            .then(() => navigate("/products"))
            .catch(exception => {
                const { errors } = exception.response.data;
                setErrors({ ...errors })
            });
    }

    return <React.Fragment>
        <div className=" mt-5">
            <h1>Product Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="supplier_id" className="form-label">Supplier</label>
                    <select className="form-control" id="supplier_id" name="supplier_id" value={formInput.supplier_id} onChange={handleChanged}>
                        <option value="">-Pilih Supplier-</option>
                        {suppliers.map(supplier => <option key={supplier.id} value={supplier.id}>{supplier.name}</option> )}
                    </select>
                    {errors.supplier_id && <label className="text-danger">{errors.supplier_id}</label>}
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code</label>
                    <input type="text" className="form-control" id="code" name="code" value={formInput.code} onChange={handleChanged} />
                    {errors.code && <label className="text-danger">{errors.code}</label>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formInput.name} onChange={handleChanged} />
                    {errors.name && <label className="text-danger">{errors.name}</label>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <Cleave 
                        type="text" 
                        className="form-control" 
                        id="price" 
                        name="price" 
                        value={formInput.price} 
                        onChange={handlePriceChanged}
                        options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }} 
                    />
                    {errors.price && <label className="text-danger">{errors.price}</label>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </React.Fragment>;
}
 
export default ProductForm;