import "/src/Component/Props/Button.css";
import ITextButton, { ButtonType } from "../../Interface/ITextButton";

const TextButton:React.FC<ITextButton>=(prop:ITextButton)=>{
    return  <button className={prop.type==ButtonType.default?"def-button":"fun-button"} onClick={() => prop.OnClick(prop.Text)} style={{width:prop.width,height:prop.height}}>
    <label>{prop.Text}</label>
     </button>
}

export default TextButton;