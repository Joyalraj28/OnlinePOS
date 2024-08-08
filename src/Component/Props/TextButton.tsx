import "/src/Component/Props/Button.css";
import ITextButton from "../../Interface/ITextButton";

const TextButton:React.FC<ITextButton>=(prop:ITextButton)=>{
    return  <button onClick={() => prop.OnClick(prop.Text)} style={{width:prop.width,height:prop.height}}>
    <label>{prop.Text}</label>
     </button>
}

export default TextButton;