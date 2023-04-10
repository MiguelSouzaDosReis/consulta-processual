
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext.js';

function Provider({ children }) {

    const [searchTerm, setSearchTerm] = useState("")
    const [document, setDocument] = useState([]);


    const context = {
        searchTerm,
        setSearchTerm,
        document,
        setDocument
    };

    return (
        <MyContext.Provider value={ context }>
            { children }
        </MyContext.Provider>
    );
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Provider;