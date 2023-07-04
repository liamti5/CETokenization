import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/CompanyBox.module.css';

const Destroy = ({ web3, account, contract }) => {
    var [price, setPrice] = useState(0);

    const handleChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSetPrice = async () => {
        if (price < 0) return;
        try {
            await contract.methods.destroy(price).send({ from: account });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={styles.container}>
                <h1>Destroy</h1>
                <TextField
                    id="filled-number"
                    label="Amount of shares"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={price}
                    onChange={handleChange}
                    className={styles.customTextField}
                />
                <div className={styles.flexButton}>
                    <Button 
                        variant="contained"
                        onClick={handleSetPrice}
                        className={styles.button}
                        sx={{ 
                            width: '100%', 
                            mt: 1,
                        }}>
                            Destroy
                    </Button>
                </div>
        </div>
    );
};

export default Destroy;