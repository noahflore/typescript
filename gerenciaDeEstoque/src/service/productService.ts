import { Produto } from '../object/Produto';
const prompt = require('prompt-sync')();

export function createProduct(): Produto {
    let nome: string;
    let precoDeCompra: number;
    let custoDoLojista: number;
    let precoFinal: number;
    let perecivel: boolean;
    let quantidade: number;

    // Validação do nome (mantida igual)
    while (true) {
        nome = prompt("Digite o nome: ").trim();
        if (nome.length < 2) {
            console.log("Nome muito curto (mínimo 2 caracteres)");
            continue;
        }
        if (/\d/.test(nome)) {
            console.log("O nome não pode conter números");
            continue;
        }
        break;
    }

    // Validação dos preços com novas regras
    while (true) {
        precoDeCompra = validarNumero("Digite o preço de fábrica: ");
        custoDoLojista = validarNumero("Digite o custo inicial (deve ser ≥ preço de fábrica): ");
        
        if (custoDoLojista >= precoDeCompra) {
            break;
        }
        console.log("O custo inicial deve ser igual ou maior que o preço de fábrica!");
    }

    // Validação do preço final (mantida com ajuste na mensagem)
    while (true) {
        precoFinal = validarNumero("Digite o preço final (deve ser > custo inicial): ");
        if (precoFinal > custoDoLojista) {
            break;
        }
        console.log("O preço final deve ser maior que o custo inicial!");
    }

    // Restante do código mantido igual
    perecivel = validarPerecivel();
    quantidade = validarNumero("Digite a quantidade em estoque: ");

    const produto = new Produto(
        nome, 
        precoDeCompra, 
        custoDoLojista, 
        precoFinal, 
        perecivel,
        quantidade
    );

    if (perecivel) {
        while (true) {
            const dataValidade = prompt("Digite a data de validade (DD/MM/AAAA): ");
            if (validarData(dataValidade)) {
                produto.dataValidade = dataValidade;
                break;
            }
            console.log("Formato de data inválido! Use DD/MM/AAAA");
        }
    }

    return produto;
}

export function moreProduct(produtos: Produto[]): void {
    // Verifica se há produtos cadastrados
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado!");
        return;
    }

    // Lista todos os produtos disponíveis
    console.log("\nLista de Produtos:");
    produtos.forEach((produto, index) => {
        console.log(`${index} - ${produto.nome} (Quantidade: ${produto.quantidade})`);
    });

    // Solicita seleção do produto
    const produtoIndex = Number(prompt("\nDigite o número do produto que deseja alterar: "));
    
    // Valida a seleção
    if (isNaN(produtoIndex) || produtoIndex < 0 || produtoIndex >= produtos.length) {
        console.log("Seleção inválida!");
        return;
    }

    // Solicita a quantidade a adicionar
    const quantidade = Number(prompt("Digite a quantidade a adicionar: "));
    
    // Valida a quantidade
    if (isNaN(quantidade) || quantidade <= 0) {
        console.log("Quantidade deve ser maior que zero!");
        return;
    }

    // Atualiza o estoque
    const produtoSelecionado = produtos[produtoIndex];
    produtoSelecionado.quantidade += quantidade;
    
    // Atualiza disponibilidade se necessário
    if (produtoSelecionado.quantidade > 0 && !produtoSelecionado.disponivel) {
        produtoSelecionado.disponivel = true;
    }

    console.log(`\nEstoque de "${produtoSelecionado.nome}" atualizado com sucesso!`);
    console.log(`Nova quantidade: ${produtoSelecionado.quantidade}`);
}

// Função equivalente para diminuir estoque (lowProduct)
export function lowProduct(produtos: Produto[]): void {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado!");
        return;
    }

    console.log("\nLista de Produtos:");
    produtos.forEach((produto, index) => {
        console.log(`${index} - ${produto.nome} (Quantidade: ${produto.quantidade})`);
    });

    const produtoIndex = Number(prompt("\nDigite o número do produto que deseja alterar: "));
    
    if (isNaN(produtoIndex) || produtoIndex < 0 || produtoIndex >= produtos.length) {
        console.log("Seleção inválida!");
        return;
    }

    const produtoSelecionado = produtos[produtoIndex];
    
    // Verifica se o produto está disponível
    if (produtoSelecionado.quantidade <= 0) {
        console.log(`O produto "${produtoSelecionado.nome}" está esgotado!`);
        return;
    }

    const quantidade = Number(prompt(`Digite a quantidade a remover (disponível: ${produtoSelecionado.quantidade}): `));
    
    if (isNaN(quantidade)) {
        console.log("Quantidade inválida!");
        return;
    }

    if (quantidade <= 0) {
        console.log("Quantidade deve ser maior que zero!");
        return;
    }

    if (quantidade > produtoSelecionado.quantidade) {
        console.log(`Quantidade insuficiente! Disponível: ${produtoSelecionado.quantidade}`);
        return;
    }

    produtoSelecionado.quantidade -= quantidade;
    
    // Atualiza disponibilidade se estoque zerar
    if (produtoSelecionado.quantidade === 0) {
        produtoSelecionado.disponivel = false;
        console.log("\nATENÇÃO: Estoque zerado!");
    }

    console.log(`\nEstoque de "${produtoSelecionado.nome}" atualizado com sucesso!`);
    console.log(`Nova quantidade: ${produtoSelecionado.quantidade}`);
}

export function deleteProduct(products: Produto[]): void {
    // Verifica se há produtos cadastrados
    if (products.length === 0) {
        console.log("\n⚠️ Nenhum produto cadastrado!");
        return;
    }

    // Lista todos os produtos disponíveis
    console.log("\n📋 LISTA DE PRODUTOS:");
    console.log("==================================");
    products.forEach((product, index) => {
        console.log(`${index} - ${product.nome} (Quantidade: ${product.quantidade})`);
    });
    console.log("==================================");

    // Solicita seleção do produto
    const productIndex = Number(prompt("\nDigite o número do produto que deseja excluir: "));
    
    // Valida a seleção
    if (isNaN(productIndex) || productIndex < 0 || productIndex >= products.length) {
        console.log("\n❌ Seleção inválida! Digite um número da lista.");
        return;
    }

    // Solicita confirmação
    const productToDelete = products[productIndex];
    const confirmation = prompt(`Tem certeza que deseja excluir "${productToDelete.nome}"? Esta ação não pode ser desfeita. (S/N): `).toUpperCase();
    
    if (confirmation !== 'S') {
        console.log("\n🚫 Exclusão cancelada.");
        return;
    }

    // Remove o produto do array
    products.splice(productIndex, 1);
    console.log(`\n✅ Produto "${productToDelete.nome}" foi excluído com sucesso!`);
}

// Função auxiliar para validar números
function validarNumero(mensagem: string): number {
    while (true) {
        const valor = Number(prompt(mensagem));
        if (!isNaN(valor) && valor > 0) {
            return valor;
        }
        console.log("Valor inválido! Digite um número positivo.");
    }
}

// Função auxiliar para validar resposta sim/não
function validarPerecivel(): boolean {
    while (true) {
        const resposta = prompt("É perecível? (S/N): ").toUpperCase();
        if (resposta === 'S' || resposta === 'Y') return true;
        if (resposta === 'N') return false;
        console.log("Resposta inválida! Digite S ou N.");
    }
}

// Função para validar data
function validarData(data: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) return false;
    
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    
    return (
        dataObj.getDate() === dia &&
        dataObj.getMonth() === mes - 1 &&
        dataObj.getFullYear() === ano
    );
}

module.exports = { createProduct, moreProduct, lowProduct, deleteProduct };