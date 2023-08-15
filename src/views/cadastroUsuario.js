import React from "react";
import Card from './../components/card';
import FormGroup from './../components/form-group';
import {withRouter} from 'react-router-dom'
import UsuarioService from './../app/service/usuarioService';
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component{

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: ''
  }

  constructor(){
    super()
    this.service = new UsuarioService()
  }

  cadastrar = () =>{
    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
      senhaRepetida: this.state.senhaRepetida
    }

    try{
      this.service.validar(usuario);
    }catch(erro){
        const msgs = erro.mensagens;
        msgs.forEach(msg => mensagemErro(msg));
        return false;
    }

    this.service.salvar(usuario)
      .then(response =>{
        mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema')
        this.props.history.push('/login')
      }).catch(error =>{
        mensagemErro(error.response.data)
      })
  }

  cancelar = () => {
    this.props.history.push('/login')
  }

  render(){
    return(
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input
                    onChange={e => this.setState({nome: e.target.value}) }
                    type="text"
                    id="inputNome"
                    name="nome"
                    className="form-control"value={this.state.nome}
                    placeholder="Digite o Nome"
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    onChange={e => this.setState({email: e.target.value}) }
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    placeholder="Digite seu E-mail"
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Senha: *" htmlFor="inputSenha">
                  <input
                    onChange={e => this.setState({senha: e.target.value}) }
                    type="password"
                    id="inputSenha"
                    name="senha"
                    className="form-control"
                    placeholder="Digite sua Senha"
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                  <input
                    onChange={e => this.setState({senhaRepetida: e.target.value}) }
                    type="password"
                    id="inputRepitaSenha"
                    name="senha"
                    className="form-control"
                    placeholder="Digite sua Senha"
                  />
                </FormGroup>
              <br />
              <button style={{marginRight:'10px'}} type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
              <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroUsuario);