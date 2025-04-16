import { Produto } from "./Produto";

export class Cliente{
    private _nome: string;
    private _cpf: string;
    private _data_nascimento: string;
    private _endereco: string;
    private _sexo: boolean;
    private _email: string;
    private _telefone: string;
    private _products: Produto[];

    constructor(nome: string, cpf: string, data_nascimento: string, endereco: string, sexo: boolean, email: string, telefone: string){
        this._nome= nome;
        this._cpf= cpf;
        this._data_nascimento= data_nascimento;
        this._endereco= endereco;
        this._sexo= sexo;
        this._email= email
        this._telefone= telefone
        this._products= []
    }
    
    
    public set nome(v : string) {
        this._nome = v;
    }
    
    
    public get nome() : string {
        return this._nome
    }
    
    
    public set cpf(v : string) {
        this._cpf = v;
    }
    
    
    public get cpf() : string {
        return this._cpf
    }
    
    
    public set endereco(v : string) {
        this._endereco = v;
    }

    
    public get endereco() : string {
        return this._endereco
    }

    
    public set sexo(v : boolean) {
        this._sexo = v;
    }
    
    
    public get sexo() : boolean {
        return this._sexo
    }

    
    public set telefone(v : string) {
        this._telefone = v;
    }
    
    
    public get telefone() : string {
        return this._telefone
    }
    
    
    public set email(v : string) {
        this._email = v;
    }

    
    public get email() : string {
        return this._email
    }
    
    
}