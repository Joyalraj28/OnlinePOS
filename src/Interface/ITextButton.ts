
export default interface ITextButton{
    Text:string,
    width:number,
    height:number,
    type:ButtonType,
    OnClick:(e:any)=>void
    
}

export enum ButtonType{
    default,
    function
}