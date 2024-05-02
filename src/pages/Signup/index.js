import React,{useState} from "react";
import * as C from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const consultarCep = () => {
        // Lógica para consultar o CEP
        // Você pode utilizar uma API de consulta de CEP aqui
        // Atualize os estados endereco, bairro, cidade e estado com os dados retornados pela API
    };
    const navigate = useNavigate();
    const {signup} = useAuth();

    const handleSignup= () =>{
        if (!email | !emailconf | !senha | !cep | !endereco | !bairro | !cidade | !estado ){
           setError("Preencha todos os campos");
           return;
        }else if(email !== emailconf){
            setError("Os email estão diferentes!")
            return;
        }

        const res = signup(email,senha,cep,endereco,bairro,cidade,estado)

        if (res){
            setError(res);
            return;
        }
        alert("Usuário cadastrado com sucesso!")
        navigate("/");
    };
    const [email,setEmail] = useState("");
    const [emailconf,setEmailconf] = useState("");
    const [senha,setSenha] = useState("");
    // Infomações de enreço ----- Colocar a API de cep
    const [cep,setCep] = useState("");
    const [endereco,setEndereco] = useState("");
    const [bairro,setBairro] = useState("");
    const [cidade,setCidade] = useState("");
    const [estado,setEstado] = useState("");
    const [error,setError] = useState("");

    return (
        <C.Container>
            <C.Label>Cadastre-se</C.Label>
            <C.Content>
                <C.LabelSignin>Email</C.LabelSignin>
                <Input
                    type="email"
                    placeholder={"Digite o email de cadastro"}
                    value={email}
                    onChange={(e) => [setEmail(e.target.value),setError("")]}
                />
                <Input
                    type="email"
                    placeholder={"Confirme seu email"}
                    value={emailconf}
                    onChange={(e) => [setEmailconf(e.target.value),setError("")]}
                />
                <C.LabelSignin>Senha</C.LabelSignin>
                <Input
                    type="password"
                    placeholder={"Digite sua senha"}
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value),setError("")]}
                />
                <C.LabelSignin>Consulte seu CEP</C.LabelSignin>
                <Input
                    type="cep"
                    placeholder={"_____ - ___"}
                    value={cep}
                    onChange={(e) => [setCep(e.target.value),setError("")]}
                />
                <Button Text="Consultar" onClick={consultarCep} />
                <Input
                    type="endereco"
                    placeholder={"Endereço"}
                    value={endereco}
                    onChange={(e) => [setEndereco(e.target.value),setError("")]}
                />
                <Input
                    type="bairro"
                    placeholder={"Bairro"}
                    value={bairro}
                    onChange={(e) => [setBairro(e.target.value),setError("")]}
                />
                <Input
                    type="cidade"
                    placeholder={"Cidade"}
                    value={cidade}
                    onChange={(e) => [setCidade(e.target.value),setError("")]}
                />
                <Input
                    type="estado"
                    placeholder={"Estado"}
                    value={estado}
                    onChange={(e) => [setEstado(e.target.value),setError("")]}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Cadastrar" onClick={handleSignup}/>
                <C.LabelSignin>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    )
}

export default Signup;