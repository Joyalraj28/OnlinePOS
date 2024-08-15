import React, { ReactElement } from "react";
import "/src/css/comman.css";

export interface IPopup{
    children:ReactElement,
    funcName:string,
    IsVisble:boolean
    Close:(e:string)=>void;
}


const Popup:React.FC<IPopup> = ({funcName,children,IsVisble,Close}:IPopup)=>{


    return (<>
     <div  style={{display:IsVisble ? "block" : "none" }} className="popup">
       <div className="popupbox">
        <div className="topbar">
            <button onClick={() => Close(funcName)}  className="closebtn">X</button>
        </div>
        <div className="popupbody">
        {children}
        </div>
       
        </div>
    </div>
    </>);
}

export default Popup;