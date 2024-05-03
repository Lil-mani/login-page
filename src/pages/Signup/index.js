import React,{useState} from "react";
import * as C from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
//import { addUser, deleteUser, getUsers, updateUser } from "../../bd/user.js";

const Signup = () => {

    const consultarCep = () => {
        console.log(cep);
        // Lógica para consultar o CEP
        // Você pode utilizar uma API de consulta de CEP aqui
        // Atualize os estados endereco, bairro, cidade e estado com os dados retornados pela API
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                // Preencha os campos de endereço com os dados retornados pela API
                // document.getElementById('complemento').value = data.complemento;
                // document.getElementById('endereco').value = data.logradouro;
                // document.getElementById('bairro').value = data.bairro;
                // document.getElementById('cidade').value = data.localidade;
                // document.getElementById('uf').value = data.uf;
                setEndereco(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setEstado(data.uf);
                // document.getElementById('uf').value = data.uf;
                
                // Preencha os demais campos de endereço, como bairro, cidade, etc., se necessário
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados do CEP:', error);
            alert('Erro ao obter dados do CEP. Por favor, tente novamente.');
        });
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
    var [cep,setCep] = useState("");
    var [endereco,setEndereco] = useState("");
    var [bairro,setBairro] = useState("");
    var [cidade,setCidade] = useState("");
    var [estado,setEstado] = useState("");
    var [error,setError] = useState("");

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