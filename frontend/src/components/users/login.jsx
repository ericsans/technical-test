import React from "react";
import { login } from "../../services/authenticationService";

const Login = () => {
    
    const [formInput, setFormInput] = React.useState({});

    const handleChanged = event => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await login(formInput.email, formInput.password)
            .then(() => window.location = "/home");
    }

    return <React.Fragment>
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formInput.email ?? ""} onChange={handleChanged} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formInput.password ?? ""} onChange={handleChanged} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </React.Fragment>;
}
 
export default Login;