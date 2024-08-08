import React, { Fragment, useEffect, useState } from "react"
import Manupage from "../Menupage/Menupage";
import "/src/css/comman.css";
import '../../Component/Transation/TransationNode.css'
import ITransationNode from '../../Interface/ITransationNode';
import TransationNode from "../Transation/TransationNode";

const MainPage : React.FC<{}> =()=>{

    const [ItemsArray,SetItemArray] = useState<ITransationNode[]>([]);
    //Array template
    const [ItemTemplate,SetItemTemplate] = useState<JSX.Element[]>()

    useEffect(()=>{
        SetItemTemplate(ItemsArray.map((item,index) => 
                <TransationNode Increment={Increment} 
                                Decrement={Decrement} 
                                key={index} ItemName={item.ItemName} 
                                Qty={item.Qty} UnitPrice={item.UnitPrice} Isvoid={false}></TransationNode>))
    
    },[ItemsArray])

    const AddItem = (e:any) =>
    {
            
            let Items = ItemsArray.find(item => item.ItemName == e);
            if(Items == undefined || ItemsArray.length <=0)
            {
                console.log(e);
                SetItemArray(val => [...val,{ItemName:e,Qty:1,UnitPrice:200,Isvoid:false,Decrement:Decrement,Increment:Increment}])
                console.log(ItemsArray)
            }
            else{
                 let index = ItemsArray.indexOf(Items);
                 Items.Qty++;
                 ItemsArray.splice(index,1,Items);
                 SetItemArray(a => a = [...ItemsArray]);
               
            }

            
    }

    function Increment(ItemName:string)
    {
       
        let Items = ItemsArray.find(item => item.ItemName == ItemName);
        if(Items)
        {
            let index = ItemsArray.indexOf(Items);
            Items.Qty++;
            ItemsArray.splice(index,1,Items);
            SetItemArray([...ItemsArray]);
        }

    }
    
    function Decrement(ItemName:string)
    {
        let Items = ItemsArray.find(item => item.ItemName == ItemName);
        if(Items && Items.Qty > 1)
        {
            let index = ItemsArray.indexOf(Items);
            Items.Qty--;
            ItemsArray.splice(index,1,Items);
            SetItemArray([...ItemsArray]);
        }
    }

    function MenuClick(Menu:String)
    {
        switch(Menu)
        {
            case "Pay":
            break;

            default:
                AddItem(Menu)
            break;
        }
    }



    return <Fragment>
         <div className="continer">
        <div className="header-panel">
        </div>
        <div className="transation-panel">
            <div className="transanion-header">
                <label>Transation No</label>
                <label>4893024897988</label>
            </div>
            <div className="transation-body">

            {/* List Of Transations  */}
            {ItemTemplate}
            
            </div>
      
            <div className="transanion-footer">
                <label>Total</label>
                <label id="total">$200.00</label>
            </div>
        </div>
       
         <Manupage OnMenuClick={MenuClick}  />
     
          

        <div className="footer-panel"></div>
    </div>
    </Fragment>
};

export default MainPage;