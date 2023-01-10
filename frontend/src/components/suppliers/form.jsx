import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSupplier, saveSupplier } from "../../services/supplierService";

const SupplierForm = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [formInput, setFormInput] = React.useState({
        code: "",
        name: "",
    });
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        if (id) {
            fetchSupplier(id)
                .then(response => {
                    setFormInput(response.data.supplier)
                });
        }
    }, [id])

    const handleChanged = event => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        await saveSupplier(formInput)
            .then(() => navigate("/suppliers"))
            .catch(exception => {
                const { errors } = exception.response.data;
                setErrors({ ...errors })
            });
    }

    return <React.Fragment>
        <div className=" mt-5">
            <h1>Supplier Form</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </React.Fragment>;
}
 
export default SupplierForm;