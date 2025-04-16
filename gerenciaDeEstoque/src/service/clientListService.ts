import { Cliente } from '../object/Cliente';

export function listAllClients(clientes: Cliente[]): void {
    if (clientes.length === 0) {
        console.log("\nNenhum cliente cadastrado!");
        return;
    }

    console.log("\n=== LISTA DE CLIENTES ===");
    console.log("------------------------------------------------------------");
    console.log("| # | Nome               | CPF         | Telefone    | Email");
    console.log("------------------------------------------------------------");

    clientes.forEach((cliente, index) => {
        console.log(
            `| ${index.toString().padEnd(2)}| ` +
            `${cliente.nome.padEnd(19)}| ` +
            `${formatCPF(cliente.cpf)}| ` +
            `${formatPhone(cliente.telefone)}| ` +
            `${cliente.email}`
        );
    });

    console.log("------------------------------------------------------------");
    console.log(`Total: ${clientes.length} cliente(s)`);
}

// Funções auxiliares para formatação
function formatCPF(cpf: string): string {
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`.padEnd(12);
}

function formatPhone(phone: string): string {
    return phone.length === 11 ? 
        `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`.padEnd(12) :
        `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6)}`.padEnd(12);
}