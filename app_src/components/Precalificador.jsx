import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from './Loading'
import LeadForm from './LeadForm'
import UserIdentificationForm from './UserIdentificationForm'
import AddressForm from './AddressForm'
import RFCCURPForm from './RFCCURPForm'
import CreditTypeForm from './CreditTypeForm'
import UserIncomeForm from './UserIncomeForm'
import NipForm from './NipForm'
import ConfirmNipForm from './ConfirmNipForm'

// Actions
import { setFormID } from '../actions/formController'

// API
import { createCreditRequest, checkCreditRequestNIP } from '../utils/api'

// Libraries
import { Line } from 'rc-progress'

class Precalificador extends Component {
    state = {
        totalFormSections: 8,
        loading: true,
    }

    componentDidMount() {
        document.title = "Precalificador | Swaydo"
        const { formController, dispatch } = this.props

        // dispatch(setFormID(2))

        this.setState({
            // formController: 2,
            formController,
            loading: false,
        })
    }

    render() {
        const { totalFormSections, loading } = this.state
        const { formController } = this.props
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
                                                formController === 3 ? 'Confirma tu CURP y RFC' :
                                                    formController === 4 ? 'Dirección' :
                                                        formController === 5 ? 'Datos del Crédito' :
                                                            formController === 6 ? 'Tipo de Actividad' :
                                                                formController === 7 ? 'Autorización Círculo de Crédito' :
                                                                    formController === 8 ? 'Autorización de Consulta de Historial Crediticio' : ''
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
                                                formController === 3 ? 'Confirma tu CURP y RFC' :
                                                    formController === 4 ? 'Dirección' :
                                                        formController === 5 ? 'Datos del Crédito' :
                                                            formController === 6 ? 'Tipo de Actividad' :
                                                                formController === 7 ? 'Autorización Círculo de Crédito' :
                                                                    formController === 8 ? 'Autorización de Consulta de Historial Crediticio' : ''
                                    }
                                </div>
                                <form action="">
                                    {formController === 1 && < LeadForm />}
                                    {formController === 2 && <UserIdentificationForm />}
                                    {formController === 3 && <RFCCURPForm />}
                                    {formController === 4 && <AddressForm />}
                                    {formController === 5 && <CreditTypeForm />}
                                    {formController === 6 && <UserIncomeForm />}
                                    {formController === 7 && <NipForm />}
                                    {formController === 8 && <ConfirmNipForm />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ creditRequest, formController }) {
    return {
        creditRequest,
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(Precalificador)