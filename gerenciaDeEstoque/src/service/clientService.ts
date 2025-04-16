import { Cliente } from '../object/Cliente';
const prompt = require('prompt-sync')();

export function createClient(): Cliente {
    // Validação do nome
    let nome: string;
    while (true) {
        nome = prompt("Digite o nome completo: ").trim();
        if (nome.length >= 3 && !/\d/.test(nome)) {
            break;
        }
        console.log("Nome inválido! Deve ter pelo menos 3 caracteres e não conter números.");
    }

    // Validação do CPF
    let cpf: string;
    while (true) {
        cpf = prompt("Digite o CPF (somente números): ").trim();
        if (/^\d{11}$/.test(cpf)) {
            break;
        }
        console.log("CPF inválido! Deve conter exatamente 11 dígitos numéricos.");
    }

    // Validação da data de nascimento
    let data_nascimento: string;
    while (true) {
        data_nascimento = prompt("Digite a data de nascimento (DD/MM/AAAA): ").trim();
        if (validarData(data_nascimento) && calcularIdade(data_nascimento) >= 18) {
            break;
        }
        console.log("Data inválida! Deve ser maior de 18 anos e estar no formato DD/MM/AAAA.");
    }

    // Validação do endereço
    const endereco = prompt("Digite o endereço completo: ").trim();

    // Validação do sexo
    let sexo: boolean;
    while (true) {
        const resposta = prompt("Sexo (M/F): ").toUpperCase();
        if (resposta === 'M' || resposta === 'F') {
            sexo = resposta === 'M';
            break;
        }
        console.log("Opção inválida! Digite M para Masculino ou F para Feminino.");
    }

    // Validação do email
    let email: string;
    while (true) {
        email = prompt("Digite o e-mail: ").trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            break;
        }
        console.log("E-mail inválido! Digite um e-mail válido.");
    }

    // Validação do telefone
    let telefone: string;
    while (true) {
        telefone = prompt("Digite o telefone (com DDD): ").trim();
        if (/^\d{10,11}$/.test(telefone)) {
            break;
        }
        console.log("Telefone inválido! Deve conter 10 ou 11 dígitos (com DDD).");
    }

    return new Cliente(nome, cpf, data_nascimento, endereco, sexo, email, telefone);
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

// Função para calcular idade
function calcularIdade(dataNascimento: string): number {
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}