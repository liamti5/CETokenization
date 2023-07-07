import React from 'react';
import Company from '../components/Company';
import AppBar from '../components/AppBar';
import StatusBar from '../components/StatusBar';
import useWeb3 from '../hooks/useWeb3';
import Loading from '../components/Loading';

export default function Home() {
  const { web3, account, contract, owners } = useWeb3();

  const isLoading = !owners; // Check if owners data is not yet available

  if (isLoading) {
    return <Loading />; // Render a loading page while owners data is loading
  }

  return (
    <>
      <AppBar />
      <Company />
      <StatusBar />
    </>  
  )
}