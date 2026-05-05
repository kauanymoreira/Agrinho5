// ============================================
// AGRO FORTE - FUTURO SUSTENTÁVEL
// JavaScript com manipulação DOM e variáveis
// ============================================

// ===== SELEÇÃO DE ELEMENTOS DO DOM =====
const formulario = document.getElementById('form-sustentabilidade');
const painelResultado = document.getElementById('resultado-painel');
const areaInput = document.getElementById('area-produtiva');
const tecnicasSelect = document.getElementById('tecnicas');
const reflorestamentoInput = document.getElementById('reflorestamento');
const agrotoxicoRange = document.getElementById('agrotoxico');
const valorDefensivoSpan = document.getElementById('valor-defensivo');
const btnNovaDica = document.getElementById('btn-nova-dica');
const listaDicasUl = document.getElementById('lista-dicas');

// ===== VARIÁVEIS GLOBAIS PARA ARMAZENAR INFORMAÇÕES =====
let historicoCalculos = []; // Array para armazenar histórico de cálculos
let contadorDicas = 0; // Contador de dicas geradas

// Banco de dados de dicas sustentáveis (array de strings)
const dicasSustentaveis = [
    "Implemente 'pintadas verdes': áreas de descanso para polinizadores na lavoura.",
    "Utilize biodigestores para transformar dejetos em biogás e biofertilizante.",
    "Cultive plantas de cobertura (crotálaria, mucuna) para fixar nitrogênio.",
    "Invista em agricultura de precisão com drones para reduzir insumos.",
    "Recupere nascentes e crie 'barraginhas' para recarga do lençol freático.",
    "Plante espécies nativas em faixas de bordadura para controle natural de pragas.",
    "Integre a produção com apicultura e gere renda extra preservando abelhas.",
    "Utilize irrigação por gotejamento para economizar até 60% de água.",
    "Adote o sistema ILPF (Integração Lavoura-Pecuária-Floresta) para diversificar renda.",
    "Compostagem de resíduos orgânicos gera adubo de alta qualidade.",
    "Utilize sensores de umidade do solo para irrigação inteligente.",
    "Mantenha caderneta de campo para monitorar indicadores ambientais."
];

// ===== FUNÇÕES AUXILIARES =====

// Atualizar label do range de defensivos
function atualizarLabelDefensivo() {
    const valor = parseInt(agrotoxicoRange.value);
    let interpretacao = '';
    
    // Variáveis para armazenar processamento
    if (valor <= 3) {
        interpretacao = 'baixo impacto ✅';
    } else if (valor <= 6) {
        interpretacao = 'moderado, pode melhorar ⚠️';
    } else {
        interpretacao = 'alto, riscos ambientais 🔴';
    }
    
    // Variável para armazenar o texto completo
    const textoLabel = `${valor} / 10 (${interpretacao})`;
    valorDefensivoSpan.innerText = textoLabel;
}

// Função para adicionar nova dica (manipulação DOM)
function adicionarNovaDica() {
    // Variável para armazenar índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * dicasSustentaveis.length);
    // Variável que armazena a dica sorteada
    const novaDicaTexto = dicasSustentaveis[indiceAleatorio];
    
    // Incrementar contador de dicas
    contadorDicas++;
    
    // Criar novo elemento <li> com estrutura semântica
    const novaLi = document.createElement('li');
    const icone = document.createElement('i');
    icone.className = 'fas fa-check-circle';
    
    // Adicionar texto à dica
    const textoNode = document.createTextNode(` ${novaDicaTexto}`);
    novaLi.appendChild(icone);
    novaLi.appendChild(textoNode);
    
    // Adicionar animação suave
    novaLi.style.opacity = '0';
    novaLi.style.transform = 'translateX(20px)';
    novaLi.style.transition = 'all 0.3s ease';
    
    // Adicionar ao DOM
    listaDicasUl.appendChild(novaLi);
    
    // Animar entrada
    setTimeout(() => {
        novaLi.style.opacity = '1';
        novaLi.style.transform = 'translateX(0)';
    }, 10);
    
    // Limitar lista para evitar excesso (manter máximo 12 itens)
    if (listaDicasUl.children.length > 12) {
        const primeiroItem = listaDicasUl.children[0];
        primeiroItem.style.opacity = '0';
        primeiroItem.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            if (listaDicasUl.children[0]) {
                listaDicasUl.removeChild(listaDicasUl.children[0]);
            }
        }, 300);
    }
    
    // Armazenar informação no console (uso de variável)
    const mensagemLog = `✨ Nova dica gerada! Total: ${contadorDicas} dicas exibidas.`;
    console.log(mensagemLog);
}

// Função principal para calcular índice sustentável
function calcularIndiceSustentavel(event) {
    event.preventDefault(); // Impede recarregamento da página
    
    // ===== CAPTURA DE VALORES DO FORMULÁRIO (VARIÁVEIS) =====
    let areaProdutiva = parseFloat(areaInput.value);
    if (isNaN(areaProdutiva) || areaProdutiva <= 0) {
        areaProdutiva = 10;
    }
    
    const tecnicaValor = tecnicasSelect.value;
    let percentualReflorestamento = parseFloat(reflorestamentoInput.value);
    if (isNaN(percentualReflorestamento)) {
        percentualReflorestamento = 0;
    }
    let nivelDefensivos = parseInt(agrotoxicoRange.value, 10);
    
    // ===== PROCESSAMENTO DOS DADOS (CÁLCULO DO ÍNDICE) =====
    // 1. Fator técnica (peso máximo 40 pontos)
    let pontuacaoTecnica = 0;
    if (tecnicaValor === 'alta') {
        pontuacaoTecnica = 40;
    } else if (tecnicaValor === 'media') {
        pontuacaoTecnica = 24;
    } else {
        pontuacaoTecnica = 10;
    }
    
    // 2. Fator regeneração florestal (max 30 pontos)
    let pontuacaoReflorestamento = Math.min(30, (percentualReflorestamento / 100) * 30);
    
    // 3. Fator defensivos: quanto MENOR o uso, maior pontuação (max 30 pontos)
    let pontuacaoDefensivos = 30 - (nivelDefensivos * 3);
    if (pontuacaoDefensivos < 0) pontuacaoDefensivos = 0;
    
    // 4. Índice total (variável para armazenar resultado)
    let indiceSustentabilidade = pontuacaoTecnica + pontuacaoReflorestamento + pontuacaoDefensivos;
    indiceSustentabilidade = Math.min(100, Math.max(0, Math.round(indiceSustentabilidade)));
    
    // ===== CLASSIFICAÇÃO DO RESULTADO =====
    let classificacao = '';
    let corClassificacao = '';
    let emoji = '';
    
    if (indiceSustentabilidade >= 80) {
        classificacao = 'Excelente equilíbrio! 🌟';
        corClassificacao = '#2c5e2a';
        emoji = '🏆';
    } else if (indiceSustentabilidade >= 55) {
        classificacao = 'Bom caminho, continue investindo! 🌿';
        corClassificacao = '#6b8c4a';
        emoji = '📈';
    } else if (indiceSustentabilidade >= 30) {
        classificacao = 'Atenção necessária! ⚠️';
        corClassificacao = '#c58f2a';
        emoji = '🔔';
    } else {
        classificacao = 'Risco ambiental alto! 🚨';
        corClassificacao = '#b33b2c';
        emoji = '⚠️';
    }
    
    // ===== GERAÇÃO DE RECOMENDAÇÕES PERSONALIZADAS =====
    let recomendacaoExtra = '';
    if (nivelDefensivos > 6) {
        recomendacaoExtra = '🔻 Alto uso de defensivos: substitua gradativamente por controle biológico e manejo integrado de pragas.';
    } else if (percentualReflorestamento < 20 && areaProdutiva > 30) {
        recomendacaoExtra = '🌳 Aumente reserva legal e áreas de restauração ecológica para melhorar resiliência climática.';
    } else if (tecnicaValor === 'baixa') {
        recomendacaoExtra = '🔄 Transição para plantio direto ou integração lavoura-pecuária é o próximo passo agro forte.';
    } else if (indiceSustentabilidade >= 70) {
        recomendacaoExtra = '✅ Continue monitorando indicadores de saúde do solo e da água para manter o equilíbrio.';
    } else {
        recomendacaoExtra = '💡 Invista em capacitação técnica sobre práticas regenerativas e sustentabilidade.';
    }
    
    // ===== ARMAZENAR NO HISTÓRICO (uso de array) =====
    const calculoAtual = {
        data: new Date().toLocaleString(),
        indice: indiceSustentabilidade,
        area: areaProdutiva,
        tecnica: tecnicaValor,
        reflorestamento: percentualReflorestamento,
        defensivos: nivelDefensivos
    };
    historicoCalculos.push(calculoAtual);
    
    // Manter apenas últimos 5 cálculos no histórico
    if (historicoCalculos.length > 5) {
        historicoCalculos.shift();
    }
    
    // ===== MONTAGEM DO HTML PARA EXIBIÇÃO =====
    const resultadoHTML = `
        <div class="resultado-card">
            <h3><i class="fas fa-chart-simple"></i> ${emoji} Índice de Sustentabilidade Agro</h3>
            <div>
                <span class="score-highlight">${indiceSustentabilidade} pontos</span>
                <span>/ 100</span>
            </div>
            <div class="impacto-badge" style="background:#eef5ea; color:${corClassificacao}; border: 1px solid ${corClassificacao}20;">
                ${classificacao}
            </div>
            <hr style="margin: 12px 0; border-color:#e0e6db;">
            <p><strong><i class="fas fa-tachometer-alt"></i> Análise detalhada:</strong></p>
            <ul style="margin-left: 1.2rem; line-height: 1.8;">
                <li>🌱 Técnica de manejo: ${tecnicaValor === 'alta' ? 'Regenerativa (alta)' : tecnicaValor === 'media' ? 'ILP (média)' : 'Convencional (crítica)'} — <strong>${pontuacaoTecnica}/40 pts</strong></li>
                <li>🌳 Áreas regeneradas: ${percentualReflorestamento}% — <strong>${pontuacaoReflorestamento.toFixed(1)}/30 pts</strong></li>
                <li>🧪 Uso defensivos: ${nivelDefensivos}/10 — <strong>${pontuacaoDefensivos.toFixed(1)}/30 pts</strong></li>
            </ul>
            <p><strong><i class="fas fa-seedling"></i> Recomendação personalizada:</strong> ${recomendacaoExtra}</p>
            <p><small><i class="fas fa-globe-americas"></i> Área produtiva: ${areaProdutiva.toFixed(1)} ha | ${new Date().toLocaleDateString()}</small></p>
            ${historicoCalculos.length > 1 ? `<p><small><i class="fas fa-history"></i> Último índice: ${historicoCalculos[historicoCalculos.length-2].indice} pontos</small></p>` : ''}
        </div>
    `;
    
    // ===== MANIPULAÇÃO DO DOM PARA EXIBIR RESULTADO =====
    painelResultado.style.display = 'block';
    painelResultado.innerHTML = resultadoHTML;
    
    // Scroll suave até o resultado
    painelResultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Log no console usando variável
    const logMessage = `✅ Cálculo realizado: ${indiceSustentabilidade} pontos - ${classificacao}`;
    console.log(logMessage);
    console.log('📊 Histórico de cálculos:', historicoCalculos);
}

// ===== EVENT LISTENERS =====
// Atualizar label do range
agrotoxicoRange.addEventListener('input', atualizarLabelDefensivo);

// Evento de submit do formulário
formulario.addEventListener('submit', calcularIndiceSustentavel);

// Evento para gerar nova dica
btnNovaDica.addEventListener('click', adicionarNovaDica);

// ===== INICIALIZAÇÃO =====
// Configurar label inicial
atualizarLabelDefensivo();

// Mensagem de boas-vindas no console
const versaoSistema = "Agro Forte 1.0";
console.log(`🌱 ${versaoSistema} - Sistema de Avaliação de Sustentabilidade Agropecuária`);
console.log("💚 DOM totalmente manipulado | Variáveis prontas | Formulário semântico ativo");

// Adicionar uma dica de boas-vindas automática após 2 segundos
setTimeout(() => {
    console.log("💡 Dica: Preencha o formulário para calcular o índice de sustentabilidade da sua propriedade!");
}, 2000);
