import React from 'react';
import TextButton from '../Props/TextButton';
import IMenuPage from '../../Interface/IMenuPage';
import '/src/css/comman.css';
import { ButtonType} from '../../Interface/ITextButton';

const Manupage : React.FC<IMenuPage> =(prop:IMenuPage)=>{

  
    return <div className="menu-panel">
      <div className="item-panel">
       {prop.Items.map((item,index) => <TextButton key={index} type={ButtonType.default} OnClick={prop.OnMenuClick} Text={item.ItemName} width={300} height={200}></TextButton>)}
       </div>
       <div className="func-panel">
       <TextButton type={ButtonType.function} OnClick={prop.OnMenuClick} Text='Pay' width={300} height={100}></TextButton>
       <TextButton type={ButtonType.function} OnClick={prop.OnMenuClick} Text='Void' width={300} height={100}></TextButton>
       <TextButton type={ButtonType.function} OnClick={prop.OnMenuClick} Text='Print receipt' width={300} height={100}></TextButton>
       </div>
     </div>

}


export default Manupage;