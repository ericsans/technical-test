import httpInstance from "./httpInstance";

export const fetchUsers = async () => {
    return await httpInstance.get("/users/index");
}
  
export const fetchUser = async id => {
    return await httpInstance.get(`/users/show/${id}`);
}
  
export const saveUser = async user => {
    if (user.id) {
        return await httpInstance.patch(`/users/update/${user.id}`, user);
    }

    return await httpInstance.post('/users/store', user);
}
  
export const deleteUser = async id => {
    return await httpInstance.delete(`/users/destroy/${id}`);
}
  