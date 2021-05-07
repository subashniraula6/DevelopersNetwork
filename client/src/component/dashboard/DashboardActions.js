import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from '@material-ui/core'

const DashboardActions = () => {
    return (
        <div className="dash-buttons">

            <ButtonGroup color='primary' variant='contained' size='small'>
                <Button >
                    <Link to="/edit-profile" style={{'color': 'white'}}>
                        <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
                </Button>
                <Button >

                    <Link to="/add-experience" style={{'color': 'white'}}>
                        <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
                </Button>
                <Button >
                    <Link to="/add-education" style={{'color': 'white'}}>
                        <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>
                </Button>
            </ButtonGroup>

        </div>
    )
}
export default DashboardActions;