import { Produto } from "../object/Produto";

// Função para listar produtos em estoque com exibição amigável
export function listarProdutosEmEstoque(produtos: Produto[]): void {
    const produtosEmEstoque = produtos.filter(produto => produto.disponivel);
    
    if (produtosEmEstoque.length === 0) {
        console.log("\n🔴 Nenhum produto disponível em estoque!");
        return;
    }

    console.log("\n🟢 PRODUTOS EM ESTOQUE");
    console.log("====================================================");
    console.log("| # | Nome                | Preço    | Quant. | Validade   |");
    console.log("====================================================");

    produtosEmEstoque.forEach((produto, index) => {
        const validade = produto.perecivel && produto.dataValidade 
            ? produto.dataValidade 
            : "Não perecível";
        
        console.log(
            `| ${(index + 1).toString().padEnd(2)}| ` +
            `${produto.nome.padEnd(20)}| ` +
            `R$ ${produto.precoFinal.toFixed(2).padEnd(7)}| ` +
            `${produto.quantidade.toString().padEnd(6)}| ` +
            `${validade.padEnd(11)}|`
        );
    });

    console.log("====================================================");
    console.log(`Total: ${produtosEmEstoque.length} produto(s) disponível(is)`);
}

// Função para listar produtos esgotados com exibição amigável
export function listarProdutosEsgotados(produtos: Produto[]): void {
    // Primeiro garantimos que todos os produtos com quantidade 0 estão marcados como indisponíveis
    produtos.forEach(produto => {
        if (produto.quantidade === 0 && produto.disponivel !== false) {
            produto.disponivel = false;
        }
    });

    const produtosEsgotados = produtos.filter(produto => !produto.disponivel);
    
    if (produtosEsgotados.length === 0) {
        console.log("\n🟢 Todos os produtos estão disponíveis!");
        return;
    }

    console.log("\n🔴 PRODUTOS ESGOTADOS");
    console.log("====================================================");
    console.log("| # | Nome                | Preço    | Últ. Quant. | Data Validade  |");
    console.log("====================================================");

    produtosEsgotados.forEach((produto, index) => {
        const validade = produto.perecivel && produto.dataValidade 
            ? produto.dataValidade 
            : "Não perecível";
        
        console.log(
            `| ${(index + 1).toString().padEnd(2)}| ` +
            `${produto.nome.padEnd(20)}| ` +
            `R$ ${produto.precoFinal.toFixed(2).padEnd(7)}| ` +
            `${produto.quantidade.toString().padEnd(11)}| ` +
            `${validade.padEnd(14)}|`
        );
    });

    console.log("====================================================");
    console.log(`Total: ${produtosEsgotados.length} produto(s) esgotado(s)`);
}

// Função para exibir produtos formatados
export function exibirProdutos(produtos: Produto[]): void {
    if (produtos.length === 0) {
        console.log("Nenhum produto encontrado!");
        return;
    }

    produtos.forEach(produto => {
        console.log(`
        Nome: ${produto.nome}
        Preço: R$ ${produto.precoFinal.toFixed(2)}
        Quantidade: ${produto.quantidade}
        ${produto.perecivel ? `Validade: ${produto.dataValidade}` : 'Não perecível'}
        --------------------------
        `);
    });
}

module.exports = {
    listarProdutosEmEstoque,
    listarProdutosEsgotados,
    exibirProdutos
}