 export class Produto{
    private _nome: string;
    private _precoDeCompra: number;
    private _custoDoLojista: number;
    private _precoFinal: number;
    private _perecivel: boolean;
    private _dataValidade: string;
    private _quantidade: number;
    private _disponivel: boolean;

    constructor(nome: string, precoDeCompra: number, custoDoLojista: number, precoFinal: number, perecivel: boolean, quantidade: number){
        this._nome= nome;
        this._precoDeCompra= precoDeCompra;
        this._custoDoLojista= custoDoLojista;
        this._precoFinal= precoFinal;
        this._perecivel= perecivel;
        this._dataValidade= ""
        this._quantidade= quantidade
        this._disponivel= true
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

    
    public set nome(v : string) {
        this._nome = v;
    }
    
    
    public get nome() : string {
        return this._nome
    }
    
    
    public set precoFinal(v : number) {
        this._precoFinal = v;
    }
    
    
    public get precoFinal() : number {
        return this._precoFinal
    }

    
    public set perecivel(v : boolean) {
        this._perecivel = v;
    }
    
    
    public get perecivel() : boolean {
        return this._perecivel
    }
    
    
    public set disponivel(v : boolean) {
        this._disponivel = v;
    }
    
    
    public get disponivel() : boolean {
        return this._disponivel
    }

    
    public set custoDoLojista(v : number) {
        this._custoDoLojista = v;
    }
    
    
    public get custoDoLojista() : number {
        return this._custoDoLojista
    }
    

}