export default class ReceiptFormat{
   
    private txt:string='';
    private lenth:number=0;
    /**
     *
     */
    constructor(lenth:number=42) {
        this.lenth =lenth;
    }

    AddTitle(Title:string){
        this.txt+=Title+"\n";
        return this;
    }


    AddLine(symbol:string) {
       this.txt +=symbol.repeat(this.lenth)+"\n"
       return this;
    }

    AddHeaders(headerarray:string[])
    {
      headerarray.forEach(header=>{
        this.txt+=header;
      })
    }

    GetFormat(){
        return this.txt;
    }



}