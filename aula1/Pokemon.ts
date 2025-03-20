export class Pokemon{
    private _nome: string;
    private _energia: number;
    private _ataque: number;
    private _defesa: number;

    constructor(nome: string, energia: number, ataque: number, defesa: number){
        this._nome= nome;
        this._energia= energia;
        this._ataque= ataque;
        this._defesa= defesa;
    }

    
    public get nome() : string {
        return this._nome
    }
    
    
    public set nome(v : string) {
        this._nome = v;
    }
    
    
    public get energia() : number {
        return this._energia
    }

    
    public set energia(v : number) {
        this._energia = v;
    }
    
    
    public get ataque() : number {
        return this._ataque
    }
    
    
    public set ataque(v : number) {
        this._ataque = v;
    }
    
    
    public get defesa() : number {
        return this._defesa
    }
    
    
    public set defesa(v : number) {
        this._defesa = v;
    }
    

    status(): String{
        return `
        ------- STATUS -------"
        nome...: ${this._nome}
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