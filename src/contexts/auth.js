// Importa os hooks 'createContext', 'useEffect' e 'useState' da biblioteca React
import { createContext, useEffect, useState } from "react";

// Cria um contexto de autenticação usando createContext e define um valor padrão vazio
export const AuthContext = createContext({});

// Componente que atua como provedor do contexto de autenticação para a aplicação
export const AuthProvider = ({ children }) => {
    // Define o estado 'user' para armazenar as informações do usuário autenticado
    const [user, setUser] = useState();

    // Efeito colateral para carregar as informações do usuário quando a aplicação é carregada
    useEffect(() => {
        // Obtém o token do usuário do armazenamento local
        const userToken = localStorage.getItem("user_token");
        // Obtém os dados dos usuários do banco de dados do armazenamento local
        const usersStorage = localStorage.getItem("users_bd");

        // Verifica se o token do usuário e os dados do usuário estão presentes no armazenamento local
        if (userToken && usersStorage) {
            // Filtra os dados dos usuários para encontrar o usuário correspondente com o email do token do usuário
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            // Se o usuário correspondente for encontrado, define o estado do usuário com essas informações
            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    // Função para realizar o login do usuário
    const signin = (email, password) => {
        // Obtém os dados dos usuários do armazenamento local e converte para objeto
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

        // Filtra os usuários para encontrar um usuário com o email fornecido
        const hasUser = usersStorage?.filter((user) => user.email === email);

        // Verifica se o usuário com o email fornecido foi encontrado
        if (hasUser?.length) {
            // Verifica se a senha fornecida corresponde à senha armazenada para o usuário
            if (hasUser[0].email === email && hasUser[0].password === password) {
                // Gera um token aleatório e o armazena no localStorage
                const token = Math.random().toString(36).substring(2); 
                localStorage.setItem("user_token", JSON.stringify({ email, token }));
                // Define o estado do usuário com as informações do usuário logado
                setUser({ email, password });
                return; // Retorna sem erro se o login for bem-sucedido
            } else {
                return "E-mail ou senha incorretos"; // Retorna mensagem de erro se as credenciais estiverem incorretas
            }
        } else {
            return "Usuário não cadastrado"; // Retorna mensagem de erro se o usuário não estiver cadastrado
        }
    };
    // Inscrição 
    const signup = (email, password, cep, endereco, bairro, cidade, estado) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    
        // Verifica se já existe um usuário com o mesmo e-mail cadastrado
        const hasUser = usersStorage?.filter((user) => user.email === email);
    
        // Se já existe um usuário com o mesmo e-mail, retorna uma mensagem de erro
        if (hasUser?.length) {
            return "Já existe uma conta com este e-mail";
        }
    
        let newUser;
    
        // Cria um novo usuário com os dados fornecidos
        if (usersStorage) {
            newUser = [...usersStorage, { email, password, cep, endereco, bairro, cidade, estado }];
        } else {
            newUser = [{ email, password, cep, endereco, bairro, cidade, estado }];
        }
    
        // Atualiza o armazenamento local com o novo usuário
        localStorage.setItem("users_bd", JSON.stringify(newUser));
    
        // Retorna sem erro se o cadastro for bem-sucedido
        return;
    };

    // seta o user para Null e no localStorage removemos o token
    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    }; 

    // Retorna o provedor de contexto de autenticação com os componentes filhos
    return (
        <AuthContext.Provider
          value={{ user, signed: !!user, signin, signup, signout }}
        >
          {children}
        </AuthContext.Provider>
      );
};
