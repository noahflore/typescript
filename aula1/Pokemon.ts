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

    status(): String{
        return `
        ------- STATUS -------"
        nome...: ${this.nome}
        energia: ${this.energia}
        ataque.: ${this.ataque}
        defesa.: ${this.defesa}
        `
    }

    treinarAtaque(): String{
        this.ataque+= Math.floor(Math.random() * 7);
        this.energia-= Math.floor(Math.random() * 12);
        if(this.ataque >100) this.ataque=100;
        return this.status();
    }

    treinarDefesa(): String{
        this.defesa+= Math.floor(Math.random() * 7);
        this.energia-= Math.floor(Math.random() * 12);
        if(this.defesa >100) this.defesa=100;
        return this.status();
    }

    batalha(): String{
        this.energia-= Math.floor(Math.random() * 10);
        return this.status();
    }

    descansa(horas: number): String{
        this.energia+= horas * Math.floor(Math.random() * 4);
        if(this.energia>100) this.energia=100;
        return this.status();
    }

    energiaAcabou(): boolean{
        return this.energia<=0
    }
}