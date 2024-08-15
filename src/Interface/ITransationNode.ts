export default interface ITransationNode{
    ItemName:string,
    Qty:number,
    CurrentUnitPrice:number
    UnitPrice:number
    Isvoid:boolean
    Increment:(ItemName:string)=>void
    Decrement:(ItemName:string)=>void
    
}

