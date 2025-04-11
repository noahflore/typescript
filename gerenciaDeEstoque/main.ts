import prompt from "prompt-sync";
import { createProduct } from './src/service/productService';
import { Produto } from "./src/object/Produto";
import { 
    listarProdutosEmEstoque, 
    listarProdutosEsgotados,
    exibirProdutos
} from './src/service/productList';

const teclado = prompt();
let produtos: Produto[] = []; // Corrigido para array de Produto

console.log("SISTEMA DE ESTOQUE!");

const textoMenu = `
| ------- ESCOLHA UMA OPÇÃO ----- |
| 0: cadastrar um novo produto    |
| 1: listar todos os produtos     |
| 2: listar todos disponíveis     |
| 3: listar todos esgotados       |
| 4: aumentar estoque             |
| 5: diminuir estoque             |
| 6: excluir produto              |
| 7: cadastrar cliente            |
| 8: listar todos os clientes     |
| 9: sair                         |
`;

let opcao = 11;

while (opcao !== 9) {
    console.log(textoMenu);
    const input = teclado("Digite uma opção: ");
    opcao = parseInt(input, 10);

    if (isNaN(opcao)) {
        console.log("Por favor, digite um número válido!");
        continue;
    }

    switch (opcao) {
        case 0:
            const novoProduto = createProduct();
            produtos.push(novoProduto);
            console.log("Produto cadastrado com sucesso!");
            break;
        case 1:
            console.log("Lista de produtos:", produtos);
            break;
        case 9:
            console.log("Saindo...");
            break;
        default:
            console.log("Opção ainda não implementada");
    }
}