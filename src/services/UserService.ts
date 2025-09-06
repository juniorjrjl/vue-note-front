import api from "./api";

const UserService = {

    register: (userData: { name: string; email: string; password: string; }) => {
        return api.post("/users/register", userData);
    },

    login: (userData: { email: string; password: string; }) => {
        return api.post("/users/login", userData);
    }

}

export default UserService;