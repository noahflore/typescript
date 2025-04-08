import {Produto} from '../object/Produto'
export function createProduct(nome: string, precoDeCompra: number, custo: number, precoFinal: number, perecivel: boolean): Produto{

    while (true) {
        texto = teclado("Digite o nome: ");
        
        // Verifica se é string e não contém números
        if (typeof texto === "string" && !/\d/.test(texto)) {
            nome = texto;
            break;
        }
        
        console.log("Digite uma string válida (sem números)");
    }

    texto = teclado("digite o preço do produto de fabrica: ")
    precoDeCompra = texto
    texto = teclado("digite o custo inicial: ")
    custo = texto
    texto = teclado("digite o preço final: ")
    precoFinal = texto
    texto = teclado("é perecível? (Y/N): ")
    perecivel = texto

    const p: Produto = new Produto(nome,precoDeCompra,custo,precoFinal,perecivel);
    return p
}

