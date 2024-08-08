import './TransationNode.css'
import ITransationNode from '../../Interface/ITransationNode';
import { useEffect, useState } from 'react';



const TransationNode:React.FC<ITransationNode>=({ItemName,Qty,Increment,Decrement,UnitPrice})=>{
  
    return  (<div className="transationnode">
    <div className="item">{ItemName}</div>
    <div className="qty">
        <button onClick={() => Increment(ItemName)}  id="increment">+</button>
        {Qty}
        <button onClick={() => Decrement(ItemName)} id="decrement">-</button>
    </div>
    <div className="uintprice">{UnitPrice}</div>
    </div>)
}

export default TransationNode;