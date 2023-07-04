import React, { useState, useEffect } from 'react';
import useWeb3 from '../hooks/useWeb3';  // adjust the path as necessary

const StatusBar = () => {
    const { web3, account, contract } = useWeb3();
    
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-around',
        }}>
            <p>{`Current Contract Address: ${contract ? contract.options.address : 'Contract not loaded'}`}</p>
        </div>
    );
};

export default StatusBar;
