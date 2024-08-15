import ITransationNode from "../../Interface/ITransationNode";
import ReceiptFormat from "../../ReceiptFormat";
import "/src/css/comman.css";
import { useEffect,useRef } from "react";




const Receipt : React.FC<{}> = ()=>{

    useEffect(() => {
        window.print();
        window.onafterprint=()=>{window.close(); localStorage.clear();}
        
    },[])

    function GetItems() {
        let str = localStorage.getItem("ReceiptBody");
        if (str) {
            let array: ITransationNode[] = JSON.parse(str);
            if (array) {
                return array.map((item) => <tr>
                    <td>{item.ItemName}</td>
                    <td>{item.Qty}</td>
                    <td style={{textAlign:"end"}}>{item.CurrentUnitPrice}.00</td>
                </tr>);
            }
        }
    }

    const DateFormat = () =>{ 
    let date = new Date();
    return "Date :\t"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();}

    return <div className="Receipt">
      
       <table>

       <tr id='HeaderRow'>
        <th colSpan={3}><div style={{ whiteSpace: 'pre' }}>
            {localStorage.getItem("ReceiptHeader")?.toString()}
        </div>
        </th>
       </tr>

       <tr>
        <th colSpan={3}><div style={{ whiteSpace: 'pre' }}>
            {DateFormat()}
        </div>
        </th>
       </tr>
       
       <tr>
        <th colSpan={3}><div style={{ whiteSpace: 'pre' }}>
        <label>Transation No  : 4893024897988</label>
        </div>
        </th>
       </tr>

        <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>UnitPrice</th>
        </tr>

        {GetItems()}

        <tr id='FooterRow'>
        <th colSpan={3}><div style={{ whiteSpace: 'pre' }}>
            {localStorage.getItem("ReceiptFooter")?.toString()}
        </div></th>
       </tr>
        
       </table>
    </div>
}

export default Receipt