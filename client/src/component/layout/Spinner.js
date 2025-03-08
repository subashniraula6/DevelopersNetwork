import React from 'react'
import spinner from '../../img/loading.gif'

const Spinner = () => {
    return (
        <>
           <img src={spinner} style={{width: '70px', marginLeft: '30vw', marginTop: '30vh'}} alt="Loading...."/> 
        </>
    )
}
export default Spinner