import React from 'react';
import Company from '../components/Company';
import AppBar from '../components/AppBar';
import StatusBar from '../components/StatusBar';

export default function Home() {
  return (
    <>
      <AppBar />
      <Company />
      <StatusBar />
    </>  
  )
}