"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Especialidades
const cardiologia = {
    id: 1,
    nome: "Cardiologia",
};
const ortopedia = {
    id: 2,
    nome: "Ortopedia",
    descricao: "Tratamento de ossos e articulações",
};
const pediatria = {
    id: 3,
    nome: "Pediatria",
};
// Médicos
const medico1 = {
    id: 1,
    nome: "Dr. Gilberto Silva",
    crm: "CRM14385",
    especialidade: cardiologia,
    ativo: true,
};
const medico2 = {
    id: 2,
    nome: "Dra. Julia Costa",
    crm: "CRM58621",
    especialidade: ortopedia,
    ativo: true,
};
const medico3 = {
    id: 3,
    nome: "Dr. Rafael Mendes",
    crm: "CRM62765",
    especialidade: pediatria,
    ativo: true,
};
// Pacientes
const paciente1 = {
    id: 1,
    nome: "Carlos",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
};
const paciente2 = {
    id: 2,
    nome: "Rafaela Silva",
    cpf: "987.654.321-00",
    email: "rafa@email.com",
    telefone: "(11) 98765-4321",
};
const paciente3 = {
    id: 3,
    nome: "Julio Santos",
    cpf: "456.789.123-00",
    email: "julio@email.com",
};
function criarConsulta(id, medico, paciente, data, valor, observacoes) {
    return {
        id,
        medico,
        paciente,
        data,
        valor,
        status: "agendada",
        observacoes,
    };
}
function confirmarConsulta(consulta) {
    return Object.assign(Object.assign({}, consulta), { status: "confirmada" });
}
function cancelarConsulta(consulta) {
    if (consulta.status === "realizada") {
        return null;
    }
    return Object.assign(Object.assign({}, consulta), { status: "cancelada" });
}
function realizarConsulta(consulta) {
    return Object.assign(Object.assign({}, consulta), { status: "realizada" });
}
function exibirConsulta(consulta) {
    var _a;
    const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
Observações: ${(_a = consulta.observacoes) !== null && _a !== void 0 ? _a : "Nenhuma"}
`;
}
function listarConsultasPorStatus(consultas, status) {
    return consultas.filter((consulta) => consulta.status === status);
}
function listarConsultasFuturas(consultas) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return consultas.filter((consulta) => consulta.data >= hoje);
}
function calcularFaturamento(consultas) {
    return consultas
        .filter((consulta) => consulta.status === "realizada")
        .reduce((total, consulta) => total + consulta.valor, 0);
}
const consultas = [];
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(2026, 1, 28), 350, "Primeira consulta cardiológica");
const consulta2Base = criarConsulta(2, medico2, paciente2, new Date(2026, 2, 10), 420, "Retorno ortopédico");
const consulta2 = confirmarConsulta(consulta2Base);
const consulta3Base = criarConsulta(3, medico3, paciente3, new Date(2026, 0, 15), 300, "Consulta pediátrica de rotina");
const consulta3 = realizarConsulta(consulta3Base);
const consulta4Base = criarConsulta(4, medico1, paciente2, new Date(2026, 3, 5), 500, "Avaliação cardíaca completa");
const consulta4Cancelada = cancelarConsulta(consulta4Base);
if (consulta4Cancelada === null) {
    throw new Error("Não foi possível cancelar a consulta 4.");
}
const consulta4 = consulta4Cancelada;
const consulta5Base = criarConsulta(5, medico2, paciente1, new Date(2026, 1, 5), 380, "Avaliação ortopédica");
const consulta5 = realizarConsulta(consulta5Base);
consultas.push(consulta1);
consultas.push(consulta2);
consultas.push(consulta3);
consultas.push(consulta4);
consultas.push(consulta5);
console.log("=== TODAS AS CONSULTAS ===");
consultas.forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});
console.log("=== CONSULTAS CONFIRMADAS ===");
const consultasConfirmadas = listarConsultasPorStatus(consultas, "confirmada");
consultasConfirmadas.forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});
console.log("=== CONSULTAS FUTURAS ===");
const consultasFuturas = listarConsultasFuturas(consultas);
consultasFuturas.forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});
console.log("=== FATURAMENTO ===");
const faturamento = calcularFaturamento(consultas);
console.log(faturamento.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
}));