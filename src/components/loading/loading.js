import React from 'react';

import load from '../../assets/people/alfa-loader.gif'

 const Loading = () => {
    return (
        <div >
            <img src = {load} alt = "loading..." style = {{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '100px'}}/>
            
        </div>
    )
}

export default Loading;

