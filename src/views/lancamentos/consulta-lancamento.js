import React from "react";
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';

class ConsultaLancamento extends React.Component{
  
  state = {
    ano: '',
    mes: '',
    tipo: ''
  }

  buscar = () =>{
    console.log(this.state);
  }

  render(){
    const meses = [
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

    const tipos = [
      {label: 'SELECIONE...', value: ''},
      {label: 'Despesa', value: 'DESPESA'},
      {label: 'Receita', value: 'RECEITA'},
    ]

    const lancamentos = [
      {id: 1, descricao: 'Primeiro lancamento', valor: 1200, tipo: 'DESPESA', mes: 5, status: 'PENDENTE'}
    ]

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
                <FormGroup label="Mês *" htmlFor="inputMes">
                  <SelectMenu
                    value={this.state.mes}
                    onChange={e => this.setState({mes: e.target.value})}
                    id = "inputMes" lista={meses}
                    style={{marginBottom: '10px'}}
                  />
                </FormGroup>
                <FormGroup label="Tipo do lançamento *" htmlFor="inputTipo">
                  <SelectMenu
                    value={this.state.tipo}
                    onChange={e => this.setState({tipo: e.target.value})}
                    id = "inputTipo" lista={tipos}
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
                <LancamentosTable lancamentos={lancamentos} />
              </div>
            </div>
          </div>

      </Card>
    )
  }
}

export default withRouter(ConsultaLancamento)