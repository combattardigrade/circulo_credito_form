import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, saveCreditRequestId, saveCreditRequestNIP } from '../actions/creditRequest'
import { nextFormController, backFormController } from '../actions/formController'

// API
import { createCreditRequest } from '../utils/api'

class CreditTypeForm extends Component {

    state = {
        sourceOfResources: '',
        verifiableIncome: '',
        unverifiableIncome: '',
        jobDescription: '',
        sourceOfResourcesIsInvalid: false,
        verifiableIncomeIsInvalid: false,
        unverifiableIncomeIsInvalid: false,
        jobDescriptionIsInvalid: false,
        sourceOfResourcesErrorMsg: 'Este campo es obligatorio.',
        verifiableIncomeErrorMsg: 'Este campo es obligatorio.',
        unverifiableIncomeErrorMsg: 'Este campo es obligatorio.',
        jobDescriptionErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription, } = creditRequest
        this.setState({
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription,
            loading: false
        })
    }

    /* PART_6 */
    handleSourceOfResourcesChange = (e) => this.setState({ sourceOfResources: e.target.value, sourceOfResourcesIsInvalid: e.target.value.length > 0 ? false : true })

    handleVerifiableIncomeChange = (e) => {
        const amount = e.target.value
        if (amount < 0) {
            this.setState({ verifiableIncomeIsInvalid: true, verifiableIncomeErrorMsg: 'Ingresa una cantidad válida' })
        } else {
            this.setState({ verifiableIncomeIsInvalid: false, verifiableIncomeErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ verifiableIncome: e.target.value })
    }

    handleUnverifiableIncomeChange = (e) => {
        const amount = e.target.value
        if (amount < 0) {
            this.setState({ unverifiableIncomeIsInvalid: true, unverifiableIncomeErrorMsg: 'Ingresa una cantidad válida' })
        } else {
            this.setState({ unverifiableIncomeErrorMsg: false, unverifiableIncomeErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ unverifiableIncome: e.target.value })
    }

    handleJobDescriptionChange = (e) => this.setState({ jobDescription: e.target.value, jobDescriptionIsInvalid: e.target.value.length > 0 ? false : true })


    handleSendNIPBtn = (e) => {
        console.log('SEND_NIP_BTN')
        e.preventDefault()

        const { creditRequest, dispatch } = this.props

        const {
            email, phone, firstName, secondName, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento,
            curp, rfc,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode,
            creditType, creditAmount, propertyValue,
        } = creditRequest

        const {
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription,
            sourceOfResourcesIsInvalid, verifiableIncomeIsInvalid, jobDescriptionIsInvalid,
        } = this.state

        // Check PART_6
        if (!sourceOfResources || !verifiableIncome || !jobDescription
            || sourceOfResourcesIsInvalid || verifiableIncomeIsInvalid || jobDescriptionIsInvalid) {
            if (!sourceOfResources) this.setState({ sourceOfResourcesIsInvalid: true })
            if (!verifiableIncome) this.setState({ verifiableIncomeIsInvalid: true })
            if (!jobDescription) this.setState({ jobDescriptionIsInvalid: true })
            return
        }

        // Save Credit Request
        const params = {
            email, phone, firstName, secondName, lastName, secondLastName, dateOfBirth: dateOfBirth.toString(), gender,
            entidadNacimiento, curp, rfc,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, creditType, creditAmount, propertyValue,
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription,
        }

        // Save data locally
        dispatch(saveCreditRequest({ params }))

        // API
        createCreditRequest(params)
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    dispatch(saveCreditRequestId(res.payload.credit_request_id))
                    dispatch(saveCreditRequestNIP(res.payload.nip))
                    // next form controller
                    dispatch(nextFormController())
                    return
                }
            })
            .catch((err) => {
                console.log(err)
                return
            })
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
                    <label className="form-label">¿De dónde provienen la mayor parte de tus ingresos?<span className="form-required-symbol">*</span></label>
                    <select value={this.state.sourceOfResources} onChange={this.handleSourceOfResourcesChange} className={this.state.sourceOfResourcesIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                        <option value="">Seleccionar</option>
                        <option value="Asalariado">Asalariado</option>
                        <option value="Persona con Actividad Empresarial">Persona con Actividad Empresarial</option>
                        <option value="Accionista">Accionista</option>
                    </select>
                    <div className="invalid-feedback">
                        {this.state.sourceOfResourcesErrorMsg}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Monto de tus ingresos depositados en tu cuenta bancaria cada mes<span className="form-required-symbol">*</span></label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">MXN</span>
                        </div>
                        <input placeholder="0.00" value={this.state.verifiableIncome} onChange={this.handleVerifiableIncomeChange} type="number" className={this.state.verifiableIncomeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        <div className="invalid-feedback">
                            {this.state.verifiableIncomeErrorMsg}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Monto de tus ingresos mensuales no comprobables</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">MXN</span>
                        </div>
                        <input placeholder="0.00" value={this.state.unverifiableIncome} onChange={this.handleUnverifiableIncomeChange} type="number" className={this.state.unverifiableIncomeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        <div className="invalid-feedback">
                            {this.state.unverifiableIncomeErrorMsg}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" style={{ marginBottom: '0px' }}>Describe brevemente las funciones que desempeñas en tu trabajo<span className="form-required-symbol">*</span></label>
                    <div className="form-label-description" style={{ marginBottom: '5px' }}>Se lo más específico y breve posible</div>
                    <input value={this.state.jobDescription} onChange={this.handleJobDescriptionChange} type="text" className={this.state.jobDescriptionIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.jobDescriptionErrorMsg}
                    </div>
                </div>
                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={this.handleSendNIPBtn} className="btn btn-light btn-continue">Próxima página</button>
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