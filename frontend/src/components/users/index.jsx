import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../../services/userService';

const Users = () => {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchUsers()
            .then(response => {
                setUsers(response.data.users);
            });
    }, [])

    const handleDelete = async id => {
        await deleteUser(id)
            .then(response => {
                setUsers(users.filter(user => user.id !== response.data.user.id));
            });
    }

    return <React.Fragment>
        <div className="row mt-5">
            <div className="col">
                <Link to="/user/add" className="btn btn-primary" style={{ marginBottom: 20 }}>
                    New User
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => 
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/user/edit/${user.id}`} className="btn btn-success btn-sm me-1">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
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
 
export default Users;