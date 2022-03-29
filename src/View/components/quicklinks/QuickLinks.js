import React from 'react';
import {Link} from 'react-router-dom'

function QuickLinks() {

    const linksBox = {
        width: '100%',
        padding: '1.2rem 0',
    }
    const linkItem = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ddd',
        border: '1px solid #003566',
        borderRight: 'none',
        color: '#111',
        textDecoration: 'none',
        fontSize: '0.8rem',
        display:  'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
    const linkItemLast = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ddd',
        border: '1px solid #003566',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        color: '#111',
        textDecoration: 'none',
        fontSize: '0.8rem',
        display:  'flex',
        justifyContent: 'center',
        alignItems: 'center',
   
    }
    const linkItemFirst = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ddd',
        border: '1px solid #003566',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        color: '#111',
        textDecoration: 'none',
        fontSize: '0.8rem',
        display:  'flex',
        justifyContent: 'center',
        alignItems: 'center',
   
    }
    const linkList = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    }
    const links = [
        "Deals and Promotions",
        "Fresh Products",
        "Trending",
        "Photos",
        "Cape Town",
        "Videos",
        "NFTs Art"
    ];
    function slug(text) {
        return text.trim().lowerCase().replace(/\s+/g, '-');
    }
  return (
    <div style={linksBox}>
        <div style={linkList}>

        
      {
          links.map((link, i) => {
              let slugTerm = slug(link);
              return (
                  (i===0) ? 
                <a href="/link" key={i} style={linkItemFirst}>{link}</a> :
                <a href="/link" key={i} style={(i===links.length-1) ? linkItemLast : linkItem}>{link}</a> 
              )
              
          })
      }
    </div>
    </div>
  );
}

export default QuickLinks;
