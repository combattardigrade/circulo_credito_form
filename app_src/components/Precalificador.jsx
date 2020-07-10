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
        formController: 1,
        totalFormSections: 4,
        // PART_1
        firstName: '',
        secondName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        phone: '',
        confirmPhone: '',
        firstNameIsInvalid: false,
        lastNameIsInvalid: false,
        secondLastNameIsInvalid: false,
        emailIsInvalid: false,
        phoneIsInvalid: false,
        confirnmPhoneIsInvalid: false,
        emailErrorMsg: 'Este campo es obligatorio.',
        phoneErrorMsg: 'Este campo es obligatorio.',
        confirmPhoneErrorMsg: 'Este campo es obligatorio.',

        // PART_2
        dateOfBirth: new Date(),
        gender: 'Hombre',
        rfc: '',
        calle: '',
        numeroExt: '',
        colonia: '',
        municipio: '',
        entidadFederativa: '',
        postalCode: '',
        rfcIsInvalid: false,
        calleIsInvalid: false,
        numeroExtIsInvalid: false,
        coloniaIsInvalid: false,
        municipioIsInvalid: false,
        rfcErrorMsg: 'Este campo es obligatorio.',
        calleErrorMsg: 'Este campo es obligatorio.',
        numeroExtErrorMsg: 'Este campo es obligatorio.',
        coloniaErrorMsg: 'Este campo es obligatorio.',
        municipioErrorMsg: 'Este campo es obligatorio.',
        entidadFederativaErrorMsg: ' Este campo es obligatorio',
        postalCode: 'Este campo es obligatorio.',

        // PART_3
        creditType: '',
        sourceOfResources: '',
        verifiableIncome: '',
        unverifiableIncome: '',
        creditAmount: '',
        propertyValue: '',
        verifiableIncomeIsInvalid: false,
        unverifiableIncomeIsInvalid: false,
        creditAmountIsInvalid: false,
        propertyValueIsInvalid: false,
        verifiableIncomeErrorMsg: 'Este campo es obligatorio.',
        unverifiableIncomeErrorMsg: 'Este campo es obligatorio.',
        creditAmountErrorMsg: 'Este campo es obligatorio.',
        propertyValueErrorMsg: 'Este campo es obligatorio.',
        loading: true,
        serverMsg: '',
    }

    componentDidMount() {
        document.title = "Iniciar Sesión"

        const { dispatch } = this.props
        this.setState({ loading: false })
    }

    /* PART_1 */
    handleFirstNameChange = (e) => this.setState({ firstName: e.target.value })
    handleSecondNameChange = (e) => this.setState({ secondName: e.target.value })
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value })
    handleSecondLastNameChange = (e) => this.setState({ secondLastName: e.target.value })

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


    /* PART_2 */
    handleDateOfBirthChange = (date) => this.setState({ dateOfBirth: date })
    handleGenderChange = (e) => this.setState({ gender: e.target.value })

    handleRFCChange = (e) => {
        const rfc = e.target.value
        this.setState({ rfc: e.target.value })
    }

    handleCalleChange = (e) => this.setState({ calle: e.target.value })
    handleNumeroExtChange = (e) => this.setState({ numeroExt: e.target.value })
    handleColoniaChange = (e) => this.setState({ colonia: e.target.value })
    handleMunicipioChange = (e) => this.setState({ municipio: e.target.value })
    handleEntidadFederativaChange = (e) => this.setState({ entidadFederative: e.target.value })
    handlePostalCodeChange = (e) => this.setState({ postalCode: e.target.value })

    /* PART_3 */
    handleCreditTypeChange = (e) => this.setState({ creditType: e.target.value })
    handleSourceOfResourcesChange = (e) => this.setState({ sourceOfResources: e.target.value })

    handleVerifiableIncomeChange = (e) => {
        this.setState({ verifiableIncome: e.target.value })
    }

    handleUnverifiableIncomeChange = (e) => {
        this.setState({ unverifiableIncome: e.target.value })
    }

    handleCreditAmountChange = (e) => {
        this.setState({ creditAmount: e.target.value })
    }

    handlePropertyValueChange = (e) => {
        this.setState({ propertyValue: e.target.value })
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { formController } = this.state
        if (formController == 1) return
        this.setState({ formController: formController - 1 })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { formController, totalFormSections } = this.state
        if (formController === totalFormSections) return
        this.setState({ formController: formController + 1 })
    }

    handlesContinueBtn = (e) => {
        e.preventDefault()

        const { monto, tipoCredito, plazo, nombre } = this.state
        const { dispatch } = this.props
        console.log('test')
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



    render() {
        const { formController, totalFormSections, loading } = this.state
        const progress = formController / totalFormSections * 100


        if (loading === true) {
            return <Loading />
        }

        return (
            <div className="container">
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div className="card form-container" >

                            <Line percent={progress} strokeWidth="1" strokeColor="#274d00" strokeLinecap="square" />
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 20px 20px' }}>
                                <div className="form-subtitle">Pre-calificación</div>
                                <div className="form-subtitle">{progress}%</div>
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
                                    {
                                        formController === 1 && (
                                            <Fragment>
                                                <div className="form-group">
                                                    <label className="form-label">Nombre</label>
                                                    <input value={this.state.firstName} onChange={this.handleFirstNameChange} type="text" className={this.state.firstNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        Este campo es obligatorio.
                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Segundo Nombre</label>
                                                    <input value={this.state.secondName} onChange={this.handleSecondNameChange} type="text" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Apellido Paterno</label>
                                                    <input value={this.state.lastName} onChange={this.handleLastNameChange} type="text" className={this.state.lastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        Este campo es obligatorio.
                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Apellido Materno</label>
                                                    <input value={this.state.secondLastName} onChange={this.handleSecondLastNameChange} type="text" className={this.state.secondLastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        Este campo es obligatorio.
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
                                                    <input value={this.state.phone} onChange={this.handlePhoneChange} maxLength="10" type="number" className={this.state.phoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.phoneErrorMsg}
                                                    </div>
                                                </div>
                                                {
                                                    this.state.phone.length > 0 && (
                                                        <div className="form-group">
                                                            <label className="form-label">Confirmar Teléfono</label>
                                                            <input value={this.state.confirmPhone} onChange={this.handleConfirmPhoneChange} maxLength="10" type="number" className={this.state.confirnmPhoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                            <div className="invalid-feedback">
                                                                {this.state.confirmPhoneErrorMsg}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 2 && (
                                            <Fragment>
                                                <div className="form-group">
                                                    <label className="form-label">Fecha de nacimiento<span className="form-required-symbol">*</span></label>
                                                    <div>
                                                        <DatePicker
                                                            onChange={this.handleDateOfBirthChange}
                                                            value={this.state.dateOfBirth}
                                                            className='datepicker'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Sexo<span className="form-required-symbol">*</span></label>
                                                    <select value={this.state.gender} onChange={this.handleGenderChange} className="form-control">
                                                        <option value="Hombre" >Hombre</option>
                                                        <option value="Mujer">Mujer</option>
                                                    </select>
                                                </div>

                                                {/* <div className="form-group">
                                                    <label className="form-label">RFC</label>
                                                    <input value={this.state.rfc} onChange={this.handleRFCChange} maxLength="10" type="number" className={this.state.rfcIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.rfcErrorMsg}
                                                    </div>
                                                </div> */}

                                                {/* Domicilio */}
                                                <div className="form-group">
                                                    <label className="form-label">Calle<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.calle} onChange={this.handleCalleChange} type="text" className={this.state.calleIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.calleErrorMsg}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Colonia<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.colonia} onChange={this.handleColoniaChange} type="text" className={this.state.coloniaIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.coloniaErrorMsg}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Alcanldía / Municipio<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.municipio} onChange={this.handleMunicipioChange} type="text" className={this.state.municipioIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.municipioErrorMsg}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Estado<span className="form-required-symbol">*</span></label>
                                                    <select value={this.state.entidadFederativa} onChange={this.handleEntidadFederativaChange} className="form-control">

                                                        <option value="CDMX">Ciudad de México</option>
                                                        <option value="AGS">Aguascalientes</option>
                                                        <option value="BCN">Baja California</option>
                                                        <option value="BCS">Baja California Sur</option>
                                                        <option value="CAM">Campeche</option>
                                                        <option value="CHP">Chiapas</option>
                                                        <option value="CHI">Chihuahua</option>
                                                        <option value="COA">Coahuila</option>
                                                        <option value="COL">Colima</option>
                                                        <option value="DUR">Durango</option>
                                                        <option value="GTO">Guanajuato</option>
                                                        <option value="GRO">Guerrero</option>
                                                        <option value="HGO">Hidalgo</option>
                                                        <option value="JAL">Jalisco</option>
                                                        <option value="MEX">M&eacute;xico</option>
                                                        <option value="MIC">Michoac&aacute;n</option>
                                                        <option value="MOR">Morelos</option>
                                                        <option value="NAY">Nayarit</option>
                                                        <option value="NLE">Nuevo Le&oacute;n</option>
                                                        <option value="OAX">Oaxaca</option>
                                                        <option value="PUE">Puebla</option>
                                                        <option value="QRO">Quer&eacute;taro</option>
                                                        <option value="ROO">Quintana Roo</option>
                                                        <option value="SLP">San Luis Potos&iacute;</option>
                                                        <option value="SIN">Sinaloa</option>
                                                        <option value="SON">Sonora</option>
                                                        <option value="TAB">Tabasco</option>
                                                        <option value="TAM">Tamaulipas</option>
                                                        <option value="TLX">Tlaxcala</option>
                                                        <option value="VER">Veracruz</option>
                                                        <option value="YUC">Yucat&aacute;n</option>
                                                        <option value="ZAC">Zacatecas</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Código Postal<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.postalCode} onChange={this.handlePostalCodeChange} maxLength="10" type="number" className={this.state.postalCodeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.postalCodeErrorMsg}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    }


                                    {
                                        formController === 3 && (
                                            <Fragment>
                                                <div className="form-group">
                                                    <label className="form-label">Tipo de crédito</label>
                                                    <select value={this.state.creditType} onChange={this.handleCreditTypeChange} className="form-control">
                                                        <option value="Compra de Casa">Compra de Casa</option>
                                                        <option value="Construcción">Construcción</option>
                                                        <option value="Remodelación">Remodelación</option>
                                                        <option value="Liquidez">Liquidez</option>
                                                        <option value="Terreno">Terreno</option>
                                                        <option value="Terreno+Construcción">Terreno+Construcción</option>
                                                        <option value="Liquidez (Pago a pasivos)">Liquidez (Pago a pasivos)</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">¿De dónde provienen la mayor parte de tus ingresos?</label>
                                                    <select value={this.state.sourceOfResources} onChange={this.handleSourceOfResourcesChange} className="form-control">
                                                        <option value="Compra de Casa">Compra de Casa</option>
                                                        <option value="Construcción">Construcción</option>
                                                        <option value="Remodelación">Remodelación</option>
                                                        <option value="Liquidez">Liquidez</option>
                                                        <option value="Terreno">Terreno</option>
                                                        <option value="Terreno Construcción">Terreno+Construcción</option>
                                                        <option value="Liquidez (Pago a pasivos)">Liquidez (Pago a pasivos)</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Monto de tus ingresos depositados en tu cuenta bancaria cada mes</label>
                                                    <input value={this.state.verifiableIncome} onChange={this.handleVerifiableIncomeChange} type="number" className={this.state.verifiableIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.verifiableIncomeErrorMsg}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Monto de tus ingresos mensuales no comprobables</label>
                                                    <input value={this.state.unverifiableIncome} onChange={this.handleUnverifiableIncomeChange} type="number" className={this.state.unverifiableIncomeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.unverifiableIncomeErrorMsg}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Monto de crédito que desea solicitar</label>
                                                    <input value={this.state.creditAmount} onChange={this.handleCreditAmountChange} type="number" className={this.state.creditAmountIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.creditAmountErrorMsg}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Valor de la propiedad</label>
                                                    <input value={this.state.propertyValue} onChange={this.handlePropertyValueChange} type="number" className={this.state.propertyValueIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.propertyValueErrorMsg}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    }

                                </form>
                                {
                                    formController === totalFormSections
                                        ?
                                        <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                                                <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                                            </div>
                                            <div className="text-center mt-4">
                                                <button onClick={this.handleContinueBtn} className="btn btn-dark btn-form">Simular mi crédito</button>
                                            </div>
                                        </div>
                                        :
                                        formController !== 1
                                            ?
                                            <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                                                    <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
                                                </div>
                                            </div>
                                            :
                                            <div className="text-center mt-4">
                                                <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
                                            </div>
                                }


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