// Portuguese pack: full UI dictionary + sim content.
window.I18n.registerPack("pt", { dict: {
  // HUD
  "hud.sys": "SIS · NOMINAL",
  "hud.net": "REDE · ONLINE",
  "hud.ctrl": "CTRL · MISSÃO",
  "hud.loc": "CABO CANAVERAL",
  "hud.mute.on": "Som ligado — clica para silenciar",
  "hud.mute.off": "Som desligado — clica para ativar",
  "hud.lang": "Mudar de idioma",

  // Hero
  "hero.eyebrow": "Briefing de Missão · Vol. 09",
  "hero.title.1": "A descolagem",
  "hero.title.2": "começa no",
  "hero.title.3": "teu ecrã.",
  "hero.lede.html": "Nove simuladores de foguetes, escolhidos a dedo. De <strong>foguetes de modelismo na mesa da cozinha</strong> a <strong>cabines Apollo completas</strong> — os que merecem o teu tempo, ordenados por um obcecado que já espatifou milhares de foguetes virtuais para que não tenhas de o fazer.",
  "hero.cta.launch": "Lançar o Índice",
  "hero.cta.briefing": "Briefing do Dia",
  "hero.cta.quiz": "Encontrar o Meu Sim",
  "hero.cta.compare": "Comparar Sims",

  // Sections
  "news.label": "// SINAL EM DIRETO",
  "news.title": "Briefing de Missão",
  "news.sub": "Notícias reais de voos espaciais de todo o mundo, atualizadas diariamente.",
  "news.updated": "Atualizado",
  "news.cached": "em cache",
  "news.live": "em direto",
  "news.offline": "feed offline",
  "news.allSources": "Todas as Fontes",
  "news.refresh": "Forçar Atualização",
  "news.loading": "A estabelecer ligação com as estações de terra...",
  "news.error": "Nenhuma transmissão recebida. Verifica a ligação.",

  "launches.label": "// AGENDA T-MENOS",
  "launches.title": "Próximos Lançamentos",
  "launches.sub": "Contagens decrescentes em direto para as próximas missões nas plataformas de todo o mundo. Estado, veículo, missão e órbita a partir do feed público Launch Library 2.",
  "launches.refresh": "Atualizar Agenda",
  "launches.auto": "Atualização automática a cada hora · Fonte: The Space Devs",
  "launches.loading": "A carregar a agenda de lançamentos...",
  "launches.none": "Sem missões próximas na agenda.",
  "launches.tbd": "DATA POR CONFIRMAR",
  "launches.netLbl": "NET",
  "launches.padLbl": "Plataforma",
  "launches.orbitLbl": "Órbita",
  "launches.recent.title": "Resultados Recentes",
  "launches.recent.success": "SUCESSO",
  "launches.recent.failure": "FALHA",
  "launches.recent.partial": "PARCIAL",

  "spotlight.label": "// SIM DO DIA",

  "dv.label": "// COMPUTADOR DE VOO",
  "dv.title": "A Calculadora de Δv",
  "dv.sub": "A equação do foguete de Tsiolkovsky, em direto. Arrasta os cursores e vê até onde o teu foguete poderia chegar.",
  "dv.isp": "Impulso específico (Isp)",
  "dv.wet": "Massa húmida (m₀)",
  "dv.dry": "Massa seca (m_f)",
  "dv.result": "Δv total",
  "dv.note": "Estágio único idealizado no vácuo — sem arrasto, sem perdas por gravidade, sem separação de estágios. Os foguetes reais fazem batota com os estágios.",
  "dv.th.leo": "Órbita terrestre baixa",
  "dv.th.gto": "Transferência GTO",
  "dv.th.tli": "Injeção translunar",
  "dv.th.mars": "Transferência para Marte",
  "dv.reached": "GO",
  "dv.missing": "faltam {n} m/s",

  // Launch statistics
  "stats.label": "// REGISTOS DE VOO",
  "stats.title": "Estatísticas de Lançamento",
  "stats.sub": "Quanta atividade há nas plataformas de todo o mundo? Uma década de tentativas de lançamento orbital, compilada a partir de registos públicos.",
  "stats.note": "Números aproximados · 2016–2025 curados, ano atual em direto",
  "stats.ytd": "acumulado do ano",
  "stats.tile.attempts": "Tentativas orbitais · 2025",
  "stats.tile.attempts.detail": "todo o mundo, todos os operadores",
  "stats.tile.ytd": "Tentativas orbitais · acumulado de {y}",
  "stats.live": "em direto · The Space Devs",
  "stats.tile.rate": "Taxa de sucesso · 2025",
  "stats.tile.growth": "Crescimento do tráfego",
  "stats.tile.vehicle": "Veículo mais lançado · 2025",
  "stats.tile.vehicle.detail": "~140 voos num ano",
  "stats.chart.year.title": "Tentativas de lançamento orbital por ano",
  "stats.chart.year.sub": "Todo o mundo · 2016–2025",
  "stats.chart.country.title": "Tentativas de 2025 por país",
  "stats.chart.country.sub": "Segundo o país de origem do operador",
  "stats.attempts": "Tentativas",
  "stats.successes": "Sucessos",
  "stats.share": "Quota",
  "stats.table.show": "Ver tabela de dados",
  "stats.table.hide": "Ocultar tabela de dados",
  "stats.table.year": "Ano",
  "stats.table.country": "País",
  "country.usa": "Estados Unidos",
  "country.china": "China",
  "country.russia": "Rússia",
  "country.india": "Índia",
  "country.japan": "Japão",
  "country.europe": "Europa",
  "country.iran": "Irão",
  "country.other": "Outros",

  "manifest.label": "// 09 ENTRADAS",
  "manifest.title": "O Manifesto de Lançamento",
  "manifest.sub": "Clica em qualquer entrada para abrir a ficha de missão completa. Filtra por categoria, analisa as especificações e mergulha a fundo. Sem links de afiliados, sem patrocínios, sem palha.",
  "manifest.search": "Pesquisar por nome, etiqueta ou palavra-chave…",
  "manifest.searchClear": "Limpar pesquisa",
  "manifest.empty": "Sem resultados. Tenta outra pesquisa ou outro filtro.",
  "filter.all": "Todos os Sistemas",
  "filter.model": "Modelismo",
  "filter.space": "Espaço",
  "filter.game": "Jogo",
  "filter.free": "Grátis",
  "filter.realistic": "Hiper-realista",
  "card.open": "Abrir Ficha de Missão",

  // Detail
  "detail.back": "← Voltar ao Manifesto",
  "detail.share": "Partilhar",
  "detail.shared": "Link copiado!",
  "detail.lbl.developer": "Desenvolvedor",
  "detail.lbl.released": "Lançamento",
  "detail.lbl.price": "Preço",
  "detail.lbl.platforms": "Plataformas",
  "detail.lbl.requires": "Requisitos",
  "detail.lbl.rating": "Avaliação",
  "detail.cta": "Visitar o Site Oficial",
  "detail.section.brief": "Briefing de Missão",
  "detail.section.bestFor": "Ideal Para",
  "detail.section.profile": "Perfil do Sistema",
  "detail.section.prosCons": "Pontos Fortes e Compromissos",
  "detail.section.facts": "Factos Rápidos",
  "detail.section.related": "Sistemas Relacionados",
  "detail.rating.realism": "Realismo",
  "detail.rating.depth": "Profundidade",
  "detail.rating.accessibility": "Acessibilidade",
  "detail.rating.learningCurve": "Facilidade de Entrada",
  "detail.rating.community": "Comunidade",
  "detail.pros": "+ Pontos Fortes",
  "detail.cons": "− Compromissos",

  // Quiz
  "quiz.title": "Encontra o Teu Sim",
  "quiz.sub": "Três perguntas. Uma recomendação.",
  "quiz.q1": "Qual é o teu orçamento?",
  "quiz.q1.free": "Só grátis",
  "quiz.q1.either": "Grátis ou pago — ganha a melhor ferramenta",
  "quiz.q1.paid": "Pago não é problema, se valer a pena",
  "quiz.q2": "Que tipo de foguetes?",
  "quiz.q2.model": "Foguetes de modelismo reais que possa lançar",
  "quiz.q2.space": "Voo espacial e mecânica orbital",
  "quiz.q2.both": "Ambos / não sei bem",
  "quiz.q3": "O teu nível de experiência?",
  "quiz.q3.new": "Principiante — quero algo acessível",
  "quiz.q3.some": "Alguma base — pronto para aprender",
  "quiz.q3.expert": "Veterano — atira-me para o fundo da piscina",
  "quiz.result": "O teu match",
  "quiz.why": "Porquê este",
  "quiz.runners": "Considera também",
  "quiz.retake": "Repetir o questionário",
  "quiz.open": "Abrir Ficha",
  "quiz.close": "Fechar",

  // Compare
  "compare.title": "Frente a Frente",
  "compare.sub": "Escolhe dois sistemas e inspeciona-os lado a lado.",
  "compare.swap": "Trocar",
  "compare.share": "Partilhar comparação",
  "compare.pickA": "Sistema A",
  "compare.pickB": "Sistema B",

  // Launch overlay
  "launch.armed": "SISTEMAS ARMADOS",
  "launch.tminus": "T-MENOS · {n}",
  "launch.mainEngine": "IGNIÇÃO DO MOTOR PRINCIPAL",
  "launch.ignition": "IGNIÇÃO",
  "launch.liftoffNominal": "DESCOLAGEM · TODOS OS MOTORES NOMINAIS",
  "launch.liftoff": "DESCOLAGEM",
  "launch.stageOk": "ESTÁGIO 1 · NOMINAL",
  "launch.stageArmed": "ESTÁGIO 1 · ARMADO",
  "launch.ignitionGo": "IGNIÇÃO · GO",
  "launch.liftoffGo": "DESCOLAGEM · GO",
  "launch.fuel": "COMBUSTÍVEL · {pct}%",
  "launch.guidanceInt": "GUIAMENTO · INTERNO",
  "launch.guidanceAligned": "GUIAMENTO · ALINHADO",
  "launch.guidanceLocked": "GUIAMENTO · BLOQUEADO",
  "launch.trajectory": "TRAJETÓRIA · NOMINAL",

  // Settings
  "hud.settings": "Definições",
  "settings.title": "Definições",
  "settings.sub": "Ajusta a experiência ao teu gosto. Guardado localmente.",
  "settings.lang": "Idioma",
  "settings.sound": "Som",
  "settings.sound.on": "Ligado",
  "settings.sound.off": "Desligado",
  "settings.volume": "Volume",
  "settings.motion": "Animações",
  "settings.motion.full": "Completas",
  "settings.motion.reduced": "Reduzidas",
  "settings.density": "Densidade de estrelas",
  "settings.density.off": "Desligado",
  "settings.density.low": "Baixa",
  "settings.density.med": "Média",
  "settings.density.high": "Alta",
  "settings.accent": "Cor de destaque",
  "settings.accent.orange": "Laranja",
  "settings.accent.cyan": "Ciano",
  "settings.accent.green": "Verde",
  "settings.close": "Fechar",
  "settings.reset": "Repor predefinições",

  // Time-ago (relative time)
  "time.justNow": "agora mesmo",
  "time.sec": "há {n}s",
  "time.min": "há {n}m",
  "time.hour": "há {n}h",
  "time.day": "há {n}d",

  // Boot loader
  "boot.brand": "LIFTOFF",
  "boot.tagline": "A INICIAR SISTEMAS",
  "boot.step.1": "ARRANQUE · A VERIFICAR SUBSISTEMAS",
  "boot.step.2": "COMMS · A ESTABELECER LIGAÇÃO",
  "boot.step.3": "TELEMETRIA · BLOQUEADA",
  "boot.step.4": "NOMINAL · PRONTO",

  // Footer
  "footer.eot": "FIM DA TRANSMISSÃO · 2026 · FEITO PARA MENTES CURIOSAS",
  "footer.verify": "verifica preços e disponibilidade antes de comprar"
}, sims: {
  "kerbal-space-program": {
    "tagline": "Construir · Lançar · Explodir · Aprender",
    "shortDesc": "A porta de entrada para a mecânica orbital. Amarra alienígenas verdes a engenharia duvidosa e descobre o Δv da maneira difícil. Continua a ser a melhor rampa de acesso à verdadeira ciência dos foguetes alguma vez criada.",
    "longDesc": [
      "O KSP é o simulador que ensinou a uma geração o que é realmente uma órbita. Constróis foguetes com peças estilo LEGO num hangar e depois pilota-los com um modelo físico newtoniano a sério — a gravidade, o arrasto atmosférico e a aritmética cruel da equação do foguete de Tsiolkovsky são todos simulados com honestidade.",
      "O que o torna especial não é o realismo por si só (já foi batido nesse eixo), mas o ciclo: desenhar, falhar, iterar. Cada falha catastrófica ensina algo verdadeiro sobre o voo espacial real. Engenheiros do JPL da NASA e da SpaceX já o citaram publicamente como um excelente construtor de intuição.",
      "A cena de mods é enorme e continua bem viva. O Real Solar System transforma-o num simulador hiper-realista de órbita terrestre; o kOS acrescenta pilotos automáticos programáveis; o Realism Overhaul muda todas as constantes para valores do mundo real. Podes passar mil horas e ainda encontrar cantos novos."
    ],
    "pros": [
      "O melhor construtor de intuição para a mecânica orbital real, ponto final",
      "Ecossistema de mods gigantesco — mais de uma década de conteúdo da comunidade",
      "Opções de dificuldade tolerantes para principiantes, realismo brutal para veteranos",
      "Recomendado por engenheiros aeroespaciais no ativo",
      "O modo carreira acrescenta orçamentos, contratos e progressão"
    ],
    "cons": [
      "Motor Unity envelhecido — o desempenho sofre com naves grandes",
      "O desenvolvimento do KSP 2 foi cancelado, deixando as esperanças de sequela no limbo",
      "A interface parece datada e não é simpática ao primeiro contacto"
    ],
    "bestFor": "Qualquer pessoa que alguma vez se perguntou como funcionam realmente os foguetes e quer descobrir fazendo explodir alguns.",
    "quickFacts": [
      "Usado pelo JPL da NASA em divulgação educativa",
      "Cálculos reais de Δv regidos pela equação de Tsiolkovsky",
      "Comunidade de modding ativa desde 2011",
      "O modo carreira inclui ciência, contratos e orçamentos",
      "Multijogador disponível através do mod Dark Multiplayer"
    ]
  },
  "openrocket": {
    "tagline": "Grátis, open source, de uma precisão mortífera",
    "shortDesc": "O padrão do foguetemodelismo. Desenha um foguete, simula o voo com modelos atmosféricos reais e prevê o apogeu com margem de metros. Usado por clubes e competições em todo o mundo.",
    "longDesc": [
      "O OpenRocket é a ferramenta de design e simulação de facto da comunidade de foguetemodelismo. Feito em Java, grátis e open source, oferece simulação de voo com 6 graus de liberdade, aerodinâmica realista, modelos atmosféricos e análise de estabilidade pelo método de Barrowman.",
      "Se constróis foguetes de cartão e balsa na mesa da cozinha — ou aves de alta potência em fibra de vidro e compósito — o OpenRocket é a primeira ferramenta a que deitas a mão. A biblioteca de componentes cobre praticamente todos os motores disponíveis no mercado (CTI, Aerotech, Estes, Klima) e atualiza-se regularmente através de um formato de ficheiro .ork mantido pela comunidade.",
      "Os clubes de lançamento usam-no nas verificações de segurança pré-voo. As organizações nacionais de foguetemodelismo reconhecem as suas previsões. As equipas de competição desenham nele os projetos inteiros. O facto de ser grátis torna-se genuinamente surpreendente quando percebes quanto trabalho de engenharia ali foi investido."
    ],
    "pros": [
      "Grátis e open source — por completo",
      "Precisão preditiva comparável às ferramentas comerciais pagas",
      "Enorme base de dados de motores e componentes, em atualização constante",
      "Usado em voos reais de certificação em todo o mundo",
      "Desenvolvimento ativo e builds de CI disponíveis"
    ],
    "cons": [
      "A interface Java parece fora de moda em sistemas modernos",
      "Documentação mantida pela comunidade — a qualidade varia",
      "Não simula superfícies de controlo ativas complexas"
    ],
    "bestFor": "Qualquer pessoa que construa foguetes de modelismo ou de alta potência reais e precise de previsões a sério de apogeu e estabilidade.",
    "quickFacts": [
      "Open source sob licença GPLv3",
      "Simulação de voo com 6 graus de liberdade",
      "Reconhecido pela Tripoli e pela NAR para análise pré-voo",
      "Vento, pressão atmosférica e efeitos de Coriolis modelados",
      "Exporta para o formato RockSim para compatibilidade entre ferramentas"
    ]
  },
  "juno-new-origins": {
    "tagline": "SimpleRockets 2, já crescido",
    "shortDesc": "Constrói qualquer foguete, avião ou rover com um editor peça a peça e motores programáveis em Lua. O ponto ideal entre o caos do KSP e a seriedade do OpenRocket.",
    "longDesc": [
      "Lançado originalmente como SimpleRockets 2 em 2018, o jogo foi renomeado Juno: New Origins para refletir o quanto cresceu. Onde o KSP te dá peças predefinidas para aparafusar, o Juno entrega-te tudo procedural — depósitos de combustível com qualquer forma, ogivas de curvas personalizadas, motores totalmente configuráveis com comportamento programável em Lua.",
      "Coça uma comichão diferente da do KSP. O espírito é engenharia primeiro, em vez de falha-cómica primeiro. Os sistemas solares são maiores, os planetas mais vastos e as naves que podes construir são genuinamente enormes. O Juno também corre bem em telemóveis e tablets, coisa rara num sim com esta profundidade.",
      "O multijogador e uma comunidade de partilha de naves mantêm o interesse depois da campanha. Se achas o KSP encantador mas limitado, esta é a sequela que o KSP 2 devia ter sido."
    ],
    "pros": [
      "Design procedural de peças — constrói qualquer coisa, com qualquer forma",
      "Scripting em Lua para motores, pilotos automáticos e eletrónica",
      "Corre bem em tablets e telemóveis",
      "Multijogador ativo e comunidade de partilha de naves",
      "Sistema solar maior e mais detalhado do que o do KSP 1"
    ],
    "cons": [
      "Cena de modding mais pequena do que a do KSP",
      "Algumas funções avançadas têm uma interface mais íngreme do que seria de esperar",
      "As versões móveis ficam ocasionalmente atrás da versão PC"
    ],
    "bestFor": "Para quem adora desenhar cada parafuso e quer que o seu trabalho corra no comboio.",
    "quickFacts": [
      "Depósitos de combustível, ogivas e motores procedurais",
      "Ambiente de scripting Lua integrado",
      "Partilha de naves entre plataformas",
      "Opção de sistema solar à escala real",
      "Renomeado de SimpleRockets 2 em 2023"
    ]
  },
  "orbiter": {
    "tagline": "O sim espacial de culto",
    "shortDesc": "Física newtoniana, naves reais (Shuttle, Soyuz, Apollo) e uma comunidade que acrescenta mods há duas décadas. Curva de aprendizagem íngreme. Recompensa sem fundo.",
    "longDesc": [
      "O Orbiter começou em 2000 como projeto de uma só pessoa, o físico Martin Schweiger. Duas décadas e meia depois é um padrão de culto — um sim espacial grátis, de física dura, onde cada nave é uma nave real, cada painel de cockpit é funcional e cada órbita é calculada a partir de mecânica newtoniana honesta.",
      "O sim base traz conteúdo modesto; a magia está nos addons. As comunidades reconstruíram meticulosamente todo o programa Apollo, o Space Shuttle (com os sistemas completos), a Soyuz, a ISS e até o futuro hardware do Artemis. Há um addon para quase todas as naves reais que alguma vez voaram.",
      "Não é um jogo no sentido convencional. Não há missões, nem objetivos, nem pontuação. Montas um cenário — digamos, uma queima de TLI a partir de órbita terrestre baixa — e voas. Parece árido, até passares seis horas a levar um CSM Apollo até à órbita lunar à mão e a experiência se transformar em algo próximo do religioso."
    ],
    "pros": [
      "Física newtoniana dura, sem atalhos",
      "Grátis e open source desde 2021",
      "Biblioteca de mods gigantesca que cobre quase todas as naves reais",
      "Comunidade de culto com conhecimento técnico profundo",
      "Fidelidade de cockpit a roçar o nível de estudo"
    ],
    "cons": [
      "Curva de aprendizagem brutal — conta com dias, não horas",
      "Só para Windows",
      "Conteúdo por defeito mínimo sem mods",
      "Interface funcional em vez de polida"
    ],
    "bestFor": "Puristas do voo espacial que querem pilotar naves reais com física real, sem concessões.",
    "quickFacts": [
      "Passou a open source em 2021",
      "Comunidade ativa desde 2000",
      "Addons de Apollo, Shuttle, Soyuz e ISS disponíveis",
      "Física realista de reentrada atmosférica",
      "Compatível com hardware de cockpit virtual"
    ]
  },
  "rocksim": {
    "tagline": "Ferramenta pro para voos de alta potência",
    "shortDesc": "O sim comercial da Apogee Components — o padrão para voos de certificação Tripoli/NAR. Prevê estabilidade, recuperação e altitude para projetos amadores a sério.",
    "longDesc": [
      "O RockSim é o simulador comercial de foguetemodelismo há mais tempo no ativo, vendido pela Apogee Components desde o final dos anos 1990. Onde o OpenRocket é o padrão gratuito, o RockSim é o pago com que muitos foguetistas de alta potência cresceram e em que ainda confiam para voos de certificação.",
      "Entre os pontos fortes contam-se um fluxo de design refinado, uma base de dados de motores extensa (e curada) e bons relatórios para documentar voos junto dos oficiais de segurança NAR/Tripoli. Muitos locais de lançamento ainda pedem ficheiros RockSim no check-in.",
      "Não é grátis, a interface mostra a idade e o OpenRocket já o apanhou na maioria das frentes. Mas para os amadores que já o possuem, ou para clubes cujos fluxos de trabalho se construíram à sua volta, o RockSim continua a ser a escolha segura."
    ],
    "pros": [
      "Padrão da indústria para documentação de certificação de alta potência",
      "Base de dados de motores polida, curada pela Apogee",
      "Bom fluxo de design e de relatórios",
      "Longa história — bem conhecido dos oficiais de segurança de voo"
    ],
    "cons": [
      "Pago — e o OpenRocket faz a maior parte do mesmo de graça",
      "Só para Windows",
      "Interface datada"
    ],
    "bestFor": "Foguetistas de alta potência que precisam de documentação polida para voos de certificação L1/L2/L3.",
    "quickFacts": [
      "Usado em voos de certificação NAR/Tripoli",
      "Base de dados comercial de motores curada",
      "Importa/exporta ficheiros OpenRocket",
      "Desenvolvimento contínuo desde 1998"
    ]
  },
  "spaceflight-simulator": {
    "tagline": "Foguetes de bolso",
    "shortDesc": "Começa com um Mercury-Redstone, acaba a aterrar em Eeloo. Acessível no telemóvel mas mais profundo do que parece — a versão grátis é genuinamente jogável.",
    "longDesc": [
      "O Spaceflight Simulator é a improvável história de sucesso móvel dos sims de foguetes indie. Stefo Mai Morojna começou-o como um projeto Android a solo; hoje conta com dezenas de milhões de instalações, uma versão para desktop e uma comunidade profundamente leal.",
      "A apresentação em 2D engana. Por baixo corre um verdadeiro motor de mecânica orbital de cónicas justapostas, com contabilidade de Δv a sério. Podes voar missões lunares ao estilo Apollo, pousar módulos noutros planetas e desenhar foguetes com rácios de massa de combustível reais — tudo num telemóvel, numa paragem de autocarro.",
      "A versão grátis é generosa. O DLC pago desbloqueia um sistema solar mais rico, mais peças e melhorias de conforto. Como porta de entrada para miúdos (ou adultos) que acham o KSP intimidante, é difícil de bater."
    ],
    "pros": [
      "Joga-se lindamente em telemóveis e tablets",
      "Mecânica orbital real por baixo da interface simples",
      "Versão grátis generosa",
      "Atualizações frequentes e Discord ativo",
      "Excelente rampa de acesso ao género"
    ],
    "cons": [
      "A apresentação 2D limita alguns cenários",
      "Menos profundidade do que o KSP/Juno para utilizadores avançados",
      "A versão desktop fica atrás das funcionalidades móveis"
    ],
    "bestFor": "Principiantes, miúdos e qualquer pessoa que queira um sim orbital a sério enquanto espera na fila.",
    "quickFacts": [
      "Mecânica orbital real de cónicas justapostas",
      "Dezenas de milhões de instalações móveis",
      "Partilha de naves entre plataformas por códigos",
      "Vista 2D de perfil com sistema solar completo",
      "Começou como projeto de uma só pessoa"
    ]
  },
  "reentry": {
    "tagline": "Mercury · Gemini · Apollo",
    "shortDesc": "Se alguma vez quiseste realmente acionar cada disjuntor de um Módulo Lunar, este é o teu sim. Fidelidade de cockpit a roçar um simulador de voo de nível de estudo.",
    "longDesc": [
      "O Reentry é voo espacial de nível de estudo: Mercury, Gemini, Apollo e um módulo do Space Shuttle em crescimento, simulados interruptor a interruptor. Os disjuntores do Módulo Lunar, o teclado noun/verb do Apollo Guidance Computer, o periscópio da Mercury — está tudo lá e tudo funciona.",
      "A campanha ensina-te a história de cada programa através de missões guiadas: Freedom 7, Friendship 7, o passeio espacial da Gemini IV, a Apollo 11. Não te limitas a ver — pilotas as queimas, teclas no AGC, geres o criogénico e o combustível e ouves o controlo de missão nos circuitos de rádio.",
      "Comparado com o Orbiter, é muito mais amigável à entrada, com tutoriais integrados e cockpits de acabamento polido. Comparado com o KSP, é um género completamente diferente — não há criatividade, só história, recriada com fidelidade."
    ],
    "pros": [
      "Fidelidade de cockpit ao interruptor para naves reais",
      "Apollo Guidance Computer funcional",
      "Campanha polida com missões históricas guiadas",
      "Desenvolvedor a solo ativo, com atualizações frequentes",
      "Mercury, Gemini, Apollo e Shuttle, todos cobertos"
    ],
    "cons": [
      "Entrada íngreme sem experiência prévia em simuladores de voo",
      "Só para Windows",
      "Dev a solo significa cadência de conteúdo lenta"
    ],
    "bestFor": "Apaixonados por história e devotos dos study-sims que querem realmente pilotar as missões.",
    "quickFacts": [
      "Apollo Guidance Computer funcional com teclado noun/verb",
      "Programas Mercury, Gemini e Apollo incluídos",
      "DLC do Space Shuttle disponível",
      "Circuitos de rádio do controlo de missão com vozes",
      "Cenários disponíveis no Steam Workshop"
    ]
  },
  "children-of-a-dead-earth": {
    "tagline": "O sim hard sci-fi mais duro alguma vez feito",
    "shortDesc": "Não é estritamente um sim de foguetes, mas cada arma, motor e órbita obedece à física real. Se queres sentir-te pequeno perante a equação do foguete — começa aqui.",
    "longDesc": [
      "Children of a Dead Earth é um simulador de guerra orbital desenvolvido a solo que leva a equação do foguete a sério o suficiente para te estragar a ficção científica para sempre. Cada nave, cada motor, cada arma é construída a partir de física real: termodinâmica real, propriedades reais dos materiais, mecânica orbital real.",
      "Desenhas as naves a partir do sistema de propulsão, equilibras impulso específico contra força de propulsão contra calor residual, e depois voas combates táticos onde tudo, dos penetradores cinéticos aos coilguns, se comporta como se comportaria no vácuo. Os combates acontecem a velocidades orbitais. Os orçamentos de energia dominam tudo.",
      "É um jogo de nicho, e com orgulho. O blogue do desenvolvedor («How to Murder Time with Space Engineering») é um pequeno tesouro de worldbuilding hard sci-fi. Os fãs chamam-lhe o antídoto para Star Wars."
    ],
    "pros": [
      "Possivelmente o sim de combate espacial mais fisicamente honesto alguma vez feito",
      "O designer de naves é um verdadeiro exercício de engenharia",
      "Blogue do desenvolvedor excecional como documentação de apoio",
      "Modding ativo através de folhas de cálculo com dados reais"
    ],
    "cons": [
      "Curva de aprendizagem brutal — assume literacia em física",
      "Estética e apresentação de nicho",
      "Só para Windows, um único dev"
    ],
    "bestFor": "Engenheiros e leitores de hard sci-fi que querem um sim que responde à letra.",
    "quickFacts": [
      "Propriedades reais dos materiais para blindagens e projéteis",
      "O designer cobre termodinâmica e calor residual",
      "Combate tático a velocidades orbitais honestas",
      "Inspirado na referência Atomic Rockets",
      "Desenvolvedor a solo com blogue técnico profundo"
    ]
  },
  "rocketpy": {
    "tagline": "Simulação 6-DoF em Python",
    "shortDesc": "Biblioteca open source usada por equipas universitárias (presenças habituais na Spaceport America Cup). Dispersões Monte Carlo programáveis, modelos de vento reais, resultados prontos para ML.",
    "longDesc": [
      "O RocketPy é o que acontece quando as equipas universitárias de foguetes decidem que querem todo o rigor do OpenRocket, mas dentro de um notebook Python. É um simulador de voo com 6 graus de liberdade distribuído como pacote pip, com modelos atmosféricos completos, campanhas de dispersão Monte Carlo e saídas numéricas limpas que podes encaminhar para o Pandas, o NumPy ou o PyTorch.",
      "É usado a sério por equipas universitárias em competição na Spaceport America Cup e no European Rocketry Challenge. A validação contra dados de voo reais foi publicada em artigos com revisão por pares. Se o teu fluxo de trabalho já vive no Jupyter, encaixa como uma luva.",
      "Os exemplos interativos da documentação são de primeira. Podes simular um lançamento a partir de uma previsão meteorológica real, correr mil dispersões de vento durante a noite e ter gráficos com qualidade de publicação pela manhã."
    ],
    "pros": [
      "Simulador de voo 6-DoF em Python puro — tudo programável",
      "Análise de dispersão Monte Carlo integrada",
      "Usado por equipas universitárias em competições internacionais",
      "Validado contra dados de voo reais em trabalhos com revisão por pares",
      "Integração limpa com Pandas/NumPy/Jupyter"
    ],
    "cons": [
      "Exige literacia em Python — não há interface gráfica",
      "Mais íngreme do que o OpenRocket para foguetemodelistas casuais",
      "Algumas funcionalidades atmosféricas avançadas ainda a amadurecer"
    ],
    "bestFor": "Equipas universitárias, investigadores e qualquer pessoa cuja análise de voo vive num notebook.",
    "quickFacts": [
      "Open source sob licença MIT",
      "Simulação de voo 6-DoF em Python puro",
      "Campanhas de dispersão Monte Carlo integradas",
      "Dados atmosféricos reais via previsões da NOAA",
      "Uso ativo na Spaceport America Cup"
    ]
  }
} });
