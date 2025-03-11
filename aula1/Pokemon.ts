export class Pokemon{
    nome: string;
    energia: number;
    ataque: number;
    defesa: number;

    constructor(nome: string, energia: number, ataque: number, defesa: number){
        this.nome= nome;
        this.energia= energia;
        this.ataque= ataque;
        this.defesa= defesa;
    }

}