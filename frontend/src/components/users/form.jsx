import React from "react";
import md5 from "md5";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser, saveUser } from "../../services/userService";

const UserForm = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [formInput, setFormInput] = React.useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        if (id) {
            fetchUser(id)
                .then(response => {
                    setFormInput(response.data.user)
                });
        }
    }, [id])

    const handleChanged = event => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        await saveUser({ id: formInput.id ?? null, email: formInput.email, password: md5(formInput.password) })
            .then(() => navigate("/users"))
            .catch(exception => {
                const { errors } = exception.response.data;
                setErrors({ ...errors })
            });
    }

    return <React.Fragment>
        <div className=" mt-5">
            <h1>User Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formInput.email} onChange={handleChanged} />
                    {errors.email && <label className="text-danger">{errors.email}</label>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formInput.password} onChange={handleChanged} />
                    {errors.password && <label className="text-danger">{errors.password}</label>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </React.Fragment>;
}
 
export default UserForm;