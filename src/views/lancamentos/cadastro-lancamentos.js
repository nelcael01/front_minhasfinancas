import React from "react";
import { withRouter } from 'react-router-dom';
import Card from "../../components/card";
import FormGroup from './../../components/form-group';
import SelectMenu from './../../components/selectMenu';
import LancamentoService from "../../app/service/lancamentoService";
import { mensagemErro, mensagemSucesso } from './../../components/toastr';
import LocalStorageService from './../../app/service/localStorageService';

class CadastroLancamentos extends React.Component{

  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: '',
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false
  }
  
  constructor(){
    super()
    this.service = new LancamentoService()
  }

  componentDidMount(){
    const params = this.props.match.params
    if(params.id){
      console.log(params.id);
        this.service
            .buscarPorId(params.id)
            .then(response => {
                this.setState( {...response.data, atualizando: true} )
            })
            .catch(erros => {
                mensagemErro(erros.response.data)
            })
    }
}

  handleChange = (event) =>{
    const value = event.target.value
    const name = event.target.name
    this.setState({[name]: value})
  }

  submit = () => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const lancamento = {
      descricao: this.state.descricao,
      valor : this.state.valor,
      mes: this.state.mes,
      ano: this.state.ano,
      tipo: this.state.tipo,
      usuario: usuarioLogado.id
    }

    try {
      this.service.validar(lancamento)
    } catch (error) {
      const msgs = error.mensagens
      msgs.forEach(msg =>{
        mensagemErro(msg)
        return false
      })
    }

    this.service.salvar(lancamento)
      .then( response =>{
        mensagemSucesso("Salvo com Sucesso!")
        this.props.history.push('/lancamentos')
      })
      .catch(error =>{
        console.log(error.response);
        mensagemErro(error.response.data)
      })
  }

  atualizar = () => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const lancamento = {
      id: this.state.id,
      usuario: usuarioLogado.id,
      descricao: this.state.descricao,
      valor : this.state.valor,
      mes: this.state.mes,
      ano: this.state.ano,
      tipo: this.state.tipo,
      status: this.state.status
    }
    this.service.atualizarLancamento(lancamento)
      .then( response =>{
        mensagemSucesso("Atualizado com Sucesso!")
        this.props.history.push('/consulta-lancamentos')
      })
      .catch(error =>{
        console.log(error.response);
        mensagemErro(error.response.data)
      })
  }

  render(){
    const tipos = this.service.obterListaTipos()
    const meses = this.service.obterListaMeses()

    return(
      <Card title={this.state.atualizando ? 'Atualização de Lançamento' : "Cadastro de Lançamento"}>
        <div className="row" style={{marginBottom: '10px'}}>
          <div className="col-md-12">
          <FormGroup id='inputDescricao' label='Descrição: *'>
            <input
              type="text"
              name="descricao"
              className="form-control"
              value={this.state.descricao}
              onChange={this.handleChange}
            />
          </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id='inputAno' label='Ano: *'>
              <input
                type="text"
                name="ano"
                className="form-control"
                value={this.state.ano}
                onChange={this.handleChange}
              />  
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id='inputMes' label='Mês: *'>
              <SelectMenu 
                id='inputTipo'
                lista={meses}
                name="mes"
                className='form-control'
                value={this.state.mes}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id='inputValor' label='Valor: *'>
                <input
                  type="text"
                  name="valor"
                  className="form-control"
                  value={this.state.valor}
                  onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id='inputTipo' label='Tipo: *'>
              <SelectMenu 
                id='inputTipo'
                lista={tipos}
                name="tipo"
                className='form-control'
                value={this.state.tipo}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id='inputStatus' label='Status: *'>
              <input
                type="text"
                name="status"
                className="form-control"
                value={this.state.status}
                disabled
              />  
            </FormGroup>
          </div>
        </div>
        <br />
        { this.state.atualizando ?
          (
            <button
              className="btn btn-success"
              style={{marginRight: '10px'}}
              onClick={this.atualizar}
            >
              Atualizar
            </button>
          ) : 
          (
            <button
              className="btn btn-success"
              style={{marginRight: '10px'}}
              onClick={this.submit}
            >
              Salvar
            </button>
          )
        }
        <button
          className="btn btn-danger"
          onClick={ e => {this.props.history.push('/consulta-lancamentos')}}
        >
          Cancelar
        </button>
      </Card>
    )
  }  
}

export default withRouter(CadastroLancamentos)