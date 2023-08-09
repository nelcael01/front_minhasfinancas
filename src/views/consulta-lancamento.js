import React from "react";
import { withRouter } from 'react-router-dom';
import Card from './../components/card';
import FormGroup from './../components/form-group';
import SelectMenu from './../components/selectMenu';

class ConsultaLancamento extends React.Component{
  render(){
    const lista = [
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
    return(
      <Card title="Consultar lançamentos">
          <div className="row">
            <div className="col-lg-6">
              <div className="bs-comp onent">
                <FormGroup label="Ano *" htmlFor="inputAno">
                  <input type="text"
                    class="form-control"
                    id="inputAno"
                    placeholder="Digite o Ano"
                  />
                </FormGroup>
                <FormGroup label="Mês *" htmlFor="inputMes">
                  <SelectMenu lista={lista}/>
                </FormGroup>
              </div>
            </div>
          </div>
      </Card>
    )
  }
}

export default withRouter(ConsultaLancamento)