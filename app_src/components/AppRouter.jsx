import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Simulator from './Simulator'
import Precalificador from './Precalificador'

class AppRouter extends Component {
    render() {
        const { match, auth } = this.props
        
        return (
            <Fragment>                
                <Route path='/simulador' component={Simulator} exact />
                <Route path='/precalificador' component={Precalificador} /> 
            </Fragment>
        )
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = rest
    return (
        <Route
            {...rest}
            render={props =>
                auth !== null ? (
                    <Component {...props} />
                )
                    : (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: props.location.pathname }
                            }}
                        />
                    )
            }
        />
    )
}

function mapStateToProps({ auth }) {
    return {

        auth
    }
}

export default connect(mapStateToProps)(AppRouter)

