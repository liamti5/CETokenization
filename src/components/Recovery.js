import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const Recover = ({ web3, account, contract }) => {
    let [amount, setAmount] = useState("");
    let [price, setPrice] = useState("");


    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleStart = async () => {
        try {
            await contract.methods.recover(price, amount).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Recovery</h1>
            <TextField
                id="outlined-multiline-static"
                label="Input old address"
                defaultValue=""
                variant="filled"
                value={amount}
                onChange={handleAmountChange}
                className={styles.customTextField}
            />
            <TextField
                id="outlined-multiline-static"
                label="Input new address"
                defaultValue=""
                variant="filled"
                value={price}
                onChange={handlePriceChange}
                className={styles.customTextField}
                sx = {{
                    mt: 1,
                }}
            />
            <div className={styles.flexButton}>
                <Button 
                    variant="contained"
                    onClick={handleStart}
                    className={styles.button}
                    sx={{ 
                        mt: 1,
                        width: '100%',
                    }}>
                        Set recovery address
                </Button>
            </div>
        </div>
        
    );
};

export default Recover;