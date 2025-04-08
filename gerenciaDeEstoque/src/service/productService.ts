const Produto = require('../object/Produto')
import { Prompt } from 'prompt-sync';
export function createProduct(nome: string, precoDeCompra: number, custo: number, precoFinal: number, perecivel: boolean): Produto{

    const teclado = prompt
    var texto;
    var valor: number;
    while (true) {
       texto = teclado("Digite o nome: ");
        
        // Verifica se é string e não contém números
        if (typeof texto === "string" && !/\d/.test(texto)) {
            nome = texto;
            break;
        }
        
        console.log("Digite uma string válida (sem números)");
    }

    while (true){
        valor = Number(teclado("digite o preço do produto de fabrica: "))

        if (typeof(precoDeCompra) == "number"){
            precoDeCompra = valor
            break
        }

    }

    while(true){
        texto = Number(teclado("digite o custo inicial: "))

        if (typeof(texto) == "number"){
            custo = texto
            break
        }

    }

    while(true){

        valor = Number(teclado("digite o preço final: "))
        
        if(typeof(precoFinal) == "number"){
            precoFinal = valor
            break;
        }
    }

    let is_perecivel = teclado("é perecível? (Y/N): ");
    
    // Verifica se a resposta existe antes de chamar toUpperCase()
    if (is_perecivel && is_perecivel.toUpperCase() === "Y") {
        perecivel = true;
    } else {
        perecivel = false; // Definir explicitamente como false caso contrário
    }

    const p: Produto = new Produto(nome,precoDeCompra,custo,precoFinal,perecivel);
    return p
}

module.exports= {createProduct}
