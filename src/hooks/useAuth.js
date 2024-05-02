import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
// retorna o contexto, para ser utilizado em qualquer pagina 
const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

export default useAuth;