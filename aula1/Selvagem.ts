import { Pokemon } from "./Pokemon";

export class Selvagem extends Pokemon{
    private _regiao: string;

    constructor(regiao: string, nome: string, energia: number, ataque: number, defesa: number){
        super(nome, energia, ataque, defesa);
        this._regiao = regiao;
        
    }
}