import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import InstrumentForm from '../components/InstrumentForm';

const Instruments = props => {
    const history = useHistory();

    const {_id} = useParams();

    const handleDashboardClick = event => {
        event.preventDefault();
        history.push("/dashboard/"+_id)
    }

    return(
        <div>
            <h1>What instrument(s) do you play?</h1>
            <InstrumentForm id={_id}/>
            <button className="btn btn-primary" onClick={handleDashboardClick}>Proceed to Dashboard</button>
        </div>
    )
}

export default Instruments;