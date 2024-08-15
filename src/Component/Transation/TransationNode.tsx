import './TransationNode.css'
import "/src/css/comman.css";
import ITransationNode from '../../Interface/ITransationNode';

const TransationNode:React.FC<ITransationNode>=({ItemName,Qty,Increment,Decrement,CurrentUnitPrice})=>{
  
    return  (<div className="transationnode">
    <div className="item">{ItemName}</div>
    <div className="qty">
        <button  onClick={() => Increment(ItemName)}  id="increment">+</button>
        {Qty}
        <button  onClick={() => Decrement(ItemName)} id="decrement">-</button>
    </div>
    <div className="uintprice">{CurrentUnitPrice}</div>
    </div>)
}

export default TransationNode;