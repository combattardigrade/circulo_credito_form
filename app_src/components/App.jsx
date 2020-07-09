import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// components
import Loading from './Loading'

// App Router
import AppRouter from './AppRouter'


class App extends Component {

    componentDidMount() {
        //this.props.dispatch(handleInitialData())
    }

    render() {

        const { loading, } = this.props

        return (
            <Router basename='/swaydo'>
                <Fragment>
                    {
                        loading === true
                            ? <Loading />
                            :
                            <Fragment>
                                <Route path='/' component={AppRouter} />


                            </Fragment>
                    }
                </Fragment>
            </Router>
        )
    }
}


function mapStateToProps({ loading }) {
    return {
        loading
    }
}

export default connect(mapStateToProps)(App)