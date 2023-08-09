import React from "react";
import { withRouter } from 'react-router-dom';
import Card from './../components/card';
import FormGroup from './../components/form-group';

class ConsultaLancamento extends React.Component{
  render(){
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
                  
                </FormGroup>
              </div>
            </div>
          </div>
      </Card>
    )
  }
}

export default withRouter(ConsultaLancamento)