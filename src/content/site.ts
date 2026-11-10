/**
 * FONTE ÚNICA DE CONTEÚDO — RGóis Odontologia
 * ------------------------------------------------------------------
 * Nenhum componente deve ter texto "hardcoded": tudo vem daqui.
 * Itens marcados com `pendente: true` ou valores "TODO_CLINICA" dependem
 * de confirmação da clínica. Eles DEVEM ser renderizados normalmente
 * (com o texto provisório), mas nunca inventados além do que está aqui.
 *
 * Fontes: site atual (Canva), Instagram @rgoisodontologia,
 * @sou.rachel.emerick e ficha do Google (RGóis Consultório Odontológico).
 */

export const WHATSAPP_NUMBER = "5524981714542";

export const whatsappLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const MSG = {
  checkup:
    "Olá! Quero agendar um Check-up Inteligente e garantir meu Kit Premium!",
  avaliacao: "Olá! Vim pelo site e gostaria de agendar uma avaliação.",
  tratamento: (nome: string) =>
    `Olá! Vim pelo site e gostaria de saber mais sobre ${nome}.`,
  ebook: "Olá! Quero receber o e-book gratuito sobre saúde bucal.",
};

export const clinica = {
  nome: "RGóis Odontologia",
  nomeGoogle: "RGóis Consultório Odontológico",
  slogan: "Nossa família, cuidando da sua.",
  assinatura: "Do seu sorriso a gente cuida!",
  cidade: "Barra Mansa",
  uf: "RJ",
  telefoneExibicao: "(24) 98171-4542",
  avisoContato:
    "Atendemos por mensagem de texto ou áudio no WhatsApp. Nem sempre conseguimos atender ligações, mas respondemos o mais breve possível.",
  endereco: {
    logradouro: "Estr. Gov. Chagas Freitas, nº 2793 – Sala 2",
    bairro: "Colônia Santo Antônio",
    cidade: "Barra Mansa",
    uf: "RJ",
    cep: "27351-720",
    lat: -22.5373641,
    lng: -44.217086,
    mapsUrl: "https://maps.app.goo.gl/b4w3QfZ6QqT8xdi9A",
  },
  // `dow`: dias da semana cobertos pela linha (0 = domingo … 6 = sábado), para destacar "hoje"
  horarios: [
    { dias: "Segunda", dow: [1], horas: "15h às 19h" },
    { dias: "Terça a sexta", dow: [2, 3, 4, 5], horas: "9h às 19h" },
    { dias: "Sábado", dow: [6], horas: "9h às 12h" },
    { dias: "Domingo", dow: [0], horas: "Fechado" },
  ],
  // Formato schema.org para o JSON-LD
  openingHoursSpec: [
    { dayOfWeek: ["Monday"], opens: "15:00", closes: "19:00" },
    {
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],
  instagram: "https://www.instagram.com/rgoisodontologia/",
  instagramRachel: "https://www.instagram.com/sou.rachel.emerick/",
  ebookUrl: "https://bit.ly/GuiaSa%C3%BAdeBucalRG%C3%B3is",
  responsavelTecnico: {
    nome: "Dr. Rogério Góis",
    cro: "CRO-RJ TODO_CLINICA", // obrigatório em publicidade odontológica (CFO)
    pendente: true,
  },
};

export const seo = {
  title: "RGóis Odontologia | Dentista em Barra Mansa – RJ",
  description:
    "Consultório odontológico de família na Colônia, em Barra Mansa (RJ). Mais de 40 anos de experiência, atendimento humanizado, prevenção, próteses, clareamento e estética. Agende pelo WhatsApp.",
  siteUrl: "https://TODO_DOMINIO", // ex.: https://rgoisodontologia.com.br
  ogImage: "/og-image.jpg",
};

export const numeros = [
  { valor: 40, prefixo: "+", sufixo: "", rotulo: "anos lapidando sorrisos" },
  {
    valor: 5.0,
    prefixo: "",
    sufixo: "",
    decimais: 1,
    rotulo: "nota no Google",
    icone: "estrela",
  },
  { valor: 4, prefixo: "", sufixo: "", rotulo: "anos cuidando da Colônia" },
];

export const hero = {
  eyebrow: "Dentista em Barra Mansa · Colônia",
  titulo: "Nossa família,\ncuidando da sua.",
  subtitulo:
    "Tratamentos que devolvem saúde e confiança ao seu sorriso, com calma, explicação de cada etapa e sem tratamentos desnecessários.",
  ctaPrimario: { texto: "Agendar pelo WhatsApp", msg: MSG.avaliacao },
  ctaSecundario: { texto: "Conheça o Check-up Inteligente", href: "#checkup" },
  selos: [
    "Atendimento humanizado",
    "Ambiente climatizado",
    "Nota 5,0 no Google",
  ],
  // Recebe preload no build. Original em design/banner-original.png.
  foto: {
    src: "/images/hero-banner-768.webp",
    srcSet:
      "/images/hero-banner-480.webp 480w, /images/hero-banner-768.webp 768w",
    sizes: "(min-width: 1024px) 520px, min(calc(100vw - 40px), 448px)",
    width: 768,
    height: 1185,
    alt: "Letreiro dourado da RGóis Odontologia na parede azul do consultório",
  },
};

export const checkup = {
  eyebrow: "Programa exclusivo",
  titulo: "Check-up Inteligente",
  subtitulo:
    "Nosso programa de prevenção e manutenção do sorriso. Porque os problemas mais difíceis de tratar quase sempre começam pequenos.",
  // Itens inferidos do conteúdo publicado pela clínica; detalhes oficiais pendentes.
  itens: [
    {
      titulo: "Avaliação completa",
      texto:
        "Olhar atento para dentes, gengiva e mordida, para identificar problemas cedo.",
    },
    {
      titulo: "Profilaxia de verdade",
      texto:
        'Não é uma "limpezinha": é remover o que precisa, orientar e acompanhar.',
    },
    {
      titulo: "Plano honesto",
      texto:
        "Você entende o que precisa, o que pode esperar e o que não precisa fazer.",
    },
    {
      titulo: "Kit Premium",
      texto:
        "Ao agendar seu check-up, você garante o seu Kit Premium de cuidados.",
    },
  ],
  cta: { texto: "Quero meu Check-up + Kit Premium", msg: MSG.checkup },
  pendente: true, // conteúdo do Kit e do programa a confirmar com a clínica
};

export const tratamentos = [
  {
    id: "avaliacao",
    nome: "Avaliação odontológica",
    texto:
      "O primeiro passo de qualquer tratamento: entender a necessidade de cada sorriso.",
    icone: "stethoscope",
  },
  {
    id: "profilaxia",
    nome: "Limpeza e prevenção",
    texto:
      "Profilaxia cuidadosa para evitar tratamentos mais complexos e caros no futuro.",
    icone: "sparkles",
  },
  {
    id: "proteses",
    nome: "Próteses dentárias",
    texto:
      "Experiência de quem também é técnico em prótese: ajuste preciso e conforto para mastigar e sorrir.",
    icone: "smile",
  },
  {
    id: "clareamento",
    nome: "Clareamento dental",
    texto:
      "Avaliamos se o clareamento é indicado para você e conduzimos com segurança.",
    icone: "sun",
  },
  {
    id: "estetica",
    nome: "Odontologia estética",
    texto:
      "Mais confiança para sorrir, conversar, tirar fotos e voltar a se sentir bem.",
    icone: "gem",
  },
  {
    id: "extracoes",
    nome: "Extrações",
    texto:
      "Quando necessário, com calma, explicação de cada etapa e respeito ao seu ritmo.",
    icone: "shield",
  },
  // Possíveis serviços extras a confirmar (NÃO renderizar até confirmação):
  // implantes, ortodontia, endodontia (canal), odontopediatria
];
export const tratamentosHeader = {
  eyebrow: "Tratamentos",
  titulo: "Como podemos cuidar do seu sorriso",
};
export const tratamentosNota =
  "Não encontrou o que procura? Chame no WhatsApp e tire sua dúvida.";

export const historia = {
  eyebrow: "Bem-vindos à nossa história",
  titulo: "De protético a cirurgião-dentista",
  // Resumo provisório: a história completa do Dr. Rogério está pendente.
  resumo:
    "A trajetória do Dr. Rogério Góis começa na periferia de São Paulo e passa por mais de 40 anos de dedicação ao sorriso: primeiro como técnico em prótese, depois como cirurgião-dentista. Hoje, ao lado da família, ele cuida dos pacientes da Colônia, em Barra Mansa.",
  historiaCompletaPendente: true,
  carta: [
    "Quando começamos essa jornada, nosso maior sonho era oferecer um atendimento odontológico que fosse além da técnica: queríamos criar um espaço onde cada paciente se sentisse acolhido e valorizado.",
    "Hoje, olhando para trás, vemos que construímos algo ainda maior do que imaginamos. Aqui é nossa família cuidando da sua!",
    'Nossa meta não é bater meta, nem "vender" tratamentos agressivos e desnecessários. Nossa meta é ter pacientes satisfeitos e tranquilos, sabendo que sempre vamos oferecer o melhor para cada caso. Cada paciente é único.',
    "Esperamos que você se sinta em casa e venha fazer parte da nossa família. Afinal, cada sorriso que cuidamos é uma parte dessa história.",
  ],
  destaqueCarta: "Nossa meta não é bater meta.",
  assinatura: "Com carinho, Dr. Rogério, Rachel e Renata Góis",
};

export const familiaHeader = {
  eyebrow: "Quem cuida de você",
  titulo: "Uma família de dentistas",
};

export const familia = [
  {
    nome: "Dr. Rogério Góis",
    cargo: "Cirurgião-Dentista · Técnico em Prótese",
    foto: "/images/rogerio.webp",
    texto:
      "Com uma trajetória marcada pela paixão e pela dedicação à odontologia, o Dr. Rogério é o alicerce da clínica. Seu compromisso com a excelência e a humanização transforma cada consulta em uma experiência pautada em segurança, paciência e compreensão.",
  },
  {
    nome: "Rachel Emerick Góis",
    cargo: "Técnica em Saúde Bucal · Dentista em formação",
    foto: "/images/rachel.webp",
    instagram: "https://www.instagram.com/sou.rachel.emerick/",
    texto:
      "Responsável pelo bem-estar dos pacientes e pela organização do consultório, une conhecimento técnico a um cuidado especial com cada pessoa, porque técnica a gente aprende, mas enxergar o que o outro precisa é outra história.",
  },
  {
    nome: "Renata Góis",
    cargo: "Futura Cirurgiã-Dentista",
    foto: "/images/renata.webp",
    texto:
      "Cresceu vendo a dedicação dos pais à odontologia e, desde cedo, desenvolveu um profundo amor pela profissão e pelos pacientes. É a próxima geração do legado da família Góis.",
  },
];

export const filosofia = {
  eyebrow: "Nossa filosofia de atendimento",
  titulo: "Acolher, Tratar e Transformar",
  intro:
    "Quando um paciente entra no nosso consultório, ele não é apenas mais um nome na agenda. É alguém que confia em nós para cuidar do seu sorriso, e essa confiança merece um atendimento à altura.",
  pilares: [
    {
      titulo: "Acolher",
      texto:
        "Do café servido na recepção à conversa atenta sobre suas expectativas. Cada detalhe faz diferença.",
    },
    {
      titulo: "Tratar",
      texto:
        "Com calma, no seu ritmo, explicando cada procedimento. Qualidade não é luxo, é o mínimo que oferecemos.",
    },
    {
      titulo: "Transformar",
      texto:
        "Fazer da ida ao dentista uma experiência positiva, sem medo e sem desconforto. Aqui, cada paciente é tratado como rei ou rainha.",
    },
  ],
};

export const consultorio = {
  eyebrow: "O consultório",
  titulo: "Um espaço pensado para você se sentir em casa",
  texto:
    "Ambiente climatizado, limpo e acolhedor, com aquele café expresso esperando por você.",
  fotos: [
    {
      src: "/images/consultorio-1.webp",
      alt: "Cadeira odontológica e parede verde do consultório RGóis",
    },
    {
      src: "/images/consultorio-2.webp",
      alt: "Sala de atendimento iluminada do consultório RGóis",
    },
    { src: "/images/consultorio-3.webp", alt: "Detalhe do consultório RGóis" },
  ],
};

export const depoimentos = {
  eyebrow: "Quem é paciente, indica",
  titulo: "Nota 5,0 no Google",
  totalAvaliacoes: 17,
  googleUrl: "https://maps.app.goo.gl/b4w3QfZ6QqT8xdi9A",
  // Avaliações públicas reais do Google (texto levemente revisado só na pontuação).
  // Nomes dos autores: preencher com o primeiro nome se a clínica autorizar.
  itens: [
    {
      texto:
        "Nunca fui tratada com tanto carinho, paciência e atenção em um consultório odontológico. Sempre tive medo de dentista, mas aqui perdi completamente o medo. Extraí um dente, troquei as próteses, que ficaram muito bem ajustadas. Muita gratidão, Dr. Rogério e equipe!",
      autor: "Paciente via Google",
    },
    {
      texto:
        "De todos os dentistas que já fui, o Dr. Rogério é de longe o mais atencioso. Te trata com paciência, de acordo com o seu ritmo, sem pressa. Nem parece que está no dentista! Indico para todos os meus amigos e familiares.",
      autor: "Paciente via Google",
    },
    {
      texto:
        "Melhor atendimento que já tive. Super atencioso e explica todo procedimento, sem contar que o ambiente é top.",
      autor: "Paciente via Google",
    },
    {
      texto:
        "Excelente atendimento, desde a entrada com aquele expresso esperto até a finalização do tratamento! Profissionais de primeira qualidade.",
      autor: "Paciente via Google",
    },
    {
      texto:
        "Consultório excelente! Ótimo atendimento! Me senti muito acolhida! Estão de parabéns!",
      autor: "Paciente via Google",
    },
  ],
};

export const ebook = {
  eyebrow: "Material gratuito",
  titulo: "Guia de Saúde Bucal RGóis",
  texto:
    "Muitos problemas da boca são mais fáceis de resolver do que você imagina. Criamos um e-book educativo para tirar suas dúvidas.",
  cta: "Acessar o e-book",
};

export const faqHeader = {
  eyebrow: "Dúvidas frequentes",
  titulo: "Perguntas que sempre recebemos",
};

export const faq = [
  {
    p: "Vocês atendem por telefone?",
    r: "Preferimos mensagem de texto ou áudio no WhatsApp (24) 98171-4542. Nem sempre conseguimos atender ligações, mas respondemos o mais breve possível.",
  },
  {
    p: "Quanto custa uma limpeza?",
    r: "Depende da necessidade de cada paciente: a quantidade de tártaro e o tempo para um trabalho cuidadoso variam. Por isso o primeiro passo é sempre uma avaliação.",
  },
  {
    p: "Tenho medo de dentista. Posso ir mesmo assim?",
    r: "Pode, e muitos pacientes chegam assim. Trabalhamos no seu ritmo, explicamos cada etapa e você nunca é pressionado a fazer algo desnecessário.",
  },
  {
    p: "Onde fica o consultório?",
    r: "Na Estr. Gov. Chagas Freitas, nº 2793, Sala 2, Colônia Santo Antônio, Barra Mansa (RJ).",
  },
];

export const nav = [
  { label: "Check-up", href: "#checkup" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Nossa história", href: "#historia" },
  { label: "Família", href: "#familia" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export const contato = {
  eyebrow: "Contato",
  titulo: "Venha nos visitar",
  horariosTitulo: "Horários de atendimento",
  hoje: "Hoje",
  mapaTitulo: "Mapa com a localização do consultório RGóis em Barra Mansa",
};

/**
 * Strings de interface (botões, rótulos, textos acessíveis).
 * Também é conteúdo: nenhum componente escreve texto fora daqui.
 */
export const ui = {
  pularConteudo: "Pular para o conteúdo",
  agendar: "Agendar",
  menuAbrir: "Abrir menu",
  menuFechar: "Fechar menu",
  saberMais: "Saber mais",
  chamarWhatsapp: "Chamar no WhatsApp",
  abrirMaps: "Abrir no Google Maps",
  verAvaliacoes: "Ver avaliações no Google",
  avaliacoesNoGoogle: (n: number) => `${n} avaliações no Google`,
  notaAria: "Nota 5 de 5",
  fabAria: "Agendar pelo WhatsApp",
  fotoEmBreve: "Foto em breve",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  responsavelTecnico: "Responsável técnico",
  direitos: (ano: number) => `© ${ano} RGóis Odontologia`,
  abreEmNovaAba: "(abre em nova aba)",
  navAria: "Navegação principal",
  irPara: (nome: string) => `Ver ${nome}`,
  cep: "CEP",
  telefone: "Telefone e WhatsApp",
  endereco: "Endereço",
};
