class QuestionarioPrEP {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 7;
        this.respostas = {};
        this.secoes = this.createSections();
        this.debug = true; // Para debug
        
        this.init();
    }

    log(message, data = null) {
        if (this.debug) {
            console.log(`[QuestionarioPrEP] ${message}`, data || '');
        }
    }

    init() {
        this.renderCurrentSection();
        this.setupEventListeners();
        this.updateProgress();
        this.log('Questionário inicializado');
    }

    createSections() {
        return [
            {
                id: 'informacoes-basicas',
                titulo: 'Informações Básicas',
                descricao: 'Dados essenciais para avaliação inicial',
                badge: 'Seção 1',
                perguntas: [
                    {
                        id: '1.1',
                        titulo: 'Qual sua idade?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'menos-15', texto: 'Menos de 15 anos' },
                            { valor: '15-17', texto: '15-17 anos' },
                            { valor: '18-24', texto: '18-24 anos' },
                            { valor: '25-34', texto: '25-34 anos' },
                            { valor: '35-49', texto: '35-49 anos' },
                            { valor: '50-mais', texto: '50 anos ou mais' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '1.2',
                        titulo: 'Qual seu peso corporal?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'menos-35', texto: 'Menos de 35kg' },
                            { valor: '35-mais', texto: '35kg ou mais' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '1.3',
                        titulo: 'Você já foi diagnosticado com HIV?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nunca-teste', texto: 'Nunca fiz teste para HIV' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '1.4',
                        titulo: 'Quando foi seu último teste de HIV?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: '30-dias', texto: 'Nos últimos 30 dias' },
                            { valor: '3-meses', texto: 'Nos últimos 3 meses' },
                            { valor: '6-meses', texto: 'Nos últimos 6 meses' },
                            { valor: 'mais-6-meses', texto: 'Há mais de 6 meses' },
                            { valor: 'nunca', texto: 'Nunca fiz teste' }
                        ],
                        obrigatoria: true,
                        condicional: {
                            campo: '1.3',
                            valor: ['nao', 'nunca-teste']
                        }
                    }
                ]
            },
            {
                id: 'vulnerabilidade',
                titulo: 'Contexto de Vulnerabilidade',
                descricao: 'Avaliação de fatores de risco para exposição ao HIV',
                badge: 'Seção 2',
                perguntas: [
                    {
                        id: '2.1',
                        titulo: 'Você tem parceiros que vivem com HIV?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei o status de HIV dos meus parceiros' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.2',
                        titulo: 'Com que frequência você usa preservativo nas relações sexuais?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sempre', texto: 'Sempre' },
                            { valor: 'frequentemente', texto: 'Frequentemente (na maioria das vezes)' },
                            { valor: 'as-vezes', texto: 'Às vezes' },
                            { valor: 'raramente', texto: 'Raramente' },
                            { valor: 'nunca', texto: 'Nunca' },
                            { valor: 'nao-ativo', texto: 'Não tenho vida sexual ativa' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.3',
                        titulo: 'Nos últimos 6 meses, com quantas pessoas diferentes você teve relações sexuais?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: '0', texto: '0 (não tive relações)' },
                            { valor: '1', texto: '1 pessoa' },
                            { valor: '2-5', texto: '2-5 pessoas' },
                            { valor: '6-10', texto: '6-10 pessoas' },
                            { valor: 'mais-10', texto: 'Mais de 10 pessoas' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.4',
                        titulo: 'Que tipo de relações sexuais você pratica? (pode marcar mais de uma)',
                        tipo: 'checkbox',
                        opcoes: [
                            { valor: 'vaginal', texto: 'Sexo vaginal' },
                            { valor: 'anal-receptivo', texto: 'Sexo anal (sendo penetrado/a)' },
                            { valor: 'anal-insertivo', texto: 'Sexo anal (penetrando)' },
                            { valor: 'oral', texto: 'Sexo oral' },
                            { valor: 'nao-ativo', texto: 'Não tenho vida sexual ativa' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.5',
                        titulo: 'Você teve alguma IST (Infecção Sexualmente Transmissível) nos últimos 6 meses?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei/Nunca fiz teste' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.6',
                        titulo: 'Você já buscou PEP (Profilaxia Pós-Exposição) alguma vez?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'nunca', texto: 'Nunca' },
                            { valor: 'uma-vez', texto: 'Uma vez' },
                            { valor: 'multiplas', texto: 'Mais de uma vez nos últimos 12 meses' },
                            { valor: 'nao-sei', texto: 'Não sei o que é PEP' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.7',
                        titulo: 'Você compartilha seringas durante o uso de drogas?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-uso', texto: 'Não uso drogas injetáveis' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '2.8',
                        titulo: 'Você faz sexo sob efeito de drogas ou álcool (chemsex)?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'frequentemente', texto: 'Sim, frequentemente' },
                            { valor: 'as-vezes', texto: 'Sim, às vezes' },
                            { valor: 'raramente', texto: 'Raramente' },
                            { valor: 'nunca', texto: 'Nunca' }
                        ],
                        obrigatoria: true
                    }
                ]
            },
            {
                id: 'situacoes-especificas',
                titulo: 'Situações Específicas',
                descricao: 'Informações sobre gestação, amamentação e uso de hormônios',
                badge: 'Seção 3',
                perguntas: [
                    {
                        id: '3.1',
                        titulo: 'Você está planejando engravidar ou está grávida?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'gravida', texto: 'Sim, estou grávida' },
                            { valor: 'planejando', texto: 'Sim, estou planejando engravidar' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-aplica', texto: 'Não se aplica' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '3.2',
                        titulo: 'Você amamenta?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-aplica', texto: 'Não se aplica' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '3.3',
                        titulo: 'Você usa hormônios à base de estradiol?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '3.4',
                        titulo: 'Com que frequência você tem relações sexuais?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'diariamente', texto: 'Diariamente' },
                            { valor: 'varias-semana', texto: 'Várias vezes por semana' },
                            { valor: '1-2-semana', texto: '1-2 vezes por semana' },
                            { valor: 'menos-2-semana', texto: 'Menos de 2 vezes por semana' },
                            { valor: 'esporadicamente', texto: 'Esporadicamente' }
                        ],
                        obrigatoria: true
                    }
                ]
            },
            {
                id: 'historico-saude',
                titulo: 'Histórico de Saúde',
                descricao: 'Avaliação de condições médicas relevantes',
                badge: 'Seção 4',
                perguntas: [
                    {
                        id: '4.1',
                        titulo: 'Você tem alguma doença renal conhecida ou alteração na função dos rins?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '4.2',
                        titulo: 'Você tem pressão alta (hipertensão) ou diabetes?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'hipertensao', texto: 'Sim, hipertensão' },
                            { valor: 'diabetes', texto: 'Sim, diabetes' },
                            { valor: 'ambas', texto: 'Sim, ambas' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '4.3',
                        titulo: 'Você já teve fraturas ósseas por fragilidade ou osteoporose?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '4.4',
                        titulo: 'Você toma algum medicamento regularmente que afete a função renal?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei quais medicamentos afetam os rins' }
                        ],
                        obrigatoria: true
                    }
                ]
            },
            {
                id: 'hepatites',
                titulo: 'Hepatites Virais',
                descricao: 'Informações sobre hepatites B e C',
                badge: 'Seção 5',
                perguntas: [
                    {
                        id: '5.1',
                        titulo: 'Você sabe se tem hepatite B ou hepatite C?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'hepatite-b', texto: 'Sim, tenho hepatite B' },
                            { valor: 'hepatite-c', texto: 'Sim, tenho hepatite C' },
                            { valor: 'ambas', texto: 'Sim, tenho ambas' },
                            { valor: 'nao-tenho', texto: 'Não tenho' },
                            { valor: 'nunca-teste', texto: 'Nunca fiz teste/Não sei' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '5.2',
                        titulo: 'Você foi vacinado contra hepatite B?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'completo', texto: 'Sim, esquema completo' },
                            { valor: 'incompleto', texto: 'Sim, esquema incompleto' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    }
                ]
            },
            {
                id: 'interesse-motivacao',
                titulo: 'Interesse e Motivação',
                descricao: 'Avaliação da motivação e capacidade de adesão',
                badge: 'Seção 6',
                perguntas: [
                    {
                        id: '6.1',
                        titulo: 'Por que você tem interesse na PrEP? (pode marcar mais de uma)',
                        tipo: 'checkbox',
                        opcoes: [
                            { valor: 'proteger-hiv', texto: 'Quero me proteger do HIV' },
                            { valor: 'parceiro-hiv', texto: 'Meu(s) parceiro(s) vive(m) com HIV' },
                            { valor: 'sem-preservativo', texto: 'Tenho relações sem preservativo' },
                            { valor: 'mais-seguranca', texto: 'Quero mais segurança na prevenção' },
                            { valor: 'recomendacao-medica', texto: 'Recomendação médica' },
                            { valor: 'outros', texto: 'Outros motivos' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '6.2',
                        titulo: 'Você conseguiria tomar um comprimido todos os dias?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim-certeza', texto: 'Sim, com certeza' },
                            { valor: 'sim-dificil', texto: 'Sim, mas pode ser difícil às vezes' },
                            { valor: 'nao-sei', texto: 'Não sei' },
                            { valor: 'muito-dificil', texto: 'Não, seria muito difícil' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '6.3',
                        titulo: 'Você conseguiria planejar o uso de medicamento antes das relações sexuais?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim-consigo', texto: 'Sim, consigo planejar' },
                            { valor: 'as-vezes', texto: 'Às vezes consigo planejar' },
                            { valor: 'raramente', texto: 'Raramente consigo planejar' },
                            { valor: 'nao-consigo', texto: 'Não consigo planejar' }
                        ],
                        obrigatoria: true
                    }
                ]
            },
            {
                id: 'sintomas-exposicoes',
                titulo: 'Sintomas e Exposições Recentes',
                descricao: 'Avaliação de sintomas suspeitos e exposições recentes',
                badge: 'Seção 7',
                perguntas: [
                    {
                        id: '7.1',
                        titulo: 'Nas últimas 4 semanas, você teve algum destes sintomas?',
                        tipo: 'checkbox',
                        opcoes: [
                            { valor: 'febre', texto: 'Febre' },
                            { valor: 'dor-garganta', texto: 'Dor de garganta' },
                            { valor: 'erupcoes', texto: 'Erupções na pele' },
                            { valor: 'inguas', texto: 'Ínguas (gânglios aumentados)' },
                            { valor: 'dor-corpo', texto: 'Dor no corpo ou articulações' },
                            { valor: 'cansaco', texto: 'Cansaço extremo' },
                            { valor: 'nenhum', texto: 'Nenhum desses sintomas' }
                        ],
                        obrigatoria: true
                    },
                    {
                        id: '7.2',
                        titulo: 'Você teve alguma exposição de risco ao HIV nas últimas 72 horas?',
                        tipo: 'radio',
                        opcoes: [
                            { valor: 'sim', texto: 'Sim' },
                            { valor: 'nao', texto: 'Não' },
                            { valor: 'nao-sei', texto: 'Não sei' }
                        ],
                        obrigatoria: true
                    }
                ]
            }
        ];
    }

    renderCurrentSection() {
        const secao = this.secoes[this.currentSection];
        const formContent = document.getElementById('formContent');
        
        let html = `
            <div class="secao active">
                <div class="secao-header">
                    <div class="secao-badge">${secao.badge}</div>
                    <h2 class="secao-title">${secao.titulo}</h2>
                    <p class="secao-description">${secao.descricao}</p>
                </div>
        `;

        secao.perguntas.forEach(pergunta => {
            if (this.shouldShowQuestion(pergunta)) {
                html += this.renderPergunta(pergunta);
            }
        });

        html += '</div>';
        formContent.innerHTML = html;

        // Restaurar respostas existentes
        this.restoreAnswers();
        
        this.log(`Seção ${this.currentSection + 1} renderizada: ${secao.titulo}`);
    }

    shouldShowQuestion(pergunta) {
        if (!pergunta.condicional) return true;
        
        const { campo, valor } = pergunta.condicional;
        const resposta = this.respostas[campo];
        
        return valor.includes(resposta);
    }

    renderPergunta(pergunta) {
        const isMultiple = pergunta.tipo === 'checkbox';
        
        let html = `
            <div class="pergunta">
                <h3 class="pergunta-titulo">${pergunta.titulo}</h3>
                <div class="opcoes">
        `;

        pergunta.opcoes.forEach(opcao => {
            const inputType = pergunta.tipo;
            const name = isMultiple ? `${pergunta.id}[]` : pergunta.id;
            const checked = this.isOptionSelected(pergunta.id, opcao.valor) ? 'checked' : '';
            
            html += `
                <div class="opcao ${isMultiple ? 'multiple' : ''}" data-question="${pergunta.id}" data-value="${opcao.valor}">
                    <input type="${inputType}" 
                           id="${pergunta.id}_${opcao.valor}" 
                           name="${name}" 
                           value="${opcao.valor}"
                           ${checked}>
                    <label class="opcao-label" for="${pergunta.id}_${opcao.valor}">
                        ${opcao.texto}
                    </label>
                </div>
            `;
        });

        html += '</div></div>';
        return html;
    }

    isOptionSelected(questionId, optionValue) {
        const answer = this.respostas[questionId];
        if (Array.isArray(answer)) {
            return answer.includes(optionValue);
        }
        return answer === optionValue;
    }

    restoreAnswers() {
        // Aguardar um pouco para garantir que o DOM foi atualizado
        setTimeout(() => {
            document.querySelectorAll('.opcao').forEach(opcao => {
                const input = opcao.querySelector('input');
                if (input && input.checked) {
                    opcao.classList.add('selected');
                }
            });
        }, 50);
    }

    setupEventListeners() {
        this.log('Configurando event listeners');
        
        // Navegação - prevenir submit do form
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSection();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.prevSection();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.submitForm();
            });
        }

        // Prevenir submit do formulário
        const form = document.getElementById('questionarioForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }

        // Seleção de opções - usar event delegation
        document.addEventListener('change', (e) => {
            if ((e.target.type === 'radio' || e.target.type === 'checkbox') && 
                e.target.closest('.opcao')) {
                this.handleAnswer(e);
            }
        });

        // Visual feedback para seleção
        document.addEventListener('click', (e) => {
            if (e.target.closest('.opcao')) {
                const opcao = e.target.closest('.opcao');
                const input = opcao.querySelector('input');
                
                if (!input) return;
                
                // Pequeno delay para permitir que o input seja marcado primeiro
                setTimeout(() => {
                    if (input.type === 'radio') {
                        // Remove selected de outras opções do mesmo grupo
                        document.querySelectorAll(`input[name="${input.name}"]`).forEach(radio => {
                            const parentOpcao = radio.closest('.opcao');
                            if (parentOpcao) {
                                parentOpcao.classList.remove('selected');
                            }
                        });
                        
                        if (input.checked) {
                            opcao.classList.add('selected');
                        }
                    } else if (input.type === 'checkbox') {
                        opcao.classList.toggle('selected', input.checked);
                    }
                }, 10);
            }
        });
    }

    handleAnswer(e) {
        const input = e.target;
        const questionId = input.name.replace('[]', '');
        
        this.log(`Resposta capturada - Pergunta: ${questionId}, Valor: ${input.value}, Checked: ${input.checked}`);
        
        if (input.type === 'checkbox') {
            if (!this.respostas[questionId]) {
                this.respostas[questionId] = [];
            }
            
            if (input.checked) {
                if (!this.respostas[questionId].includes(input.value)) {
                    this.respostas[questionId].push(input.value);
                }
            } else {
                this.respostas[questionId] = this.respostas[questionId].filter(
                    value => value !== input.value
                );
            }
            
            // Remover array vazio
            if (this.respostas[questionId].length === 0) {
                delete this.respostas[questionId];
            }
        } else {
            this.respostas[questionId] = input.value;
        }

        this.log('Respostas atualizadas:', this.respostas);

        // Re-render se há perguntas condicionais
        if (this.hasConditionalQuestions()) {
            setTimeout(() => this.renderCurrentSection(), 100);
        }
    }

    hasConditionalQuestions() {
        return this.secoes[this.currentSection].perguntas.some(p => p.condicional);
    }

    validateCurrentSection() {
        const secao = this.secoes[this.currentSection];
        const errors = [];

        this.log(`Validando seção ${this.currentSection + 1}: ${secao.titulo}`);

        secao.perguntas.forEach(pergunta => {
            if (pergunta.obrigatoria && this.shouldShowQuestion(pergunta)) {
                const resposta = this.respostas[pergunta.id];
                
                this.log(`Validando pergunta ${pergunta.id}:`, resposta);
                
                if (!resposta || (Array.isArray(resposta) && resposta.length === 0)) {
                    errors.push(`Por favor, responda: ${pergunta.titulo}`);
                }
            }
        });

        if (errors.length > 0) {
            this.log('Erros de validação:', errors);
            alert(errors.join('\n'));
            return false;
        }

        this.log('Seção validada com sucesso');
        return true;
    }

    nextSection() {
        this.log('Tentando avançar para próxima seção');
        
        if (!this.validateCurrentSection()) {
            this.log('Validação falhou');
            return;
        }

        if (this.currentSection < this.totalSections - 1) {
            this.currentSection++;
            this.log(`Avançando para seção ${this.currentSection + 1}`);
            this.renderCurrentSection();
            this.updateProgress();
            this.updateNavigation();
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevSection() {
        this.log('Voltando para seção anterior');
        
        if (this.currentSection > 0) {
            this.currentSection--;
            this.log(`Voltando para seção ${this.currentSection + 1}`);
            this.renderCurrentSection();
            this.updateProgress();
            this.updateNavigation();
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateProgress() {
        const progress = ((this.currentSection + 1) / this.totalSections) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progressPercentage = document.getElementById('progressPercentage');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `Seção ${this.currentSection + 1} de ${this.totalSections}`;
        if (progressPercentage) progressPercentage.textContent = `${Math.round(progress)}%`;

        this.log(`Progresso atualizado: ${Math.round(progress)}%`);
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (prevBtn) {
            prevBtn.style.display = this.currentSection > 0 ? 'block' : 'none';
        }
        
        if (this.currentSection === this.totalSections - 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'block';
            this.log('Última seção - mostrando botão de finalizar');
        } else {
            if (nextBtn) nextBtn.style.display = 'block';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    submitForm() {
        this.log('Iniciando processo de finalização');
        
        if (!this.validateCurrentSection()) {
            this.log('Validação final falhou');
            return;
        }

        // Validar se temos respostas suficientes
        if (Object.keys(this.respostas).length === 0) {
            alert('Erro: Nenhuma resposta foi registrada. Por favor, responda o questionário novamente.');
            this.log('Erro: Nenhuma resposta encontrada');
            return;
        }

        // Prevenir múltiplos clicks
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processando...';
        }

        // Mostrar loading
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) {
            loadingModal.style.display = 'flex';
        }

        this.log('Respostas finais coletadas:', this.respostas);

        // Processar resultados
        setTimeout(() => {
            try {
                this.processResults();
            } catch (error) {
                this.log('Erro ao processar resultados:', error);
                
                // Esconder loading
                if (loadingModal) loadingModal.style.display = 'none';
                
                // Restaurar botão
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Finalizar Avaliação';
                }
                
                alert('Erro ao processar resultados. Tente novamente.');
            }
        }, 1500);
    }

    processResults() {
        this.log('Processando resultados...');
        
        try {
            const resultado = this.calcularElegibilidade();
            
            this.log('Resultado calculado:', resultado);
            
            if (!resultado) {
                throw new Error('Falha ao calcular elegibilidade');
            }
            
            // Salvar no localStorage e sessionStorage
            const respostasJson = JSON.stringify(this.respostas);
            const resultadoJson = JSON.stringify(resultado);
            
            localStorage.setItem('questionario_respostas', respostasJson);
            localStorage.setItem('questionario_resultado', resultadoJson);
            
            sessionStorage.setItem('questionario_respostas', respostasJson);
            sessionStorage.setItem('questionario_resultado', resultadoJson);
            sessionStorage.setItem('questionario_completed', 'true');
            
            this.log('Dados salvos no storage');
            
            // Verificar se foi salvo
            const verificacao = localStorage.getItem('questionario_resultado');
            if (!verificacao) {
                throw new Error('Falha ao salvar no localStorage');
            }
            
            this.log('Redirecionando para resultado.html');
            
            // Redirecionar com um pequeno delay
            setTimeout(() => {
                window.location.href = 'resultado.html';
            }, 500);
            
        } catch (error) {
            this.log('Erro em processResults:', error);
            throw error; // Re-throw para ser capturado no submitForm
        }
    }

    calcularElegibilidade() {
        this.log('Calculando elegibilidade...');
        
        const criterios = {
            apto: true,
            motivos_exclusao: [],
            recomendacoes: [],
            modalidade_recomendada: null,
            alertas: []
        };

        // Critérios de exclusão absoluta
        if (this.respostas['1.1'] === 'menos-15') {
            criterios.apto = false;
            criterios.motivos_exclusao.push('Idade inferior a 15 anos');
        }

        if (this.respostas['1.2'] === 'menos-35') {
            criterios.apto = false;
            criterios.motivos_exclusao.push('Peso corporal inferior a 35kg');
        }

        if (this.respostas['1.3'] === 'sim') {
            criterios.apto = false;
            criterios.motivos_exclusao.push('Já possui diagnóstico de HIV');
        }

        if (this.respostas['4.1'] === 'sim') {
            criterios.apto = false;
            criterios.motivos_exclusao.push('Doença renal conhecida');
        }

        if (this.respostas['7.2'] === 'sim') {
            criterios.apto = false;
            criterios.motivos_exclusao.push('Exposição de risco nas últimas 72h - indicação de PEP');
        }

        // Alertas importantes
        if (this.respostas['7.1'] && this.respostas['7.1'].length > 0 && !this.respostas['7.1'].includes('nenhum')) {
            criterios.alertas.push('Sintomas sugestivos de infecção aguda - necessária avaliação médica urgente');
        }

        if (this.respostas['3.1'] === 'gravida') {
            criterios.alertas.push('Gestação - requer avaliação médica especializada');
        }

        if (this.respostas['3.2'] === 'sim') {
            criterios.alertas.push('Amamentação - requer avaliação médica especializada');
        }

        if (this.respostas['5.1'] === 'hepatite-b') {
            criterios.alertas.push('Hepatite B - necessário monitoramento especial');
        }

        // Avaliação de contexto de vulnerabilidade
        let pontuacao_vulnerabilidade = 0;

        if (this.respostas['2.1'] === 'sim') pontuacao_vulnerabilidade += 3;
        if (['raramente', 'nunca'].includes(this.respostas['2.2'])) pontuacao_vulnerabilidade += 2;
        if (['6-10', 'mais-10'].includes(this.respostas['2.3'])) pontuacao_vulnerabilidade += 2;
        if (this.respostas['2.4'] && this.respostas['2.4'].includes('anal-receptivo')) pontuacao_vulnerabilidade += 2;
        if (this.respostas['2.5'] === 'sim') pontuacao_vulnerabilidade += 2;
        if (this.respostas['2.6'] === 'multiplas') pontuacao_vulnerabilidade += 2;
        if (this.respostas['2.7'] === 'sim') pontuacao_vulnerabilidade += 3;
        if (['frequentemente', 'as-vezes'].includes(this.respostas['2.8'])) pontuacao_vulnerabilidade += 1;

        // Definir modalidade recomendada
        if (criterios.apto && pontuacao_vulnerabilidade >= 4) {
            if (this.respostas['3.4'] === 'esporadicamente' && this.respostas['6.3'] === 'sim-consigo') {
                criterios.modalidade_recomendada = 'sob_demanda';
            } else {
                criterios.modalidade_recomendada = 'diaria';
            }
        }

        // Recomendações gerais
        if (criterios.apto) {
            criterios.recomendacoes.push('Consulta médica para prescrição');
            criterios.recomendacoes.push('Exames laboratoriais pré-PrEP');
            criterios.recomendacoes.push('Testagem para HIV e outras ISTs');
            criterios.recomendacoes.push('Avaliação da função renal');
            criterios.recomendacoes.push('Vacinação para hepatites A e B');
            criterios.recomendacoes.push('Vacinação para HPV');
        }

        const resultado = {
            ...criterios,
            pontuacao_vulnerabilidade,
            timestamp: new Date().toISOString()
        };

        this.log('Elegibilidade calculada:', resultado);
        return resultado;
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const questionario = new QuestionarioPrEP();
    
    // Salvar instância global para debug
    window.questionarioInstance = questionario;
    
    // Função de debug global
    window.debugQuestionario = function() {
        console.log('=== DEBUG QUESTIONÁRIO ===');
        console.log('Respostas atuais:', questionario.respostas);
        console.log('Seção atual:', questionario.currentSection);
        console.log('LocalStorage respostas:', localStorage.getItem('questionario_respostas'));
        console.log('LocalStorage resultado:', localStorage.getItem('questionario_resultado'));
        console.log('SessionStorage:', {
            respostas: sessionStorage.getItem('questionario_respostas'),
            resultado: sessionStorage.getItem('questionario_resultado'),
            completed: sessionStorage.getItem('questionario_completed')
        });
    };
});
