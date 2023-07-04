import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const Raise = ({ web3, account, contract }) => {
    var [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleBurn = async () => {
        if (amount <= 0) return;
        try {
            await contract.methods.raise(amount).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box>
            <div className={styles.container}>
                <h1>Raise</h1>
                <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={amount}
                    onChange={handleChange}
                    className={styles.customTextField}
                />
                <div className={styles.flexButton}>
                    <Button 
                        variant="contained"
                        onClick={handleBurn}
                        className={styles.button}
                        sx={{ 
                            width: { xs: '100%' }, 
                            mt: 1                         
                        }}>
                            Raise
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default Raise;