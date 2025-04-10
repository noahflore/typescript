import { Produto } from '../object/Produto'
const prompt = require('prompt-sync')();

export function createProduct(): Produto {
    let nome: string;
    let precoDeCompra: number;
    let custoDoLojista: number;
    let precoFinal: number;
    let perecivel: boolean;

    // Validação do nome
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

    // Validação dos preços (todos devem ser números positivos)
    precoDeCompra = validarNumero("Digite o preço de fábrica: ");
    custoDoLojista = validarNumero("Digite o custo inicial: ");
    precoFinal = validarNumero("Digite o preço final: ");

    // Validação adicional para preço final
    if (precoFinal <= custoDoLojista) {
        console.log("O preço final deve ser maior que o custo inicial!");
        return createProduct(); // Recursão para reiniciar
    }

    // Validação do perecível
    perecivel = validarPerecivel();

    return new Produto(nome, precoDeCompra, custoDoLojista, precoFinal, perecivel);
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

module.exports = { createProduct };