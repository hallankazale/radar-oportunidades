import type { Opportunity } from "./types";

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Aquisição de materiais de limpeza e higiene",
    agency: "Prefeitura Municipal",
    city: "Campo Verde",
    state: "MT",
    category: "Limpeza",
    modality: "Pregão Eletrônico",
    value: 182000,
    deadline: "2026-10-08",
    source: "Fonte pública (demonstração)",
    sourceUrl: "https://www.gov.br/pncp/",
    demo: true
  },
  {
    id: "2",
    title: "Contratação de serviços de manutenção predial",
    agency: "Secretaria Municipal de Administração",
    city: "Rondonópolis",
    state: "MT",
    category: "Manutenção",
    modality: "Dispensa Eletrônica",
    value: 78000,
    deadline: "2026-10-02",
    source: "Fonte pública (demonstração)",
    sourceUrl: "https://www.gov.br/pncp/",
    demo: true
  },
  {
    id: "3",
    title: "Fornecimento de gêneros alimentícios",
    agency: "Secretaria Municipal de Educação",
    city: "Cuiabá",
    state: "MT",
    category: "Alimentação",
    modality: "Pregão Eletrônico",
    value: 430000,
    deadline: "2026-10-14",
    source: "Fonte pública (demonstração)",
    sourceUrl: "https://www.gov.br/pncp/",
    demo: true
  },
  {
    id: "4",
    title: "Aquisição de computadores e periféricos",
    agency: "Fundação Pública",
    city: "Primavera do Leste",
    state: "MT",
    category: "Tecnologia",
    modality: "Pregão Eletrônico",
    value: 265000,
    deadline: "2026-10-20",
    source: "Fonte pública (demonstração)",
    sourceUrl: "https://www.gov.br/pncp/",
    demo: true
  },
  {
    id: "5",
    title: "Serviço de transporte de passageiros",
    agency: "Consórcio Intermunicipal",
    city: "Chapada dos Guimarães",
    state: "MT",
    category: "Transporte",
    modality: "Concorrência",
    value: null,
    deadline: "2026-11-01",
    source: "Fonte pública (demonstração)",
    sourceUrl: "https://www.gov.br/pncp/",
    demo: true
  }
];
