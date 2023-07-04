import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const Transfer = ({ web3, account, contract }) => {
    let [receiver, setReceiver] = useState("");
    let [amount, setAmount] = useState("");

    const handleSetReceiver = (e) => {
            setReceiver(e.target.value);
        };

    const handleSetAmount = (e) => {
        setAmount(e.target.value);
    };    

    const handleSubmit = async () => {
        if (amount <= 0 || receiver == "") return;
        try {
            amount = web3.utils.toWei(amount, 'ether');
            await contract.methods.transfer(receiver, amount).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div className={styles.container}>
                <h1>Transfer</h1>
                <TextField
                    id="outlined-multiline-static"
                    label="Receiver"
                    variant="filled"
                    value={receiver}
                    onChange={handleSetReceiver}
                    className={styles.customTextField}
                />
                <TextField
                    id="filled-number"
                    label="Amount"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={amount}
                    onChange={handleSetAmount}
                    className={styles.customTextField}
                    sx = {{
                        mt: 1,
                    }}
                />
                <div className={styles.flexButton}>
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}
                        className={styles.button}
                        sx={{ 
                            width: '100%', 
                            mt: 1,
                        }}>
                            transfer
                    </Button>
                </div>
        </div>
    );
};

export default Transfer;