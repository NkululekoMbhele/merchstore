import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "./Provider";
import Navbar from "./View/components/navbar/Navbar";

function Store() {
  const [cartCount, setCartCount] = useState(0);
  const [state, dispatch] = useContext(Context);
  function increment() {
    dispatch({
      type: "INCREMENT",
      payload: 1,
    });
  }

  function decrement() {
    dispatch({
      type: "DECREMENT",
      count: 1,
    });
  }
  return (
    <div>
      <h4>Store</h4>
      <p>{state.count}</p>
      <button onClick={increment}>+</button>&nbsp;
      <button onClick={decrement}>-</button>
      
    </div>
  );
}

export default Store;
