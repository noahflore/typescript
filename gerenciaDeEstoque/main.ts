import prompt from "prompt-sync";
import { createProduct, moreProduct, lowProduct, deleteProduct } from './src/service/productService';
import { createClient } from "./src/service/clientService";
import { Produto } from "./src/object/Produto";
import { Cliente } from "./src/object/Cliente"
import { listAllClients } from "./src/service/clientListService";
import { VendaService } from './src/service/vendaService';
import { 
    listarProdutosEmEstoque, 
    listarProdutosEsgotados,
    exibirProdutos
} from './src/service/productList';

const teclado = prompt();
let produtos: Produto[] = []; // Corrigido para array de Produto
let clientes: Cliente[] = [];
let vendas: VendaService = new VendaService;

console.log("SISTEMA DE ESTOQUE!");

const textoMenu = `
| ------- ESCOLHA UMA OPÇÃO ------ |
| 0.: cadastrar um novo produto    |
| 1.: listar todos os produtos     |
| 2.: listar todos disponíveis     |
| 3.: listar todos esgotados       |
| 4.: aumentar estoque             |
| 5.: diminuir estoque             |
| 6.: excluir produto              |
| 7.: cadastrar cliente            |
| 8.: listar todos os clientes     |
| 9.: sair                         |
| 10: cadastrar vendas             |
| 11: listar todas as vendas       |
| 12: procurar vendas por cliênte  |
| 13: detalhar venda               |
`;

let opcao = 15;

while (opcao !== 9) {

    switch (opcao) {
        case 0:
            const novoProduto = createProduct();
            produtos.push(novoProduto);
            console.log("Produto cadastrado com sucesso!");
            break;
        case 1:
            console.log("Lista de produtos:", exibirProdutos(produtos));
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 2:
            console.log("produto(s) em estoque: ", listarProdutosEmEstoque(produtos))
            teclado("pressiona qualquer teclar para continua.")
            break
        case 3:
            console.log("produto(s) esgotado(s): ", listarProdutosEsgotados(produtos))
            teclado("pressiona qualquer teclar para continua.")
            break
        case 4:
            moreProduct(produtos)
            teclado("pressiona qualquer teclar para continua.")
            break
        case 5:
            lowProduct(produtos)
            teclado("pressiona qualquer teclar para continua.")
            break
        case 6:
            deleteProduct(produtos)
            teclado("pressiona qualquer teclar para continua.")
            break
        case 7:
            const novoCliente = createClient();
            clientes.push(novoCliente);
            console.log("Cliente cadastrado com sucesso!");
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 8:
            listAllClients(clientes);
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 9:
            console.log("Saindo...");
            break;
        case 10: // Cadastrar venda
            vendas.cadastrarVenda(clientes, produtos);
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 11: // Listar todas as vendas
            vendas.listarVendas();
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 12: // Procurar vendas por cliente
            vendas.procurarPorCliente();
            teclado("pressiona qualquer teclar para continua.")
            break;
        case 13: // Detalhar venda
            vendas.detalharVenda();
            teclado("pressiona qualquer teclar para continua.")
            break;
        default:
            console.log("Opção ainda não implementada");
    }

    console.log(textoMenu);
    const input = teclado("Digite uma opção: ");
    opcao = parseInt(input, 10);

    if (isNaN(opcao)) {
        console.log("Por favor, digite um número válido!");
        continue;
    }
}