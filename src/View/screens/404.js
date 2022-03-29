import React from 'react';



const Error404 = () => {

    const Container = {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    }
    const image = {
        width: '5rem',
        height: 'auto',
        padding: '20px 0',
        
    }

  return (
    <div style={Container}>
      <img style={image} src="https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/resources%2Fwebsite-assets%2Floading.svg?alt=media&token=668b3541-a1e3-4b21-83f8-3674ab1589f6" alt="logo" />
      <h1 style={{fontSize: '5rem', fontWeight: '800'}}>404 ERROR</h1>
      <p style={{fontSize: '2rem', color: '#dd5566', marginTop: '1.5rem'}}>Page was not found!</p>
    </div>
  );
}

export default Error404;
