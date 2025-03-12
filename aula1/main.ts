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
            pokemon.ataque+= Math.floor(Math.random() * 7);
            pokemon.energia-= Math.floor(Math.random() * 12);
            if(pokemon.energia <= 0){
                console.log("energia acabou! fim de jogo.");
            }else{
                if(pokemon.ataque >100) pokemon.ataque=100;
            }
            break;
        case 2:
            pokemon.defesa+= Math.floor(Math.random() * 7);
            pokemon.energia-= Math.floor(Math.random() * 12);
            if(pokemon.energia <= 0){
                console.log("energia acabou! fim de jogo.");
            }else{
                if(pokemon.defesa >100) pokemon.defesa=100;
            }
            break;
        case 3:
            console.log(pokemon);
            break;
        case 4:
            pokemon.energia-= Math.floor(Math.random() * 10);
            if(pokemon.energia<=0) console.log("sem energia! fim de jogo.");
            break;
        case 5:
            pokemon.energia+= Math.floor(Math.random() * 4);
            if(pokemon.energia>100) pokemon.energia=100;
            break;
        case 9:
            console.log("saindo...");
            break;
        default:
            console.log("opção invalida!");
    }
}