import type { Especialidade } from "./types/especialidade";
import type { Paciente } from "./types/paciente";
import type { StatusConsulta } from "./types/statusConsulta";
import type { Medico } from "./interfaces/medico";
import type { Consulta } from "./interfaces/consulta";

// Especialidades
const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};

const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};

const pediatria: Especialidade = {
  id: 3,
  nome: "Pediatria",
};

// Médicos
const medico1: Medico = {
  id: 1,
  nome: "Dr. Rafael Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const medico2: Medico = {
  id: 2,
  nome: "Dra. Julia Costa",
  crm: "CRM54321",
  especialidade: ortopedia,
  ativo: true,
};

const medico3: Medico = {
  id: 3,
  nome: "Dr. Pedro",
  crm: "CRM98765",
  especialidade: pediatria,
  ativo: true,
};

// Pacientes
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos ",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};

const paciente2: Paciente = {
  id: 2,
  nome: "Rafaela Silva",
  cpf: "987.654.321-00",
  email: "rafa@email.com",
  telefone: "(11) 98765-4321",
};

const paciente3: Paciente = {
  id: 3,
  nome: "Vinicius Santos",
  cpf: "456.789.123-00",
  email: "vinicius@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number,
  observacoes?: string
): Consulta {

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

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }

  return {
    ...consulta,
    status: "cancelada",
  };
}

function realizarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "realizada",
  };
}

function exibirConsulta(consulta: Consulta): string {
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
Observações: ${consulta.observacoes ?? "Nenhuma"}
`;
}

function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((consulta) => consulta.status === status);
}

function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();

  hoje.setHours(0, 0, 0, 0);

  return consultas.filter((consulta) => consulta.data >= hoje);
}

function calcularFaturamento(consultas: Consulta[]): number {
  return consultas
    .filter((consulta) => consulta.status === "realizada")
    .reduce((total, consulta) => total + consulta.valor, 0);
}

const consultas: Consulta[] = [];

const consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date(2026, 1, 28),
  350,
  "Primeira consulta cardiológica"
);

const consulta2Base = criarConsulta(
  2,
  medico2,
  paciente2,
  new Date(2026, 2, 10),
  420,
  "Retorno ortopédico"
);

const consulta2 = confirmarConsulta(consulta2Base);

const consulta3Base = criarConsulta(
  3,
  medico3,
  paciente3,
  new Date(2026, 0, 15),
  300,
  "Consulta pediátrica de rotina"
);

const consulta3 = realizarConsulta(consulta3Base);

const consulta4Base = criarConsulta(
  4,
  medico1,
  paciente2,
  new Date(2026, 3, 5),
  500,
  "Avaliação cardíaca completa"
);

const consulta4Cancelada = cancelarConsulta(consulta4Base);

if (consulta4Cancelada === null) {
  throw new Error("Não foi possível cancelar a consulta 4.");
}

const consulta4 = consulta4Cancelada;

const consulta5Base = criarConsulta(
  5,
  medico2,
  paciente1,
  new Date(2026, 1, 5),
  380,
  "Avaliação ortopédica"
);

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

console.log(
  faturamento.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
);