import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, } from '../actions/creditRequest'
import { nextFormController, backFormController } from '../actions/formController'

class CreditTypeForm extends Component {

    state = {
        creditType: '',
        creditAmount: '',
        propertyValue: '',
        ownsProperty: '',
        creditTypeIsInvalid: false,
        creditAmountIsInvalid: false,
        propertyValueIsInvalid: false,
        ownsPropertyIsInvalid: false,
        creditTypeErrorMsg: 'Este campo es obligatorio.',
        creditAmountErrorMsg: 'Este campo es obligatorio.',
        propertyValueErrorMsg: 'Este campo es obligatorio.',
        ownsPropertyErrorMsg: 'Este campos es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { creditType, creditAmount, propertyValue, ownsProperty } = creditRequest

        this.setState({
            creditType, creditAmount, propertyValue, ownsProperty,
            loading: false
        })
    }

    /* PART_5 */
    handleCreditTypeChange = (e) => this.setState({ creditType: e.target.value, creditTypeIsInvalid: e.target.value.length > 0 ? false : true })

    handleCreditAmountChange = (e) => {
        const amount = parseFloat(e.target.value)

        if (amount < 250000) {
            this.setState({ creditAmountIsInvalid: true, creditAmountErrorMsg: 'El valor debe ser mayor o igual a $250,000 MXN' })
        } else if (amount > 100000000) {
            this.setState({ creditAmountIsInvalid: true, creditAmountErrorMsg: 'El valor debe ser menor o igual a $100,000,000 MXN' })
        } else {
            this.setState({ creditAmountIsInvalid: false, creditAmountErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ creditAmount: e.target.value })
    }

    handlePropertyValueChange = (e) => {
        const amount = e.target.value
        if (amount <= 0) {
            this.setState({ propertyValueIsInvalid: true, propertyValueErrorMsg: 'Ingresa un cantidad válida' })
        } else {
            this.setState({ propertyValueIsInvalid: false, propertyValueErrorMsg: 'Este campo es obligatorio.' })
        }
        this.setState({ propertyValue: e.target.value })
    }

    handleOwnsPropertyChange = (e) => this.setState({ ownsProperty: e.target.value, ownsPropertyIsInvalid: e.target.value.length > 0 ? false : true  })

    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            creditType, creditAmount, propertyValue, ownsProperty, ownsPropertyIsInvalid, creditTypeIsInvalid, creditAmountIsInvalid, propertyValueIsInvalid
        } = this.state

        const { dispatch } = this.props

        if (creditType !== 'Adquisición Tradicional' && creditType !== 'Construcción' && creditType != '') {
            if (!creditType || !creditAmount || !ownsProperty || creditTypeIsInvalid || creditAmountIsInvalid || ownsPropertyIsInvalid) {
                if (!creditType) this.setState({ creditTypeIsInvalid: true })
                if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
                if (!ownsProperty) this.setState({ ownsPropertyIsInvalid: true })
                return
            }
        } else if (creditType === 'Adquisición Tradicional') {
            if (!creditType || !creditAmount || !propertyValue || creditTypeIsInvalid || creditAmountIsInvalid || propertyValueIsInvalid) {
                if (!creditType) this.setState({ creditTypeIsInvalid: true })
                if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
                if (!propertyValue) this.setState({ propertyValueIsInvalid: true })
                return
            }
        } else {
            if (!creditType) this.setState({ creditTypeIsInvalid: true })
            if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
            if (!ownsProperty) this.setState({ ownsPropertyIsInvalid: true })
            if (!propertyValue) this.setState({ propertyValueIsInvalid: true })
            return
        }

        // save credit request form
        const params = {
            creditType, creditAmount, propertyValue, ownsProperty
        }

        dispatch(saveCreditRequest(params))

        // next form controller
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {

        return (
            <Fragment>
                <div className="form-group mt-4">
                    <label className="form-label">Tipo de crédito<span className="form-required-symbol">*</span></label>
                    <select value={this.state.creditType} onChange={this.handleCreditTypeChange} className={this.state.creditTypeIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                        <option value="">Seleccionar</option>
                        <option value="Adquisición Tradicional">Adquisición Tradicional</option>
                        <option value="Construcción">Construcción</option>
                        <option value="Remodelación">Remodelación</option>
                        <option value="Liquidez (destino Libre)">Liquidez (destino Libre)</option>
                        <option value="Liquidez (pago a pasivos)">Liquidez (pago a pasivos)</option>
                        <option value="Mejora de Hipoteca">Mejora de Hipoteca</option>
                        <option value="Terreno+Construccion">Terreno+Construccion</option>
                        <option value="Cofinavit">Cofinavit</option>
                    </select>
                    <div className="invalid-feedback">
                        {this.state.creditTypeErrorMsg}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Monto de crédito que desea solicitar<span className="form-required-symbol">*</span></label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">MXN</span>
                        </div>
                        <input placeholder="0.0" value={this.state.creditAmount} onChange={this.handleCreditAmountChange} type="number" className={this.state.creditAmountIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        <div className="invalid-feedback">
                            {this.state.creditAmountErrorMsg}
                        </div>
                    </div>
                </div>
                {
                    this.state.creditType !== 'Adquisición Tradicional' && this.state.creditType !== 'Construcción' && this.state.creditType != ''
                        ?
                        <div className="form-group mt-4">
                            <label className="form-label">¿Usted es propietario de al menos una casa habitación?<span className="form-required-symbol">*</span></label>
                            <select value={this.state.ownsProperty} onChange={this.handleOwnsPropertyChange} className={this.state.ownsPropertyIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                                <option value="">Seleccionar</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            <div className="invalid-feedback">
                                {this.state.ownsPropertyErrorMsg}
                            </div>
                        </div>
                        :
                        this.state.creditType === 'Adquisición Tradicional'
                            ?
                            <div className="form-group">
                                <label className="form-label">¿Cual es el valor aproximado de la propiedad que desea comprar?<span className="form-required-symbol">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">MXN</span>
                                    </div>
                                    <input placeholder="0.0" value={this.state.propertyValue} onChange={this.handlePropertyValueChange} type="number" className={this.state.propertyValueIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.propertyValueErrorMsg}
                                    </div>
                                </div>
                            </div>
                            :
                            null
                }

                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div> */}
                    <div className="text-center mt-4">
                        <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
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

export default connect(mapStateToProps)(CreditTypeForm)