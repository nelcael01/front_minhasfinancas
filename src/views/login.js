import React from "react";
import Card from './../components/card';
import FormGroup from './../components/form-group';
import {withRouter} from 'react-router-dom'
import axios from "axios";

class Login extends React.Component{

  state = {
    email: '',
    senha: '',
    mensagemErro: null
  }
  
  entrar = () =>{
      axios
        .post('http://localhost:8080/api/usuarios/autenticar', {
          email: this.state.email,
          senha: this.state.senha
        }).then(response =>{
          this.props.history.push('/home')
        }).catch( erro =>{
          this.setState({mensagemErro: erro.response.data})
        })
  }

  prepareCadastro = () =>{
    this.props.history.push('/cadastro-usuarios')
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <span>{this.state.mensagemErro}</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <form>
                      <fieldset>
                        <FormGroup label = "E-mail: *" htmlFor = "exampleInputEmail1">
                          <input 
                            value={this.state.email}
                            style={{marginBottom: '10px'}}
                            onChange={e => this.setState({email: e.target.value})}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Digite o Email"/>
                        </FormGroup>
                        <FormGroup label = "Senha: *" htmlFor = "exampleInputPassword1">
                          <input
                            value={this.state.senha}
                            onChange={e => this.setState({senha: e.target.value})}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"/>
                        </FormGroup>
                        <br />
                        <button style={{marginRight: '10px'}} onClick={this.entrar} className="btn btn-success">Entrar</button>
                        <button onClick={this.prepareCadastro} className="btn btn-danger">Cadastrar</button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);