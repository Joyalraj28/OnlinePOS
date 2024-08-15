import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react"
import Manupage from "../Menupage/Menupage";
import "/src/css/comman.css";
import '../../Component/Transation/TransationNode.css'
import ITransationNode from '../../Interface/ITransationNode';
import TransationNode from "../Transation/TransationNode";
import Popup, { IPopup } from "../Popup/Popup";
import dummy from '../../dummy';
import ReceiptFormat from "../../ReceiptFormat";

const MainPage : React.FC<{}> =()=>{

    //dummy value
    const dummyobj = new dummy();

    //list of popup
    const [PopupArray,SetpopupArray] = useState<IPopup[]>([])

    //Show popup
    const ShowPopup = (popup:IPopup) =>{
       SetpopupArray(pripopup => pripopup = [...PopupArray,popup]);
    }

    //Refrash popup
    function RefrashPopup()
    {
        SetPopupTemplate(PopupArray.map((popup,index) =>
        {
           
           return  <Popup
                key={index}
                funcName={popup.funcName} 
                Close={popup.Close}
                children={popup.children}
                IsVisble={popup.IsVisble}/>
        }
            ))
    }
   
    //Close popup
    const ClosePopup = (e:string)=>{
        
        const selectpopup = PopupArray.find(popup => popup.funcName==e);
        if(selectpopup)
        {
          const index:number = PopupArray.indexOf(selectpopup);
          PopupArray.splice(index,1);
        }
       
        SetpopupArray(pripopup => pripopup = [...PopupArray])

    }

    //list of item array
    const [ItemsArray,SetItemArray] = useState<ITransationNode[]>([]);
    //barcode state
    const [Barcode,SetBarcode] = useState<number>()

    //barcode input
    const barcodeinput = useRef<any>(null);

    //transation status
    const TransStatus = useRef<any>(null);
    const [TranstaionText,SetTransationText] = useState('');

    //Pay popup
    const [IsVisble,SetIsVisble] = useState<string>("none")
    // Total
    const [Total,SetTotal] = useState<number>(0)
    
    //Paid
    const [Paid,SetPaid] = React.useState<number>(0);

    //Array template
    const [ItemTemplate,SetItemTemplate] = useState<JSX.Element[]>()
    const [PopupTemplate,SetPopupTemplate] = useState<JSX.Element[]>()

    //Update for array value is change
    useEffect(()=>{
        let total:number = 0;
        SetItemTemplate(ItemsArray.map((item,index) =>{ 
                item.CurrentUnitPrice = item.Qty*item.UnitPrice
                total+=item.CurrentUnitPrice;
               return <TransationNode Increment={Increment} 
                                CurrentUnitPrice={item.CurrentUnitPrice}
                                Decrement={Decrement} 
                                key={index} ItemName={item.ItemName} 
                                Qty={item.Qty} UnitPrice={item.UnitPrice} Isvoid={false}></TransationNode>}))
    
            SetTotal(total)
        },[ItemsArray])

    //Update pop array
    useEffect(()=>{
        RefrashPopup()
    },[PopupArray])

    // Add Item for transation
    const AddItem = (e:any) =>
    {
            let Items = ItemsArray.find(item => item.ItemName == e);
            if(Items == undefined || ItemsArray.length <=0)
            {
                let SelectItem = dummyobj.MenuArray.find(item => item.ItemName == e);

                if(SelectItem)
                {
                    SetItemArray(val => [...val,{ItemName:e,
                     Qty:1,CurrentUnitPrice:SelectItem?.UnitPrice,
                     UnitPrice:SelectItem?.UnitPrice,Isvoid:false,
                     Decrement:Decrement,Increment:Increment}])
                }
                else
                {
                    alert(e+" Item not found");
                }
            }
            else{
                 let index = ItemsArray.indexOf(Items);
                 Items.Qty++;
                 ItemsArray.splice(index,1,Items);
                 SetItemArray(a => a = [...ItemsArray]);
               
            }

            
    }

    //Increment item
    function Increment(ItemName:string)
    {
        let Items = ItemsArray.find(item => item.ItemName == ItemName);
        if(Items)
        {
            let index = ItemsArray.indexOf(Items);
            Items.Qty++;
            ItemsArray.splice(index,1,Items);
            SetItemArray(items => items =[...ItemsArray]);
        }

    }
    
    //Decrement item
    function Decrement(ItemName:string)
    {
        let Items = ItemsArray.find(item => item.ItemName == ItemName);
        if(Items && Items.Qty > 1)
        {
            let index = ItemsArray.indexOf(Items);
            Items.Qty--;
            ItemsArray.splice(index,1,Items);
            SetItemArray(items => items =[...ItemsArray]);
        }
    }

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value === '' ? 0 : Number(event.target.value);
        SetPaid(value);
       
     }

     const paypopup = (<div  style={{display:IsVisble}} className="popup">
     <div className="popupbox">
      <div className="topbar">
          <button onClick={() => SetIsVisble("none")}  className="closebtn">X</button>
      </div>
      <div className="popupbody">
      <form onSubmit={(event:React.FormEvent<HTMLFormElement>)=>{
                             event.preventDefault();

                             if(Paid <=0)
                             {
                                alert("Invalid amount");
                             }
                             if(Total>Paid)
                             {
                                alert("Total amount "+Total+" Rupees so more "+(Total-Paid)+" Rupees amount required")
                             }
                             else{
                                    ShowStatus("#3FA2F6","Transaction has processing",1000);
                                    SetIsVisble("none")
                                    Print();
                                    ShowStatus("#9CDBA6","Successfully paid the payment",1000);
                               
                             }
                         }} method="post">

        <label htmlFor="Total">Total : {Total}</label>       
        <input 
              onChange={handleInputChange}
              name="paid"
              type="number"
              value={Paid}
              autoFocus /> 
                     <button type="submit">Pay</button>
                </form>
              </div>
     
                 </div>
                      </div>)

    //  ShowPopup(
    //     {
    //         children: 
    //         <form onSubmit={(event:React.FormEvent<HTMLFormElement>)=>{
    //             event.preventDefault();
           
    //         }} method="post">
    //             <input 
    //              onChange={handleInputChange}
    //              name="paid"
    //              type="number"
    //              value={Paid}
    //             autoFocus />
                
    //             <button type="submit">Pay</button>
    //         </form>,
    //         Close: ClosePopup,
    //         funcName:"Pay",
    //         IsVisble:true
            
    //         }
    // );

    //Menu click event
    

    //Show Status
    function ShowStatus(Color:any,Text:string,Timeout:number)
    {
        TransStatus.current.style.backgroundColor = Color;
        TransStatus.current.style.visibility = 'visible';
        SetTransationText(Text);

        setTimeout(()=>{
        TransStatus.current.style.visibility = 'collapse';
        SetTransationText("");
        SetItemArray([]);
        },Timeout)
    }

    
    //Print receipt
    function Print()
    {
        ShowStatus("#3FA2F6","Print receipt",10000);
        let ReceiptHeader = new ReceiptFormat(0)
        ReceiptHeader.AddTitle("Online POS")
                   .AddTitle("Jaffna,")
                   .AddTitle("Sri Lanka.")
        

        localStorage.setItem("ReceiptHeader",ReceiptHeader.GetFormat());
        localStorage.setItem("ReceiptBody",JSON.stringify(ItemsArray));
        localStorage.setItem("ReceiptFooter",new ReceiptFormat()
        .AddTitle("Total : "+Total+".00")
        .AddTitle("Paid : "+Paid+".00")
        .GetFormat())

        window.open("/print",'_print');
    }
   
    function MenuClick(Menu:String)
    {
        switch(Menu)
        {
            //Funcation
            case "Pay":
               SetPaid(Total);
              
               SetIsVisble("block");
            break;

            case "Void":

                if(ItemsArray.length > 0)
                {

                let conf = confirm("Do you whan to void the transation ?")
                if(conf)
                {
                 ShowStatus("#ef6363","Void",10000);
                }
            }
            else{
                alert("No Transation found");
            }
            break;

            case "Print receipt":
                if(ItemsArray.length > 0)
                {
                    Print();
                    
                }
                else{
                    alert("No Transation found");
                }
            break;

            //Items
            default:
                AddItem(Menu);
            break;
        }
    }

    //Mouse enter the barcode input auto forcuse
    const MouseEnter = ()=>{
        if(barcodeinput.current && !(document.activeElement === barcodeinput.current))
        {
           barcodeinput.current.focus();

        }
    }

    //If ender key press in keybord then add item in transation base on the barcode
    const KeyEnter = (event:any) =>{
        if(event.key === "Enter")
        {
            const finditem = dummyobj.MenuArray.find(item => item.Barcode == Barcode);
            if(finditem) 
            {
                AddItem(finditem.ItemName);
            }
            else{
                alert(Barcode +" Barcode Not found");
            }

            SetBarcode(0);
 
        }
    }

    return <>
       
         <div onMouseMoveCapture={MouseEnter}  className="continer">
            
        <div className="header-panel">
        
        <input ref={barcodeinput} onKeyDown={KeyEnter} type="number" className="maininput" onChange={(e:any)=>SetBarcode(e.target.value)} value={Barcode} />
        </div>
        <div className="transation-panel">
            <div className="transanion-header">
                <label>Transation No </label>
                <label>4893024897988</label>
            </div>
            
            <div className="transation-body">

            

            {/* List Of Transations  */}
            {ItemTemplate}
            
            </div>
      
            <div className="footer">
            <div ref={TransStatus} className="transanion-status">
               {TranstaionText}
            </div>
            <div className="transanion-footer">
                <label>Total</label>
                <label id="total">${Total}.00</label>
            </div>
            </div>
        </div>
       
         <Manupage OnMenuClick={MenuClick} Items={dummyobj.MenuArray} />
         {PopupTemplate}
         {paypopup}
        
         

        <div className="footer-panel"></div>
    </div>
    </>
}

export default MainPage;