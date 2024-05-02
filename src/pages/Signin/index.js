import React, { useState } from "react";
import * as C from './styles';
import Input from "../../components/Input";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

import {Link,useNavigate} from 'react-router-dom'; // o link vai ser utilizado para mudar de paginas e o useNavigate tambem
// obs: &nbsp -> é para dar um espaço 
const Signin = () => {
    const {signin} = useAuth();
    const navigate = useNavigate(); // vai pegar o useNavigate do react-dom

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [error,setError] = useState("");

    const handleLogin = () => {
        if (!email | !senha) {
          setError("Preencha todos os campos");
          return;
        }
    
        const res = signin(email, senha);
    
        if (res) {
          setError(res);
          return;
        }
    
        navigate("/home");
    };

    return (
        <C.Container>
            <C.Label>Sistema de Login</C.Label>
            <C.Content>
                <Input 
                    type="email"
                    placeholder="Digite seu email"
                    value = {email}
                    // Atualiza o estado do email e limpa erro ao digitar
                    onChange={(e) => [setEmail(e.target.value),setError("")]}
                />
                <Input
                    type = "password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e)=>[setSenha(e.target.value), setError("")]}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onClick={handleLogin} />
                <C.LabelSignup>
                    Não possui um cadastro?
                    <C.Strong>
                        <Link to="/signup">&nbsp;Cadastre-se</Link> 
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    );
};

export default Signin;