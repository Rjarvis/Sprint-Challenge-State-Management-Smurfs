import React from 'react';
import PropTypes from 'prop-types'

const Smurf = ({smurfs}) => (
    <ul>
        {smurfs.map((smurf, i) =>
            <li key={i}>
                {smurf.id}: 
                {smurf.name}: 
                {smurf.age}: 
                {smurf.height}: 
            </li>
        )}
    </ul>
)

Smurf.PropTypes = {
    smurfs: PropTypes.array.isRequired
}

export default Smurf