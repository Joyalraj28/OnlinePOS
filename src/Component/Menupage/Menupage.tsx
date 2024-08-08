import React from 'react';
import TextButton from '../Props/TextButton';
import IMenuPage from '../../Interface/IMenuPage';
import '/src/css/comman.css';

const Manupage : React.FC<IMenuPage> =(prop:IMenuPage)=>{
    return <div className="menu-panel">
       <TextButton OnClick={prop.OnMenuClick} Text='Jam' width={300} height={200}></TextButton>
       <TextButton OnClick={prop.OnMenuClick} Text='Apple' width={300} height={200}></TextButton>
       <TextButton OnClick={prop.OnMenuClick} Text='Pay' width={300} height={200}></TextButton>
     </div>

}


export default Manupage;