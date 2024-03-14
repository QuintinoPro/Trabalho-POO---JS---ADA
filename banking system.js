
class Conta {
    nomeUsuario;
    profissaoUsuario;
    #numeroConta;
    #saldo;

    static contas = [ ];

    constructor(nome,profissao,conta,saldo){
        this.nomeUsuario = nome;
        this.profissaoUsuario = profissao;
        this.#numeroConta = conta;
        this.#saldo = saldo;
    }

    get saldo(){
        return this.#saldo;
    }

    get conta(){
        return this.#numeroConta;
    }

    criarConta(){
        Conta.contas.push(this);
        return `Conta Criada com Sucesso para ${this.nomeUsuario}.`;    
    }

    checarExtrato(){
        console.log(`
        Nome: ${this.nomeUsuario}
        Profissão: ${this.profissaoUsuario}
        Numero da Conta: ${this.#numeroConta}
        Saldo: R$${this.#saldo}
        `);
    }

    solicitarEmprestimo(valor){
        if (valor <= 0){
            console.log(`${this.nomeUsuario}, Valor inválido para empréstimo.`);
            return; 
        } else if (valor >= this.#saldo){
            console.log(`${this.nomeUsuario}, Emprestimo não aprovado!`);
            return; 
        } else {
            this.#saldo += valor;
            console.log(`
            ${this.nomeUsuario} Você Solicitou um empréstimo de R$${valor}.
            Novo Saldo: R$${this.#saldo}
            `);
        } 
    }

    static imprimirInstruçoes(){
        console.log(`
        Instruções:
        - Para criar uma conta, utilize o método criarConta().
        - Para checar o extrato da conta, utilize o método checarExtrato().
        - Para solicitar um empréstimo, utilize o método solicitarEmprestimo(valor).
        `);
    }
}

const lucas = new Conta("Lucas","Analista de Sistemas",1234567, 7777);
const joao = new Conta("Joao","Pedreiro Digital", 123457, 1000);

joao.criarConta();
console.log(lucas.criarConta());

console.log(Conta.contas);

Conta.imprimirInstruçoes();


