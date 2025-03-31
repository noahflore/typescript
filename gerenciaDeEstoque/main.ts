import prompt from "prompt-sync"

let produtos: object = [];


console.log("SISTEMA DE ESTOQUE!")

let n=1, texto=`
| ------- ESCOLHA UMA OPÇÃO ----- |
| 1: listar todos os produtos     |
| 2: listar todos disponíveis     |
| 3: listar todos esgotados       |
| 4: aumentar estoque             |
| 5: diminuir estoque             |
| 6: excluir produto              |
| 7: cadastrar cliente            |
| 8: listar todos os clientes     |
| 9: sair                         |
`
let teclado= prompt();

while(n!=9){

    console.log(texto)
    n= +teclado("digite: ")

    switch(n){
        case 9:
            
    }
}

console.log("saindo...")