import IItem from "./IItem";

export default interface IMenuPage{
    Items:IItem[],
    OnMenuClick:(e:string)=>void;
}
