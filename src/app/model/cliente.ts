export class Cliente {
    id: number;
    cpfCnpj: string = '';
    dataCadastro: Date
    nome: string = '';
    rgIe: string = '';
    // telefone: string = '';
    // telefone: [];
    telefone = [{}];
    ativo?: boolean;
    tipo?: string
    
}