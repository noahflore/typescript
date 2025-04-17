import { Cliente } from './Cliente';
import { Produto } from './Produto';

export class ItemVenda {
    constructor(
        public produto: Produto,
        public quantidade: number
    ) {}
}

export class Venda {
    constructor(
        public cliente: Cliente,
        public itens: ItemVenda[],
        public data: Date = new Date()
    ) {}

    public calcularTotal(): number {
        return this.itens.reduce((total, item) => {
            return total + (item.produto.precoFinal * item.quantidade);
        }, 0);
    }

    public calcularLucro(): number {
        return this.itens.reduce((total, item) => {
            return total + ((item.produto.precoFinal - item.produto.custoDoLojista) * item.quantidade);
        }, 0);
    }
}