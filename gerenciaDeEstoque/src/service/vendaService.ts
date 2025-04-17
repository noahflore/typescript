import { Venda, ItemVenda } from '../object/Venda';
import { Cliente } from '../object/Cliente';
import { Produto } from '../object/Produto';
const prompt = require('prompt-sync')();

export class VendaService {
    private vendas: Venda[] = [];

    // Cadastrar nova venda
    public cadastrarVenda(clientes: Cliente[], produtos: Produto[]): void {
        console.log("\n=== NOVA VENDA ===");

        // Selecionar cliente
        const cliente = this.selecionarCliente(clientes);
        if (!cliente) return;

        // Selecionar produtos
        const itens = this.selecionarProdutos(produtos);
        if (itens.length === 0) return;

        // Confirmar venda
        const confirmacao = prompt("Confirmar venda? (S/N): ").toUpperCase();
        if (confirmacao !== 'S') {
            console.log("Venda cancelada!");
            return;
        }

        // Registrar venda
        const novaVenda = new Venda(cliente, itens);
        this.vendas.push(novaVenda);
        
        // Atualizar estoque
        itens.forEach(item => {
            item.produto.quantidade -= item.quantidade;
        });

        console.log("\nVenda registrada com sucesso!");
        console.log(`Total: R$ ${novaVenda.calcularTotal().toFixed(2)}`);
        console.log(`Lucro: R$ ${novaVenda.calcularLucro().toFixed(2)}`);
    }

    // Listar todas as vendas
    public listarVendas(): void {
        if (this.vendas.length === 0) {
            console.log("\nNenhuma venda registrada!");
            return;
        }

        console.log("\n=== LISTA DE VENDAS ===");
        this.vendas.forEach((venda, index) => {
            console.log(`\nVenda #${index + 1}`);
            console.log(`Cliente: ${venda.cliente.nome}`);
            console.log(`Data: ${venda.data.toLocaleString()}`);
            console.log(`Total: R$ ${venda.calcularTotal().toFixed(2)}`);
        });
        console.log(`\nTotal de vendas: ${this.vendas.length}`);
    }

    // Procurar vendas por cliente
    public procurarPorCliente(): void {
        const nome = prompt("Digite o nome do cliente: ").trim();
        const vendasCliente = this.vendas.filter(venda => 
            venda.cliente.nome.toLowerCase().includes(nome.toLowerCase())
        );

        if (vendasCliente.length === 0) {
            console.log("\nNenhuma venda encontrada para este cliente!");
            return;
        }

        console.log(`\n=== VENDAS PARA ${nome.toUpperCase()} ===`);
        vendasCliente.forEach((venda, index) => {
            console.log(`\nVenda #${index + 1}`);
            console.log(`Data: ${venda.data.toLocaleString()}`);
            console.log("Itens:");
            venda.itens.forEach(item => {
                console.log(`- ${item.produto.nome} (${item.quantidade}x): R$ ${(item.produto.precoFinal * item.quantidade).toFixed(2)}`);
            });
            console.log(`Total: R$ ${venda.calcularTotal().toFixed(2)}`);
            console.log(`Lucro: R$ ${venda.calcularLucro().toFixed(2)}`);
        });
    }

    // Detalhar venda específica
    public detalharVenda(): void {
        if (this.vendas.length === 0) {
            console.log("\nNenhuma venda registrada!");
            return;
        }

        this.listarVendas();
        const id = Number(prompt("\nDigite o número da venda para detalhar: ")) - 1;

        if (isNaN(id) || id < 0 || id >= this.vendas.length) {
            console.log("Venda inválida!");
            return;
        }

        const venda = this.vendas[id];
        console.log("\n=== DETALHES DA VENDA ===");
        console.log(`Cliente: ${venda.cliente.nome}`);
        console.log(`Data: ${venda.data.toLocaleString()}`);
        console.log("\nItens:");
        venda.itens.forEach(item => {
            console.log(`- ${item.produto.nome}`);
            console.log(`  Quantidade: ${item.quantidade}`);
            console.log(`  Preço unitário: R$ ${item.produto.precoFinal.toFixed(2)}`);
            console.log(`  Subtotal: R$ ${(item.produto.precoFinal * item.quantidade).toFixed(2)}`);
        });
        console.log(`\nTotal: R$ ${venda.calcularTotal().toFixed(2)}`);
        console.log(`Lucro: R$ ${venda.calcularLucro().toFixed(2)}`);
    }

    // Métodos auxiliares
    private selecionarCliente(clientes: Cliente[]): Cliente | null {
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado!");
            return null;
        }

        console.log("\nClientes disponíveis:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        const id = Number(prompt("Selecione o cliente: ")) - 1;
        if (isNaN(id) || id < 0 || id >= clientes.length) {
            console.log("Cliente inválido!");
            return null;
        }

        return clientes[id];
    }

    private selecionarProdutos(produtos: Produto[]): ItemVenda[] {
        const itens: ItemVenda[] = [];
        const produtosDisponiveis = produtos.filter(p => p.quantidade > 0);

        if (produtosDisponiveis.length === 0) {
            console.log("Nenhum produto disponível em estoque!");
            return [];
        }

        while (true) {
            console.log("\nProdutos disponíveis:");
            produtosDisponiveis.forEach((produto, index) => {
                console.log(`${index + 1} - ${produto.nome} (Estoque: ${produto.quantidade}) - R$ ${produto.precoFinal.toFixed(2)}`);
            });

            const opcao = prompt("Digite o número do produto (ou 'F' para finalizar): ");
            if (opcao.toUpperCase() === 'F') break;

            const id = Number(opcao) - 1;
            if (isNaN(id) || id < 0 || id >= produtosDisponiveis.length) {
                console.log("Produto inválido!");
                continue;
            }

            const produto = produtosDisponiveis[id];
            const quantidade = Number(prompt(`Quantidade de ${produto.nome} (disponível: ${produto.quantidade}): `));

            if (isNaN(quantidade) || quantidade <= 0 || quantidade > produto.quantidade) {
                console.log("Quantidade inválida!");
                continue;
            }

            itens.push(new ItemVenda(produto, quantidade));
            console.log("Produto adicionado à venda!");
        }

        return itens;
    }
}