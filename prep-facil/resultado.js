class ResultadoPrEP {
    constructor() {
        this.respostas = this.loadRespostas();
        this.resultado = this.loadResultado();
        
        if (!this.resultado) {
            window.location.href = 'questionario.html';
            return;
        }
        
        this.renderResultado();
    }

    loadRespostas() {
        const data = localStorage.getItem('questionario_respostas');
        return data ? JSON.parse(data) : null;
    }

    loadResultado() {
        const data = localStorage.getItem('questionario_resultado');
        return data ? JSON.parse(data) : null;
    }

    renderResultado() {
        this.renderHeader();
        this.renderContent();
        this.updateActionButton();
    }

    renderHeader() {
        const icon = document.getElementById('resultadoIcon');
        const titulo = document.getElementById('resultadoTitulo');
        const subtitulo = document.getElementById('resultadoSubtitulo');
        
        if (this.resultado.apto) {
            icon.textContent = '✅';
            titulo.textContent = 'Você tem indicação para PrEP!';
            subtitulo.textContent = 'Com base em suas respostas, você atende aos critérios de elegibilidade para a Profilaxia Pré-Exposição ao HIV.';
            document.querySelector('.resultado-header').classList.add('resultado-apto');
        } else {
            if (this.resultado.motivos_exclusao.some(motivo => 
                motivo.includes('Exposição de risco nas últimas 72h'))) {
                icon.textContent = '🚨';
                titulo.textContent = 'Você precisa de PEP, não PrEP';
                subtitulo.textContent = 'Sua exposição recente indica necessidade de Profilaxia Pós-Exposição. Procure atendimento médico urgente.';
                document.querySelector('.resultado-header').classList.add('resultado-atencao');
            } else {
                icon.textContent = '❌';
                titulo.textContent = 'PrEP não indicada no momento';
                subtitulo.textContent = 'Com base em suas respostas, você não atende aos critérios atuais de elegibilidade para PrEP.';
                document.querySelector('.resultado-header').classList.add('resultado-nao-apto');
            }
        }
    }

    renderContent() {
        const container = document.getElementById('resultadoContent');
        let html = '';

        // Mostrar motivos de exclusão se houver
        if (this.resultado.motivos_exclusao.length > 0) {
            html += this.renderExclusionReasons();
        }

        // Mostrar alertas se houver
        if (this.resultado.alertas.length > 0) {
            html += this.renderAlerts();
        }

        // Mostrar modalidade recomendada se apto
        if (this.resultado.apto && this.resultado.modalidade_recomendada) {
            html += this.renderModalidadeRecomendada();
        }

        // Mostrar recomendações
        if (this.resultado.recomendacoes.length > 0) {
            html += this.renderRecomendacoes();
        }

        // Mostrar pontuação de vulnerabilidade
        html += this.renderVulnerabilidade();

        container.innerHTML = html;
    }

    renderExclusionReasons() {
        return `
            <div class="content-section">
                <h3>🚫 Critérios de Exclusão</h3>
                <div class="alert-card error">
                    <ul class="content-list">
                        ${this.resultado.motivos_exclusao.map(motivo => `
                            <li>
                                <span class="list-icon error">●</span>
                                ${motivo}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    renderAlerts() {
        return `
            <div class="content-section">
                <h3>⚠️ Alertas Importantes</h3>
                ${this.resultado.alertas.map(alerta => `
                    <div class="alert-card warning">
                        <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                            <span class="list-icon warning">⚠️</span>
                            <span>${alerta}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderModalidadeRecomendada() {
        const modalidades = {
            'diaria': {
                nome: 'PrEP Diária',
                descricao: 'Tomar um comprimido todos os dias, independentemente da atividade sexual.',
                indicacao: 'Recomendada para pessoas com atividade sexual frequente e/ou múltiplos parceiros.'
            },
            'sob_demanda': {
                nome: 'PrEP Sob Demanda (2+1+1)',
                descricao: 'Tomar 2 comprimidos 2-24h antes da relação, 1 comprimido 24h depois, e mais 1 comprimido 24h após.',
                indicacao: 'Recomendada para pessoas com atividade sexual esporádica e que conseguem planejar.'
            }
        };

        const modalidade = modalidades[this.resultado.modalidade_recomendada];

        return `
            <div class="content-section">
                <h3>💊 Modalidade Recomendada</h3>
                <div class="modalidade-card">
                    <h4>${modalidade.nome}</h4>
                    <p><strong>Como funciona:</strong> ${modalidade.descricao}</p>
                    <p><strong>Indicação:</strong> ${modalidade.indicacao}</p>
                </div>
            </div>
        `;
    }

    renderRecomendacoes() {
        return `
            <div class="content-section">
                <h3>📋 Próximos Passos</h3>
                <ul class="content-list">
                    ${this.resultado.recomendacoes.map(recomendacao => `
                        <li>
                            <span class="list-icon success">✓</span>
                            ${recomendacao}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    renderVulnerabilidade() {
        const pontuacao = this.resultado.pontuacao_vulnerabilidade;
        let nivel, descricao, cor;

        if (pontuacao >= 6) {
            nivel = 'Alta';
            descricao = 'Múltiplos fatores de risco identificados';
            cor = 'error';
        } else if (pontuacao >= 3) {
            nivel = 'Moderada';
            descricao = 'Alguns fatores de risco identificados';
            cor = 'warning';
        } else {
            nivel = 'Baixa';
            descricao = 'Poucos fatores de risco identificados';
            cor = 'success';
        }

        return `
            <div class="content-section">
                <h3>📊 Avaliação de Vulnerabilidade</h3>
                <div class="alert-card ${cor === 'success' ? 'info' : (cor === 'warning' ? 'warning' : 'error')}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>Nível de Vulnerabilidade: ${nivel}</strong>
                            <br>
                            ${descricao}
                        </div>
                        <div style="font-size: 1.5rem; font-weight: bold;">
                            ${pontuacao}/12
                        </div>
                    </div>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
                    Esta pontuação é baseada nos fatores de risco informados e é utilizada para determinar a indicação de PrEP conforme o protocolo clínico.
                </p>
            </div>
        `;
    }

    updateActionButton() {
        const actionButton = document.getElementById('actionButton');
        
        if (this.resultado.motivos_exclusao.some(motivo => 
            motivo.includes('Exposição de risco nas últimas 72h'))) {
            actionButton.textContent = '🚨 Buscar PEP Urgente';
            actionButton.href = 'https://www.gov.br/aids/pt-br/assuntos/prevencao-combinada/pep-profilaxia-pos-exposicao';
            actionButton.target = '_blank';
        } else if (this.resultado.apto) {
            actionButton.textContent = '📞 Agendar Consulta';
            actionButton.href = '#contato';
        } else {
            actionButton.textContent = '💬 Falar com Especialista';
            actionButton.href = '#contato';
        }
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ResultadoPrEP();
});
