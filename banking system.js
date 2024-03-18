
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

    get numeroConta(){
        return this.#numeroConta;
    }

    get nome(){
        return this.nomeUsuario;
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

class ContaCorrente extends Conta {
    #chequeEspecial;
    #taxaManutencao;

    static contasCorrente = [];

    constructor(nome,profissao,conta,saldo,chequeEspecial,taxaManutencao){
        super(nome,profissao,conta,saldo);
        this.#chequeEspecial = chequeEspecial;
        this.#taxaManutencao = taxaManutencao;
    }

    criarConta(){
        ContaCorrente.contasCorrente.push(this);
        return `Conta Criada com Sucesso para ${this.nomeUsuario}.`;   
    }

    gerenciarChequeEspecial(novoLimite){
        if (this.saldo > 100 && this.saldo > novoLimite && novoLimite >= 0) {
            this.#chequeEspecial += novoLimite;
            console.log(`
            Seu Limite aumentou!
            Novo Limite: ${this.#chequeEspecial}
            `);
        } else {
            console.log(`${this.nomeUsuario}, Você não tem limite Cheque Escpecial.`);
            return; 
        }
    }

    calcularTaxaManutencao(){
        if (this.saldo >= 1000 && this.saldo <= 10000) {
            this.#taxaManutencao = 5;
            console.log(`
            ${this.nome}
            Sua Taxa de Manutenção: R$${this.#taxaManutencao}
            `);
            console.log(``);
        } else if(this.saldo > 10000 && this.saldo <= 100000){
            this.#taxaManutencao = 10;
            console.log(`
            ${this.nome}
            Sua Taxa de Manutenção: R$${this.#taxaManutencao}
            `);
        } else {
            this.#taxaManutencao = 0;
            console.log(`
            ${this.nome}
            Sua Taxa de Manutenção: R$${this.#taxaManutencao}
            `);
        }
    }

    static listarTodasContasCorrrente(){
        console.log(this.contasCorrente);
    }
}

class ContaPoupanca extends Conta{
    #taxaJuros;
    #limiteSaque;

    static melhoresInvestimentos = ["Tesouro Direto", "Ações"];

    constructor(nome,profissao,conta,saldo,juros = 10,saque){
        super(nome,profissao,conta,saldo);
        this.#taxaJuros = juros;
        this.#limiteSaque =saque;
    }

    calcularJuros(juros){
        juros = this.saldo * (this.#taxaJuros /100);
        console.log(`
        ${this.nome}
        Juros da sua Conta: R$${juros.toFixed(2)}
        `);
        return juros;
    }

    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaque = novoLimite;
        console.log(`Limite de saques atualizado para R$${this.#limiteSaque}.`);
    }

    static verificarMelhorInvestimento() {
        return this.melhoresInvestimentos;
    }

}


// Parte 1: 

// Instancia as contas
const lucas = new Conta("Lucas","Analista de Sistemas",1234567, 7777);
const joao = new Conta("Joao","Pedreiro Digital", 123457, 1000);

// Cria as contas e adiciona no array Contas
console.log(lucas.criarConta());
console.log(joao.criarConta());

// Verifica o Extrato da Conta
lucas.checarExtrato();
joao.checarExtrato();

// Solicita um Emprestimo
lucas.solicitarEmprestimo(1000);
joao.solicitarEmprestimo(1001);

// Imprimir Instruções
Conta.imprimirInstruçoes();

// Parte 2:

// Instancia as contas
const lucasContaCorrente = new ContaCorrente("Lucas", "Analista de Sistemas", 1234567, 77770, 1000, 0);
const joaoContaCorrente = new ContaCorrente("Joao","Pedreiro Digital", 123457, 100, 0, 0);

// Cria as contas e adiciona no array contasCorrente
console.log(lucasContaCorrente.criarConta());
console.log(joaoContaCorrente.criarConta());

// Adiciona limite no cheque Especial
lucasContaCorrente.gerenciarChequeEspecial(100);
joaoContaCorrente.gerenciarChequeEspecial(10);

// Calcula a taxa de manutençao
lucasContaCorrente.calcularTaxaManutencao();
joaoContaCorrente.calcularTaxaManutencao();

// Lista todas as contas
console.log(ContaCorrente.listarTodasContasCorrrente());


// Parte 3: 

// Instancia as contas
const lucasContaPoupanca = new ContaPoupanca("Lucas", "Analista de Sistemas", 1234567, 77770);
const joaoContaPoupanca = new ContaPoupanca("Joao","Pedreiro Digital", 123457, 100);

// Calcula o Juros
lucasContaPoupanca.calcularJuros();
joaoContaPoupanca.calcularJuros();

// Altera o limite de saque
lucasContaPoupanca.gerenciarLimiteSaques(100);
joaoContaPoupanca.gerenciarLimiteSaques(10);

// exibe todas os melhores investimentos
console.log(ContaPoupanca.melhoresInvestimentos);

