import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveCreditRequest, } from '../actions/creditRequest'
import { nextFormController } from '../actions/formController'



class LeadForm extends Component {

    state = {
        email: '',
        phone: '',
        confirmPhone: '',
        emailIsInvalid: false,
        phoneIsInvalid: false,
        confirmPhoneIsInvalid: false,
        emailErrorMsg: 'Este campo es obligatorio.',
        phoneErrorMsg: 'Este campo es obligatorio.',
        confirmPhoneErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { email, phone } = creditRequest
        this.setState({
            email,
            phone,
            loading: false
        })
    }

    /* PART_1 */
    handleEmailChange = (e) => {

        if (!this.validateEmail(e.target.value)) {
            this.setState({ emailIsInvalid: true, emailErrorMsg: 'Ingresa un correo electrónico válido' })
        } else {
            this.setState({ emailIsInvalid: false, emailErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ email: e.target.value })
    }

    handlePhoneChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10) {
            this.setState({ phoneIsInvalid: true, phoneErrorMsg: 'La entrada debe contener 10 caracteres' })
        } else {
            this.setState({ phoneIsInvalid: false, phoneErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ phone: e.target.value })
    }

    handleConfirmPhoneChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10 || phone != this.state.phone) {
            this.setState({ confirmPhoneIsInvalid: true, confirmPhoneErrorMsg: 'Confirmar Teléfono. Los campos deben ser idénticos' })
        } else {
            this.setState({ confirmPhoneIsInvalid: false, confirmPhoneErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ confirmPhone: e.target.value })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            email, phone, confirmPhone, emailIsInvalid, phoneIsInvalid, confirmPhoneIsInvalid
        } = this.state

        const { dispatch } = this.props

        // Check PART_1
        if (!email || !phone || !confirmPhone || emailIsInvalid || phoneIsInvalid || confirmPhoneIsInvalid) {
            if (!email) this.setState({ emailIsInvalid: true })
            if (!phone) this.setState({ phoneIsInvalid: true })
            if (!confirmPhone) this.setState({ confirmPhoneIsInvalid: true })
            return
        }

        // save credit request form
        const params = {
            email, phone,
        }

        dispatch(saveCreditRequest(params))

        // next form controller
        dispatch(nextFormController())
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {

        return (
            <Fragment>
                <div className="mt-2" style={{ color: '#000080' }}>Descubre en minutos si eres sujeto de crédito y el monto máximo que se puede prestar así como la tasa de interés disponible para tí.</div>
                <div className="form-description mt-4">-Recibirás una Resolución de acuerdo con los datos declarados</div>
                <div className="form-description mt-2">-En caso de estar interesado, podrás continuar el proceso en línea o en las oficinas de SwayDo.mx de tu ciudad, en un proceso presencial.</div>
                <div className="form-description mt-2">-Esta pre-calificación no supone costo o compromiso alguno para usted.</div>
                <div className="mt-4" style={{ color: '#4c4c4c', fontStyle: 'italic', fontFamily: "Open Sans, sans-serif" }}>Por favor ingresa los siguientes datos:</div>

                <div className="form-group mt-4">
                    <label className="form-label">Email<span className="form-required-symbol">*</span></label>
                    <input value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.emailErrorMsg}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Teléfono<span className="form-required-symbol">*</span></label>
                    <input value={this.state.phone} onChange={this.handlePhoneChange} maxLength="10" type="number" className={this.state.phoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.phoneErrorMsg}
                    </div>
                </div>
                {
                    this.state.phone.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Confirmar Teléfono<span className="form-required-symbol">*</span></label>
                            <input value={this.state.confirmPhone} onChange={this.handleConfirmPhoneChange} maxLength="10" type="number" className={this.state.confirmPhoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                            <div className="invalid-feedback">
                                {this.state.confirmPhoneErrorMsg}
                            </div>
                        </div>
                    )
                }
                <div className="text-center mt-4">
                    <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
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

export default connect(mapStateToProps)(LeadForm)