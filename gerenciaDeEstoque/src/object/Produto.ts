 export class Produto{
    private _nome: string;
    private _precoDeCompra: number;
    private _custoDoLojista: number;
    private _precoFinal: number;
    private _perecivel: boolean;
    private _data: string;

    constructor(nome: string, precoDeCompra: number, custoDoLojista: number, precoFinal: number, perecivel: boolean){
        this._nome= nome;
        this._precoDeCompra= precoDeCompra;
        this._custoDoLojista= custoDoLojista;
        this._precoFinal= precoFinal;
        this._perecivel= perecivel;
    }

    is_perecivel(perecivel: boolean): string{
        if (this._perecivel){
            if(!this._data){
                return "data não informado!"
            }
        }
        return ""
    }
}