import { Pokemon } from "./Pokemon";

export class Domestico extends Pokemon{
    private _treinador: string;

    constructor(treinador: string, nome: string, energia: number, ataque: number, defesa: number){
        super(nome, energia, ataque, defesa);
        this._treinador = treinador;
        
    }
}