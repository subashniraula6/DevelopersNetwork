import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {ButtonGroup} from '@material-ui/core'
import { Button } from '@material-ui/core'

const Landing = ({isAuthenticated}) => {
    
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Network</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
          </p>
                    
                    <ButtonGroup variant='contained' color="primary" size='large' aria-label="contained primary button group">
                        <Button><Link to="/register" style={{'color': 'white'}}>Sign Up</Link></Button>
                        <Button color="secondary"><Link to="/login" style={{'color': 'white'}}>Login</Link></Button>
                    </ButtonGroup>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Landing);