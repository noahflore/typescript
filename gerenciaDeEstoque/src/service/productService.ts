import { Produto } from '../object/Produto';
const prompt = require('prompt-sync')();

export function createProduct(): Produto {
    let nome: string;
    let precoDeCompra: number;
    let custoDoLojista: number;
    let precoFinal: number;
    let perecivel: boolean;
    let quantidade: number;  // Nova variável para quantidade

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

    // Validação dos preços
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

    // Validação da quantidade
    quantidade = validarNumero("Digite a quantidade em estoque: ");

    // Cria o produto com a quantidade
    const produto = new Produto(
        nome, 
        precoDeCompra, 
        custoDoLojista, 
        precoFinal, 
        perecivel,
        quantidade  // Passando a quantidade para o construtor
    );

    // Se for perecível, solicita data de validade
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

export default { createProduct };