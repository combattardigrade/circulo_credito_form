import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { } from '../../actions/auth'

// components
import Loading from './Loading'

// Actions
import { saveCreditRequest } from '../actions/creditRequest'

// Libraries
import { Line } from 'rc-progress';
import DatePicker from 'react-date-picker';


class Precalificador extends Component {
    state = {
        monto: '',
        tipoCredito: '',
        plazo: '',
        nombre: '',
        telefono: '',
        rtelefono: '',
        email: '',
        montoIsInvalid: false,
        nombreIsInvalid: false,
        telefonoIsInvalid: false,
        rtelefonoIsInvalid: false,
        emailIsInvalid: false,
        montoErrorMsg: 'Este campo es obligatorio.',
        telefonoErrorMsg: 'Este campo es obligatorio.',
        rtelefonoErrorMsg: 'Este campo es obligatorio',
        emailErrorMsg: 'Este campo es obligatorio',
        startDate: new Date(),
        loading: true,
        serverMsg: '',
    }

    componentDidMount() {
        document.title = "Iniciar Sesión"
        console.log('test')
        const { dispatch } = this.props
        this.setState({ loading: false })
    }

    handleMontoChange = (e) => {
        const amount = parseFloat(e.target.value)

        if (amount < 250000) {
            this.setState({ montoIsInvalid: true, montoErrorMsg: 'El valor debe ser mayor o igual a $250,000 MXN' })
        } else if (amount > 100000000) {
            this.setState({ montoIsInvalid: true, montoErrorMsg: 'El valor debe ser menor o igual a $100,000,000 MXN' })
        } else {
            this.setState({ montoIsInvalid: false, montoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ monto: e.target.value })
    }

    handleTipoCreditoChange = (e) => this.setState({ tipoCredito: e.target.value })
    handlePlazoChange = (e) => this.setState({ plazo: e.target.value })
    handleNombreChange = (e) => this.setState({ nombre: e.target.value })

    handleTelefonoChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10) {
            this.setState({ telefonoIsInvalid: true, telefonoErrorMsg: 'La entrada debe contener 10 caracteres' })
        } else {
            this.setState({ telefonoIsInvalid: false, telefonoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ telefono: e.target.value })
    }

    handleRTelefonoChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10 || phone != this.state.telefono) {
            this.setState({ rtelefonoIsInvalid: true, rtelefonoErrorMsg: 'Confirmar Teléfono. Los campos deben ser idénticos' })
        } else {
            this.setState({ rtelefonoIsInvalid: false, rtelefonoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ rtelefono: e.target.value })
    }

    handleEmailChange = (e) => {

        if (!this.validateEmail(e.target.value)) {
            this.setState({ emailIsInvalid: true, emailErrorMsg: 'Ingresa un correo electrónico válido' })
        } else {
            this.setState({ emailIsInvalid: false, emailErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ email: e.target.value })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()

        const { monto, tipoCredito, plazo, nombre } = this.state
        const { dispatch } = this.props

        if (!monto) {
            this.setState({ montoIsInvalid: true })
        }

        if (!nombre) {
            this.setState({ nombreIsInvalid: true })
        }

        if (!monto || !nombre) {
            return
        }

        // 1. API request

        // 2. Dispatch save action
        dispatch(saveCreditRequest(params))
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        const { serverMsg, loading } = this.state


        if (loading === true) {
            return <Loading />
        }

        return (
            <div className="container">
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div className="card form-container" >

                            <Line percent="50" strokeWidth="1" strokeColor="#274d00" strokeLinecap="square" />
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 20px 20px' }}>
                                <div className="form-subtitle">Pre-calificación</div>
                                <div className="form-subtitle">13%</div>
                            </div>

                            <img className="card-img-top" src="https://s3-us-west-2.amazonaws.com/userdata123/www/imagefields/59450/59450072.jpg?_=1594321348260" />
                            <div className="card-body">


                                <div className="form-title" style={{ marginTop: '5px' }}>Pre-calificador Hipotecario</div>
                                <div>Descubre en minutos si eres sujeto de crédito y el monto máximo que se puede prestar así como la tasa de interés disponible para tí.</div>
                                <div>-Recibirás una Resolución de acuerdo con los datos declarados</div>
                                <div>-En caso de estar interesado, podrás continuar el proceso en línea o en las oficinas de SwayDo.mx de tu ciudad, en un proceso presencial.</div>
                                <div>-Esta pre-calificación no supone costo o compromiso alguno para usted.</div>

                                <div>Por favor ingresa los siguientes datos:</div>

                                <form action="">
                                    <div className="form-group">
                                        <label className="form-label">Nombre (s)</label>
                                        <input value={this.state.email} onChange={this.handleEmailChange} type="text" className="form-control" />
                                        <div className="invalid-feedback">
                                            {this.state.emailErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Apellido Paterno</label>
                                        <input value={this.state.email} onChange={this.handleEmailChange} type="text" className="form-control" />
                                        <div className="invalid-feedback">
                                            {this.state.emailErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Apellido Materno</label>
                                        <input value={this.state.email} onChange={this.handleEmailChange} type="text" className="form-control" />
                                        <div className="invalid-feedback">
                                            {this.state.emailErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input value={this.state.email} onChange={this.handleEmailChange} type="text" className="form-control" />
                                        <div className="invalid-feedback">
                                            {this.state.emailErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Teléfono</label>
                                        <input value={this.state.telefono} onChange={this.handleTelefonoChange} maxLength="10" type="number" className={this.state.telefonoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.telefonoErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Confirmar Teléfono</label>
                                        <input value={this.state.telefono} onChange={this.handleTelefonoChange} maxLength="10" type="number" className={this.state.telefonoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.telefonoErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Fecha de nacimiento</label>
                                        <div>
                                            <DatePicker
                                                onChange={this.handleChange}
                                                value={this.state.startDate}
                                                className='datepicker'
                                            
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Sexo</label>
                                        <select className="form-control">
                                            <option value="Compra de Casa" data-index="0">Hombre</option>
                                            <option value="Construcción" data-index="1">Mujer</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Tipo de crédito</label>
                                        <select className="form-control">
                                            <option value="Compra de Casa" data-index="0">Compra de Casa</option>
                                            <option value="Construcción" data-index="1">Construcción</option>
                                            <option value="Remodelación" data-index="2">Remodelación</option>
                                            <option value="Liquidez" data-index="3">Liquidez</option>
                                            <option value="Terreno" data-index="4">Terreno</option>
                                            <option value="Terreno+Construcción" data-index="5">Terreno+Construcción</option>
                                            <option value="Liquidez (Pago a pasivos)" data-index="6">Liquidez (Pago a pasivos)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">¿De dónde provienen la mayor parte de tus ingresos?</label>
                                        <select className="form-control">
                                            <option value="Compra de Casa" data-index="0">Compra de Casa</option>
                                            <option value="Construcción" data-index="1">Construcción</option>
                                            <option value="Remodelación" data-index="2">Remodelación</option>
                                            <option value="Liquidez" data-index="3">Liquidez</option>
                                            <option value="Terreno" data-index="4">Terreno</option>
                                            <option value="Terreno+Construcción" data-index="5">Terreno+Construcción</option>
                                            <option value="Liquidez (Pago a pasivos)" data-index="6">Liquidez (Pago a pasivos)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Monto de tus ingresos depositados en tu cuenta bancaria cada mes</label>
                                        <input value={this.state.monto} onChange={this.handleMontoChange} type="number" className={this.state.montoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.montoErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Monto de tus ingresos mensuales no comprobables</label>
                                        <input value={this.state.monto} onChange={this.handleMontoChange} type="number" className={this.state.montoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.montoErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Monto de crédito que desea solicitar</label>
                                        <input value={this.state.monto} onChange={this.handleMontoChange} type="number" className={this.state.montoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.montoErrorMsg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Valor de la propiedad</label>
                                        <input value={this.state.monto} onChange={this.handleMontoChange} type="number" className={this.state.montoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.montoErrorMsg}
                                        </div>
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <button onClick={this.handleContinueBtn} className="btn btn-dark btn-form">Simular mi crédito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ }) {
    return {

    }
}

export default connect(mapStateToProps)(Precalificador)