import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const ChangeDeputy = ({ web3, account, contract }) => {
    const [msg, setMsg] = useState("Enter your announcement here");

    
    const handleChange = (e) => {
        setMsg(e.target.value);
    };
    
    const handleAnnouncement = async () => {
        try {
            await contract.methods.changeDeputy(msg).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h1>Change Deputy</h1>
            <TextField
                id="outlined-multiline-static"
                label="Input new deputy address"
                defaultValue=""
                className={styles.customTextField}
                sx={{ 
                    width: '100%', 
                }}
                />
            <div className={styles.flexButton}>
                <Button 
                    variant="contained"
                    onClick={handleAnnouncement}
                    className={styles.button}
                    sx={{ 
                        width: '100%', 
                        mt: 1,
                    }}>
                        Change Deputy
                </Button>
            </div>
        </div>
    );
};

export default ChangeDeputy;