import { Produto } from "../object/Produto";

// Função para listar produtos em estoque (disponivel true)
export function listarProdutosEmEstoque(produtos: Produto[]): Produto[] {
    return produtos.filter(produto => produto.disponivel == true);
}

// Função para listar produtos esgotados (disponivel == false)
export function listarProdutosEsgotados(produtos: Produto[]): Produto[] {
    return produtos.filter(produto => produto.disponivel == false);
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