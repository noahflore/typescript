 export class Produto{
    private _nome: string;
    private _precoDeCompra: number;
    private _custoDoLojista: number;
    private _precoFinal: number;
    private _perecivel: boolean;
    private _dataValidade?: string;
    private _quantidade: number;

    constructor(nome: string, precoDeCompra: number, custoDoLojista: number, precoFinal: number, perecivel: boolean){
        this._nome= nome;
        this._precoDeCompra= precoDeCompra;
        this._custoDoLojista= custoDoLojista;
        this._precoFinal= precoFinal;
        this._perecivel= perecivel;
    }

    
    public solicitarDataValidade(prompt: Function): string {
        if (this._perecivel) {
            while (true) {
                const data = prompt("Digite a data de validade (DD/MM/AAAA): ");
                if (this.validarData(data)) {
                    this._dataValidade = data;
                    return "";
                }
                console.log("Formato de data inválido! Use DD/MM/AAAA");
            }
        }
        return "";
    }

    private validarData(data: string): boolean {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(data)) return false;
        
        const [dia, mes, ano] = data.split('/').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);
        
        return (
            dataObj.getDate() === dia &&
            dataObj.getMonth() === mes - 1 &&
            dataObj.getFullYear() === ano
        );
    }

    public is_perecivel(): string {
        if (this._perecivel && !this._dataValidade) {
            return "Produto perecível mas data não informada!";
        }
        return "";
    }

    
    public set dataValidade(v : string) {
        this._dataValidade = v;
    }

    
    public get dataValidade() : string {
        return this._dataValidade
    }
    

    get quantidade(): number {
        return this._quantidade;
    }

    set quantidade(valor: number) {
        this._quantidade = valor >= 0 ? valor : 0;
    }
    
}