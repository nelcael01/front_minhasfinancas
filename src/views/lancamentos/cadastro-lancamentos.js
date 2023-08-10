import React from "react";
import { withRouter } from 'react-router-dom';
import Card from "../../components/card";
import FormGroup from './../../components/form-group';
import SelectMenu from './../../components/selectMenu';
import LancamentoService from "../../app/service/lancamentoService";

class CadastroLancamentos extends React.Component{
  
  constructor(){
    super()
    this.service = new LancamentoService()
  }

  render(){
    const tipos = this.service.obterListaTipos()
    const meses = this.service.obterListaMeses()

    return(
      <Card title='Cadastro de Lançamento'>
        <div className="row" style={{marginBottom: '10px'}}>
          <div className="col-md-12">
          <FormGroup id='inputDescricao' label='Descrição: *'>
            <input
              type="text"
              className="form-control"
            />
          </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id='inputAno' label='Ano: *'>
              <input
                type="text"
                className="form-control"
              />  
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id='inputMes' label='Mês: *'>
              <SelectMenu 
                id='inputTipo'
                lista={meses}
                className='form-control'
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id='inputValor' label='Valor: *'>
                <input
                  type="text"
                  className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id='inputTipo' label='Tipo: *'>
              <SelectMenu 
                id='inputTipo'
                lista={tipos}
                className='form-control'
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id='inputStatus' label='Status: *'>
              <input
                type="text"
                className="form-control"
                disabled
              />  
            </FormGroup>
          </div>
        </div>
        <br />
        <button
          className="btn btn-success"
          style={{marginRight: '10px'}}
        >
          Salvar
        </button>
        <button
          className="btn btn-danger"
        >
          Cancelar
        </button>
      </Card>
    )
  }  
}

export default withRouter(CadastroLancamentos)