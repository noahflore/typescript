import prompt from "prompt-sync"
import { Pokemon } from "./Pokemon";

let pokemon: Pokemon= new Pokemon("pikachu",100,50,50);

let teclado = prompt();
let option: number = 0;

while(option != 9){
    console.log("+======== Pokemon =============+");
    console.log("+ 1: treinar o ataque.         +");
    console.log("+ 2: treinar a defesa.         +");
    console.log("+ 3: ver atributos.            +");
    console.log("+ 4: entrar em batalha.        +");
    console.log("+ 5: descansar.                +");
    console.log("+ 9: sair.                     +");
    console.log("+======== Pokemon =============+");

    option= +teclado("escolha uma opção: ");

    switch(option){
        case 1:
            pokemon.ataque+=2;
            break;
        case 2:
            pokemon.defesa+=2;
            break;
        case 3:
            console.log(pokemon);
            break;
        case 4:
            pokemon.energia-=20;
            break;
        case 5:
            pokemon.energia+=5;
            break;
        case 9:
            console.log("saindo...");
            break;
        default:
            console.log("opção invalida!");
    }
}