import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import './SearchBox.style.css'


function SearchBox() {
  const options = [
      {
          value: 'all',
          label: 'Search In All Categories'
        }, 
      {
          value: 'templates',
          label: 'Templates'
        }, 
      {
          value: 'designAssets',
          label: 'Design Assets'
        }, 
      {
          value: 'stockPhotos',
          label: 'Stock Photos'
        }, 
      {
          value: 'guides',
          label: 'Guide Books'
        }, 
];
  const defaultOption = options[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [option, setOption] = useState("");


  function handleSubmit() {
    console.log(`submitted ${searchTerm} on option ${option}`);
  }

  return (
    <div className="search-box" >
      <input
      placeholder="Search for products..."
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setOption(e.target.value)} name="search-category" id="search-category" >
        {
            options.map((item, i) => {
                return <option key={i} value={item.value}>{item.label}</option>
            })
            }
      </select>
      <div className="search-btn-container">
      <FontAwesomeIcon onClick={handleSubmit} className="search-btn" icon={faSearch}/>
      </div>
    </div>
  );
}

export default SearchBox;
