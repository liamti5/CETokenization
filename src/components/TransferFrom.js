import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const TransferFrom = ({ web3, account, contract }) => {
    let [sender, setSender] = useState(""); 
    let [receiver, setReceiver] = useState("");
    let [amount, setAmount] = useState("");

    const handleSetSender = (e) => {
        setSender(e.target.value);
    };

    const handleSetReceiver = (e) => {
        setReceiver(e.target.value);
    };

    const handleSetAmount = (e) => {
        setAmount(e.target.value);
    };    

    const handleSubmit = async () => {
        if (amount <= 0 || sender == "" || receiver == "") return;
        try {
            amount = web3.utils.toWei(amount, 'ether');
            await contract.methods.transferFrom(sender, receiver, amount).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div className={styles.container}>
                <h1>Transfer From</h1>
                <TextField
                    id="outlined-multiline-static"
                    label="From account"
                    variant="filled"
                    value={sender}
                    onChange={handleSetSender}
                    className={styles.customTextField}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="To account"
                    variant="filled"
                    value={receiver}
                    onChange={handleSetReceiver}
                    className={styles.customTextField}
                    sx = {{
                        mt: 1,
                    }}
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

export default TransferFrom;