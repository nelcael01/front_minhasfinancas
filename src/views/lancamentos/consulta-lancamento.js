import React from "react";
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from './../../app/service/localStorageService';
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'


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
    lancamentos: [],
    showConfirmDialog: false,
    idDoLancamentoADeletar: null
  }

  editAction = (id) => {
    console.log('Editando lancamento',id);
  }

  abrirConfirmacao = (id) => {
    this.setState({showConfirmDialog: true, idDoLancamentoADeletar: id})
  }

  cancelarDelecao = () =>{
    this.setState({showConfirmDialog: false, idDoLancamentoADeletar: null})
  }

  deleteAction = () =>{
    this.service.deletar(this.state.idDoLancamentoADeletar).then(resposta =>{
      mensagemSucesso("Deletado com sucesso!")
      this.setState({showConfirmDialog: false})
      this.buscar()
    }).catch(error =>{
      mensagemErro(error.response.data)
    })
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
        this.setState({lancamentos: response.data})
      }).catch(erro => {
        mensagemErro(erro.data)
      })
  }

  prepararFormularioCadastro = () => {
    this.props.history.push('/cadastro-lancamentos')
  }



  render(){
    const meses = this.service.obterListaMeses()
    const tipo = this.service.obterListaTipos()

    const confirmDialogFooter = (
      <div>
          <Button label="Confirmar" icon="pi pi-check" onClick={this.deleteAction} />
          <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                  className="p-button-secondary" />
      </div>
    );

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
                  <button type="button" className="btn btn-danger" onClick={this.prepararFormularioCadastro}>Cadastrar</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <LancamentosTable
                  lancamentos={this.state.lancamentos}
                  editAction={this.editAction}
                  deleteAction={this.abrirConfirmacao}
                />
              </div>
            </div>
          </div>
          <div>
            <Dialog 
              header="Confirmação" 
              visible={this.state.showConfirmDialog} 
              style={{width: '50vw'}}
              footer={confirmDialogFooter} 
              modal={true} 
              onHide={() => this.setState({showConfirmDialog: false})}
            >
                Confirma a exclusão deste Lançamento?
            </Dialog>
          </div>

      </Card>
    )
  }
}

export default withRouter(ConsultaLancamento)