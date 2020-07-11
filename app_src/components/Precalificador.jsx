import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { } from '../../actions/auth'

// components
import Loading from './Loading'

// Actions
import { saveCreditRequest } from '../actions/creditRequest'

// Libraries
import { Line } from 'rc-progress'
import DatePicker from 'react-date-picker'
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css'


class Precalificador extends Component {
    state = {
        formController: 4,
        totalFormSections: 7,

        // PART_1
        email: '',
        phone: '',
        confirmPhone: '',
        emailIsInvalid: false,
        phoneIsInvalid: false,
        confirmPhoneIsInvalid: false,
        emailErrorMsg: 'Este campo es obligatorio.',
        phoneErrorMsg: 'Este campo es obligatorio.',
        confirmPhoneErrorMsg: 'Este campo es obligatorio.',

        // PART_2
        firstName: '',
        secondName: '',
        lastName: '',
        secondLastName: '',
        dateOfBirth: new Date(),
        gender: 'Hombre',
        rfc: '',
        firstNameIsInvalid: false,
        lastNameIsInvalid: false,
        secondLastNameIsInvalid: false,
        rfcIsInvalid: false,
        rfcErrorMsg: 'Este campo es obligatorio.',

        // PART_3
        calle: '',
        numeroExt: '',
        colonia: '',
        municipio: '',
        entidadFederativa: '',
        postalCode: '',
        calleIsInvalid: false,
        numeroExtIsInvalid: false,
        coloniaIsInvalid: false,
        municipioIsInvalid: false,
        entidadFederativaIsInvalid: false,
        postalCodeIsInvalid: false,
        calleErrorMsg: 'Este campo es obligatorio.',
        numeroExtErrorMsg: 'Este campo es obligatorio.',
        coloniaErrorMsg: 'Este campo es obligatorio.',
        municipioErrorMsg: 'Este campo es obligatorio.',
        entidadFederativaErrorMsg: ' Este campo es obligatorio',
        postalCodeErrorMsg: 'Este campo es obligatorio.',

        // PART_4
        creditType: '',
        creditAmount: '',
        propertyValue: '',
        creditTypeIsInvalid: false,
        creditAmountIsInvalid: false,
        propertyValueIsInvalid: false,
        creditTypeErrorMsg: 'Este campo es obligatorio.',
        creditAmountErrorMsg: 'Este campo es obligatorio.',
        propertyValueErrorMsg: 'Este campo es obligatorio.',

        // PART_5
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

        // PART_6
        nip: '',
        nipIsInvalid: false,
        nipErrorMsg: 'Este campo es obligatorio.',

        // PART_7
        confirmNIP: '',
        acceptTerms: false,
        confirmNIPIsInvalid: false,
        acceptTermsIsInvalid: false,
        confirmNIPErrorMsg: 'Este campos es obligatorio.',

        loading: true,
        serverMsg: '',
    }

    componentDidMount() {
        document.title = "Iniciar Sesión"

        const { dispatch } = this.props
        this.setState({ loading: false })
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

    /* PART_2 */
    handleFirstNameChange = (e) => this.setState({ firstName: e.target.value, firstNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleSecondNameChange = (e) => this.setState({ secondName: e.target.value })
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value, lastNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleSecondLastNameChange = (e) => this.setState({ secondLastName: e.target.value, secondLastNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleDateOfBirthChange = (date) => this.setState({ dateOfBirth: date })
    handleGenderChange = (e) => this.setState({ gender: e.target.value })

    handleRFCChange = (e) => {
        const rfc = e.target.value
        this.setState({ rfc: e.target.value })
    }

    /* PART_3 */
    handleCalleChange = (e) => this.setState({ calle: e.target.value, calleIsInvalid: e.target.value.length > 0 ? false : true })
    handleNumeroExtChange = (e) => this.setState({ numeroExt: e.target.value, numeroExtIsInvalid: e.target.value.length > 0 ? false : true })
    handleColoniaChange = (e) => this.setState({ colonia: e.target.value, coloniaIsInvalid: e.target.value.length > 0 ? false : true })
    handleMunicipioChange = (e) => this.setState({ municipio: e.target.value, municipioIsInvalid: e.target.value.length > 0 ? false : true })
    handleEntidadFederativaChange = (e) => this.setState({ entidadFederativa: e.target.value, entidadFederativaIsInvalid: e.target.value.length > 0 ? false : true })
    handlePostalCodeChange = (e) => this.setState({ postalCode: e.target.value, postalCodeIsInvalid: e.target.value.length > 0 ? false : true })

    /* PART_4 */
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

    /* PART_5 */
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

    /* PART_6 */
    handleNIPChange = (e) => {
        const nip = e.target.value
        if (nip.toString().length > 4) {
            return
        } else if (nip.toString().length < 4) {
            this.setState({ nipIsInvalid: true, nipErrorMsg: 'El NIP debe contener 4 dígitos' })
        } else {
            this.setState({ nipIsInvalid: false, nipErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ nip })
    }

    /* PART_7 */
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

    handleBackBtn = (e) => {
        e.preventDefault()
        const { formController } = this.state
        if (formController == 1) return
        this.setState({ formController: formController - 1 })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()
        const {
            formController, totalFormSections,
            email, phone, confirmPhone, emailIsInvalid, phoneIsInvalid, confirmPhoneIsInvalid,
            firstName, lastName, secondLastName, dateOfBirth, gender, firstNameIsInvalid, lastNameIsInvalid, secondLastNameIsInvalid,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, calleIsInvalid, numeroExtIsInvalid, municipioIsInvalid, postalCodeIsInvalid,
            creditType, creditAmount, propertyValue, creditTypeIsInvalid, creditAmountIsInvalid, propertyValueIsInvalid,
            sourceOfResources, verifiableIncome, jobDescription, sourceOfResourcesIsInvalid, verifiableIncomeIsInvalid, unverifiableIncomeIsInvalid, jobDescriptionIsInvalid,
            nip, nipIsInvalid,

        } = this.state

        if (formController === totalFormSections) return

        // Check PART_1
        if (formController === 1 && (!email || !phone || !confirmPhone || emailIsInvalid || phoneIsInvalid || confirmPhoneIsInvalid)) {
            if (!email) this.setState({ emailIsInvalid: true })
            if (!phone) this.setState({ phoneIsInvalid: true })
            if (!confirmPhone) this.setState({ confirmPhoneIsInvalid: true })
            return
        }

        // Check PART_2
        if (formController === 2 && (!firstName || !lastName || !secondLastName || !dateOfBirth || !gender || firstNameIsInvalid || lastNameIsInvalid || secondLastNameIsInvalid)) {
            if (!firstName) this.setState({ firstNameIsInvalid: true })
            if (!lastName) this.setState({ lastNameIsInvalid: true })
            if (!secondLastName) this.setState({ secondLastNameIsInvalid: true })
            return
        }

        // Check PART_3
        if (formController === 3 && (!calle || !numeroExt || !colonia || !municipio || !entidadFederativa || !postalCode ||
            calleIsInvalid || numeroExtIsInvalid || municipioIsInvalid || postalCodeIsInvalid)) {
            if (!calle) this.setState({ calleIsInvalid: true })
            if (!numeroExt) this.setState({ numeroExtIsInvalid: true })
            if (!colonia) this.setState({ coloniaIsInvalid: true })
            if (!municipio) this.setState({ municipioIsInvalid: true })
            if (!entidadFederativa) this.setState({ entidadFederativaIsInvalid: true })
            if (!postalCode) this.setState({ postalCodeIsInvalid: true })
            return
        }

        // Check PART_4
        if (formController === 4 && (!creditType || !creditAmount || !propertyValue || creditTypeIsInvalid || creditAmountIsInvalid || propertyValueIsInvalid)) {
            if (!creditType) this.setState({ creditTypeIsInvalid: true })
            if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
            if (!propertyValue) this.setState({ propertyValueIsInvalid: true })
            return
        }

        // Check PART_5
        if (formController === 5 && (!sourceOfResources || !verifiableIncome || !jobDescription
            || sourceOfResourcesIsInvalid || verifiableIncomeIsInvalid || jobDescriptionIsInvalid)) {
            if (!sourceOfResources) this.setState({ sourceOfResourcesIsInvalid: true })
            if (!verifiableIncome) this.setState({ verifiableIncomeIsInvalid: true })
            if (!jobDescription) this.setState({ jobDescriptionIsInvalid: true })
            return
        }

        // Check PART_6
        if (formController === 6 && (!nip || nipIsInvalid)) {
            if (!nip) this.setState({ nipIsInvalid: true })
            return
        }




        this.setState({ formController: formController + 1 })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { confirmNIP, confirmNIPIsInvalid, acceptTerms, acceptTermsIsInvalid } = this.state
        // Check PART_7
        if (!confirmNIP || confirmNIPIsInvalid || !acceptTerms || acceptTermsIsInvalid) {
            if (!confirmNIP) this.setState({ confirmNIPIsInvalid: true })
            if (!acceptTerms) this.setState({ acceptTermsIsInvalid: true })
            return
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    render() {
        const { formController, totalFormSections, loading } = this.state
        const progress = (formController / totalFormSections * 100).toFixed(1)


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
                                <div className="form-subtitle">
                                    {
                                        formController === 1 ? 'Pre-calificación' :
                                            formController === 2 ? 'Datos Personales' :
                                                formController === 3 ? 'Dirección' :
                                                    formController === 4 ? 'Datos del Crédito' :
                                                        formController === 5 ? 'Tipo de Actividad' :
                                                            formController === 6 ? 'Autorización Círculo de Crédito' :
                                                                formController === 7 ? 'Autorización de Consulta de Historial Crediticio' : ''
                                    }
                                </div>
                                <div className="form-subtitle">{progress}%</div>
                            </div>

                            <img className="card-img-top" src="https://s3-us-west-2.amazonaws.com/userdata123/www/imagefields/59450/59450072.jpg?_=1594321348260" />
                            <div className="card-body">
                                <div className="form-title" style={{ marginTop: '5px' }}>

                                    {
                                        formController === 1 ? 'Pre-calificador Hipotecario' :
                                            formController === 2 ? 'Datos Personales' :
                                                formController === 3 ? 'Dirección' :
                                                    formController === 4 ? 'Datos del Crédito' :
                                                        formController === 5 ? 'Tipo de Actividad' :
                                                            formController === 6 ? 'Autorización Círculo de Crédito' :
                                                                formController === 7 ? 'Autorización de Consulta de Historial Crediticio' : ''
                                    }
                                </div>


                                <form action="">
                                    {
                                        formController === 1 && (
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
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 2 && (
                                            <Fragment>
                                                <div className="form-group mt-4">
                                                    <label className="form-label">Nombre<span className="form-required-symbol">*</span></label>
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
                                                    <label className="form-label">Apellido Paterno<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.lastName} onChange={this.handleLastNameChange} type="text" className={this.state.lastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        Este campo es obligatorio.
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Apellido Materno<span className="form-required-symbol">*</span></label>
                                                    <input value={this.state.secondLastName} onChange={this.handleSecondLastNameChange} type="text" className={this.state.secondLastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        Este campo es obligatorio.
                                                    </div>
                                                </div>
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
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 3 && (
                                            <Fragment>


                                                {/* <div className="form-group">
                                                    <label className="form-label">RFC</label>
                                                    <input value={this.state.rfc} onChange={this.handleRFCChange} maxLength="10" type="number" className={this.state.rfcIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.rfcErrorMsg}
                                                    </div>
                                                </div> */}

                                                {/* Domicilio */}
                                                <div className="form-group mt-4">
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                                            <label className="form-label">Calle<span className="form-required-symbol">*</span></label>
                                                            <input value={this.state.calle} onChange={this.handleCalleChange} type="text" className={this.state.calleIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                            <div className="invalid-feedback">
                                                                {this.state.calleErrorMsg}
                                                            </div>
                                                        </div>
                                                        <div style={{ width: '25%' }}>
                                                            <label className="form-label">No. Exterior<span className="form-required-symbol">*</span></label>
                                                            <input value={this.state.numeroExt} onChange={this.handleNumeroExtChange} type="text" className={this.state.numeroExtIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="form-group">

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
                                                    <select value={this.state.entidadFederativa} onChange={this.handleEntidadFederativaChange} className={this.state.entidadFederativaIsInvalid ? 'form-control is-invalid' : "form-control"}>
                                                        <option value="">Seleccionar</option>
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
                                                    <div className="invalid-feedback">
                                                        {this.state.entidadFederativaErrorMsg}
                                                    </div>
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
                                        formController === 4 && (
                                            <Fragment>
                                                <div className="form-group mt-4">
                                                    <label className="form-label">Tipo de crédito<span className="form-required-symbol">*</span></label>
                                                    <select value={this.state.creditType} onChange={this.handleCreditTypeChange} className={this.state.creditTypeIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                                                        <option value="">Seleccionar</option>
                                                        <option value="Compra de Casa">Compra de Casa</option>
                                                        <option value="Construcción">Construcción</option>
                                                        <option value="Remodelación">Remodelación</option>
                                                        <option value="Liquidez">Liquidez</option>
                                                        <option value="Terreno">Terreno</option>
                                                        <option value="Terreno Construcción">Terreno+Construcción</option>
                                                        <option value="Liquidez (Pago a pasivos)">Liquidez (Pago a pasivos)</option>
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
                                                <div className="form-group">
                                                    <label className="form-label">Valor de la propiedad<span className="form-required-symbol">*</span></label>
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
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 5 && (
                                            <Fragment>
                                                <div className="form-group mt-4">
                                                    <label className="form-label">¿De dónde provienen la mayor parte de tus ingresos?<span className="form-required-symbol">*</span></label>
                                                    <select value={this.state.sourceOfResources} onChange={this.handleSourceOfResourcesChange} className={this.state.sourceOfResourcesIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                                                        <option value="">Seleccionar</option>
                                                        <option value="Compra de Casa">Compra de Casa</option>
                                                        <option value="Construcción">Construcción</option>
                                                        <option value="Remodelación">Remodelación</option>
                                                        <option value="Liquidez">Liquidez</option>
                                                        <option value="Terreno">Terreno</option>
                                                        <option value="Terreno Construcción">Terreno+Construcción</option>
                                                        <option value="Liquidez (Pago a pasivos)">Liquidez (Pago a pasivos)</option>
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
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 6 && (
                                            <Fragment>
                                                <div className="form-description mt-2">El cliente autoriza a SwayLending la utilización de medios electrónicos de autenticación tales como el NIP.</div>
                                                <div className="form-description mt-2" style={{ color: 'rgb(0, 0, 128)', fontWeight: '500' }}>Hemos enviado un NIP de 4 dígitos como mensaje de texto (SMS) a tu teléfono celular <span style={{ fontWeight: 'bold' }}>{this.state.phone}</span></div>
                                                <div className="row mt-2 mb-1">
                                                    <div className="col-xs-6 offset-xs-3 col-sm-6 offset-sm-3 col-md-6 offset-md-3">
                                                        <label className="form-label mt-4">NIP<span className="form-required-symbol">*</span></label>
                                                        <input value={this.state.nip} onChange={this.handleNIPChange} type="number" className={this.state.nipIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                        <div className="invalid-feedback">
                                                            {this.state.nipErrorMsg}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === 7 && (
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
                                                        <div className="form-check checkbox-warning-filled">
                                                            {/* <input style={{width:'18px', height:'18px'}} checked={this.state.acceptTerms} onChange={this.handleAcceptTermsChange} type="checkbox" className="form-check-input filled-in"></input> */}
                                                            <Checkbox className="custom-checkbox" checked={this.state.acceptTerms} onChange={this.handleAcceptTermsChange} />
                                                            <label className="form-check-label form-label ml-2" style={{ color: this.state.acceptTermsIsInvalid ? '#dc3545' : '#4c4c4c' }}>Acepto la consulta a mi Buró de Crédito</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    }

                                    {
                                        formController === totalFormSections
                                            ?
                                            <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                                                    <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <button onClick={this.handleSubmitBtn} className="btn btn-dark btn-form">Simular mi crédito</button>
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
                                </form>
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