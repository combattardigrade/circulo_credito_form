import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { } from '../actions/formController'

// Libraries
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css'

class ConfirmNipForm extends Component {
    state = {
        confirmNIP: '',
        acceptTerms: false,
        confirmNIPIsInvalid: false,
        acceptTermsIsInvalid: false,
        confirmNIPErrorMsg: 'Este campos es obligatorio.',
        loading: true,
    }

    componentDidMount() {
        document.title = "Autorización Círculo de Crédito | Swaydo"
        this.setState({ loading: false })
    }

    handleConfirmNIPChange = (e) => {
        const nip = e.target.value
        if (nip.toString().length > 4) {
            return
        } else if (nip.toString().length < 4) {
            this.setState({ confirmNIPIsInvalid: true, confirmNIPErrorMsg: 'El NIP debe contener 4 dígitos' })
        } else {
            this.setState({ confirmNIPIsInvalid: false, confirmNIPErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ confirmNIP: nip })
    }

    handleAcceptTermsChange = (e) => this.setState({ acceptTerms: !this.state.acceptTerms, acceptTermsIsInvalid: !this.state.acceptTerms ? false : true })

    handleSubmitBtn = (e) => {
        console.log('CONFIRM_NIP_BTN')
        e.preventDefault()
        const { confirmNIP, confirmNIPIsInvalid, acceptTerms, acceptTermsIsInvalid } = this.state
        // Check PART_7
        if (!confirmNIP || confirmNIPIsInvalid || !acceptTerms || acceptTermsIsInvalid) {
            if (!confirmNIP) this.setState({ confirmNIPIsInvalid: true })
            if (!acceptTerms) this.setState({ acceptTermsIsInvalid: true })
            return
        }


    }

    render() {
        return (
            <Fragment>
                <div className="form-description mt-2" style={{ color: 'rgb(0, 0, 128)', fontWeight: '500' }}>Para continuar, y si estás de acuerdo con la consulta de tu historial crediticio, acepta los términos e ingresa nuevamente tu NIP, que te enviamos previamente. </div>
                <div className="row mt-4 mb-2">
                    <div className="col-xs-6 offset-xs-3 col-sm-6 offset-sm-3 col-md-6 offset-md-3">
                        <div className="form-group">
                            <label className="form-label">Ingresa tu NIP nuevamente<span className="form-required-symbol">*</span></label>
                            <input value={this.state.confirmNIP} onChange={this.handleConfirmNIPChange} type="number" className={this.state.confirmNIPIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                            <div className="invalid-feedback">
                                {this.state.confirmNIPErrorMsg}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <Checkbox className="custom-checkbox" checked={this.state.acceptTerms} onChange={this.handleAcceptTermsChange} />
                            </div>
                            <div className="col-10 text-justify">
                                <label className="form-check-label form-label " style={{ color: this.state.acceptTermsIsInvalid ? '#dc3545' : '#4c4c4c' }}>Acepto que SwayDo.mx obtenga informacion relacionada a mi historial crediticio con el fin de obtener una Pre-Calificacion crediticia y conocer si soy sujeto de credito y el monto máximo que puedo solicitar.</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4">
                        <button onClick={this.handleSubmitBtn} className="btn btn-dark btn-form">Simular mi crédito</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ creditRequest }) {
    return {
        creditRequest,
    }
}

export default connect(mapStateToProps)(ConfirmNipForm)