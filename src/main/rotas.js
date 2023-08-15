import React from "react"

import { Route, Switch, HashRouter} from 'react-router-dom'
import Login from "../views/login"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from '../views/home'
import ConsultaLancamento from './../views/lancamentos/consulta-lancamento';
import CadastroLancamentos from './../views/lancamentos/cadastro-lancamentos';


function Rotas(params) {
  return(
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
        <Route path="/consulta-lancamentos" component={ConsultaLancamento}/>
        <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
      </Switch>
    </HashRouter>
  )
}

export default Rotas;