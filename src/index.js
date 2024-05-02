/**
 * create root -> API  do react que permite a renderização de aplicações de forma assincrona
 * permite que o React priorize e reaja de forma mais eficiente ás atualizações de estado, dando
 * ao cliente uma experiencia mais responsiva 
 */
import {createRoot} from 'react-dom/client'
import App from "./App"
const root = createRoot(document.querySelector("#root")) // seleciona a pagina index.html

root.render(<App/>)