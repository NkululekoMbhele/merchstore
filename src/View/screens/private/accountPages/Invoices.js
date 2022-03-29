import React, {useContext} from 'react';
import {AuthContext} from '../../../../AuthProvider'


const invoicesContainer = {
    padding: '0.5rem 5vw'
}


const Invoices = () => {
    const currentUser = useContext(AuthContext)
  return (
    <div>
      <h1>Invoices</h1>
    </div>
  );
}

export default Invoices;
