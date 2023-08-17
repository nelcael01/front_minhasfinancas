import React from "react"

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Login from "../views/login"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from '../views/home'
import ConsultaLancamento from './../views/lancamentos/consulta-lancamento';
import CadastroLancamentos from './../views/lancamentos/cadastro-lancamentos';
import AuthService from "../app/service/authService"

function RotaAutenticada({component: Component, ...props}) {
  return (
    <Route exact {...props} render={ (componentProps) => {
      if(AuthService.isUsuarioAutenticado()){
          return (
              <Component {...componentProps} />
          )
      }else{
          return(
              <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
          )
      }
    }}
    />
  )
}

function Rotas(params) {
  return(
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
        <RotaAutenticada path="/home" component={Home}/>
        <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamento}/>
        <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
      </Switch>
    </HashRouter>
  )
}

export default Rotas;