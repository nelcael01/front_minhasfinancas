import React from "react";
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from './../../app/service/localStorageService';
import { mensagemErro } from "../../components/toastr";

class ConsultaLancamento extends React.Component{
  
  constructor(){
    super()
    this.service = new LancamentoService()
  }
  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: []
  }

  obterListaMeses(){
      return [
        {label: 'SELECIONE...', value: ''},
        {label: 'Janeiro', value: 1},
        {label: 'Fevereiro', value: 2},
        {label: 'Março', value: 3},
        {label: 'Abril', value: 4},
        {label: 'Maio', value: 5},
        {label: 'Junho', value: 6},
        {label: 'Julho', value: 7},
        {label: 'Agosto', value: 8},
        {label: 'Setembro', value: 9},
        {label: 'Outubro', value: 10},
        {label: 'Novembro', value: 11},
        {label: 'Dezembro', value: 12},
      ]
  }

  obterListaTipos(){
    return [
      {label: 'SELECIONE...', value: ''},
      {label: 'Despesa', value: 'DESPESA'},
      {label: 'Receita', value: 'RECEITA'},
    ]
  }

  buscar = () =>{
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    if (!this.state.ano) {
      mensagemErro("Ano é um campo obrigatório")
      return false
    }
    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }
    this.service.consultar(lancamentoFiltro)
      .then(response => {
        this.setState({lancamentos: response.data
      })}).catch(erro => {
        mensagemErro(erro.data)
      })
  }

  render(){
    const meses = this.obterListaMeses()
    const tipo = this.obterListaTipos()
    return(
      <Card title="Consultar lançamentos">
          <div className="row">
            <div className="col-lg-6">
              <div className="bs-comp onent">
                <FormGroup label="Ano *" htmlFor="inputAno">
                  <input 
                    type="text"
                    value={this.state.ano}
                    onChange={e => this.setState({ano: e.target.value})}
                    className="form-control"
                    id="inputAno"
                    placeholder="Digite o Ano"
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Mês" htmlFor="inputMes">
                  <SelectMenu
                    value={this.state.mes}
                    onChange={e => this.setState({mes: e.target.value})}
                    id = "inputMes" lista={meses}
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Descrição" htmlFor="inputDescricao">
                  <input 
                      type="text"
                      value={this.state.descricao}
                      onChange={e => this.setState({descricao: e.target.value})}
                      className="form-control"
                      id="inputDescricao"
                      placeholder="Digite a descrição"
                      style={{marginBottom: '10px'}}
                    />
                </FormGroup>
                <FormGroup label="Tipo do lançamento" htmlFor="inputTipo">
                  <SelectMenu
                    value={this.state.tipo}
                    onChange={e => this.setState({tipo: e.target.value})}
                    id = "inputTipo" lista={tipo}
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <div style={{marginTop: '30px'}}>
                  <button type="button" onClick={this.buscar} className="btn btn-success" style={{marginRight: '10px'}}>Buscar</button>
                  <button type="button" className="btn btn-danger">Cadastrar</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <LancamentosTable lancamentos={this.state.lancamentos} />
              </div>
            </div>
          </div>

      </Card>
    )
  }
}

export default withRouter(ConsultaLancamento)