import { useState, useEffect } from 'react';
import { useEthereumAddress } from '../contexts/EthereumAddressContext';
import Web3 from 'web3';
import abi from '../contracts/abi.json';

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [owners, setOwners] = useState(null);
  const { setEthereumAddress } = useEthereumAddress();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const loadWeb3AndBlockchainData = async () => {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const web3 = window.web3;
        setWeb3(web3);

        // Load the current user's account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setEthereumAddress(accounts[0]);

        // Load the smart contract
        const contractAddress = '0xF70a640CDeDd456CdDaa51205A6Bc1bB9108EC3B';
        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);

        // Load the owners
        const issuers = await contract.methods._issuer().call();
        const deputies = await contract.methods._deputy().call();
        const remove = ["0x5a88f1E531916b681b399C33F519b7E2E54b5213"]
        const owners = [...issuers, ...deputies, ...remove];
        setOwners(owners);
      };
      loadWeb3AndBlockchainData();
    } else {
      console.log('Please install MetaMask!');
    }
  }, []);

  return { web3, account, contract, owners };
};

export default useWeb3;
