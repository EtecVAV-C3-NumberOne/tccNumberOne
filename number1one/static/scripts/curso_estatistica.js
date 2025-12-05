
let respostas = {};
let correcaoEst = {1: 'B', 2: 'A', 3: 'B', 4: 'C'};
let correcaoTri = {1: 'C', 2: 'A', 3: 'B', 4: 'D'};
let correcaoAlg = {1: 'C', 2: 'A', 3: 'B', 4: 'C'};
let correcaoCal = {1: 'C', 2: 'B', 3: 'C', 4: 'C'}
let questaoAtual = 1;
let totalQuestoes = 4;
let acertosAvaliacao = 0;
let errosAvaliacao = 0;


function selecionarOpcao(opcao) {
    document.querySelectorAll('.opcao').forEach(opt => opt.classList.remove('selecionada'));
    opcao.classList.add('selecionada');
}

function limparSelecao() {
    document.querySelectorAll('.opcao').forEach(opt => opt.classList.remove('selecionada'));
}

function repassarQuest(tipo) {
    if (questaoAtual == 1) return;
    questaoAtual--;
    atualizarProgresso();
    carregarProximaQuestao(tipo);
}

function proximaQuestao(tipo) {
    const selecionada = document.querySelector('.opcao.selecionada');
    if (!selecionada) {
        alert('Por favor, selecione uma alternativa antes de continuar.');
        return;
    }

    const resposta = document.querySelector('.selecionada');
    if (resposta){
        const letrinha = resposta.querySelector('.letra-opcao');
        respostas[questaoAtual] = letrinha.textContent;
    }

    if (questaoAtual < totalQuestoes) {
        questaoAtual++;
        atualizarProgresso();
        carregarProximaQuestao(tipo);
    } else {
        if (confirm('Tem certeza que deseja finalizar a avaliação?')) {
            alert('Avaliação finalizada! Redirecionando para os resultados...');
            gabarito(tipo);
        }
    }
}

function atualizarProgresso() {
    const preenchimentoProgresso = document.querySelector('.preenchimento-progresso');
    const textoProgresso = document.querySelector('.texto-progresso');
    const porcentagem = (questaoAtual / totalQuestoes) * 100;
    
    preenchimentoProgresso.style.width = porcentagem + '%';
    textoProgresso.textContent = `Questão ${questaoAtual} de ${totalQuestoes}`;
    
    document.querySelector('.estatisticas-resumo .estatistica:first-child .numero-estatistica').textContent = questaoAtual;
    document.querySelector('.estatisticas-resumo .estatistica:nth-child(2) .numero-estatistica').textContent = totalQuestoes - questaoAtual;
}

function carregarProximaQuestao(tipo) {
    console.log(tipo)
    const cartaoExercicio = document.querySelector('.cartao-exercicio');
    cartaoExercicio.style.opacity = '0.5';
    
    setTimeout(() => {
        document.querySelector('.numero-exercicio').textContent = questaoAtual;
        limparSelecao();
        cartaoExercicio.style.opacity = '1';
        
        if (respostas[questaoAtual]){
            const letros = document.querySelectorAll('.opcao');
            letros.forEach(elemento => {
                const teste = elemento.querySelector('.letra-opcao');
                if (teste.textContent == respostas[questaoAtual]) {
                    elemento.classList.add('selecionada');
                }
            });
        }
        
        if (tipo=="est") {
            if (questaoAtual === 1) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>O que é Estatística?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Uma área da matemática que estuda apenas números inteiros.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Um conjunto de métodos para coletar, organizar, analisar e interpretar dados.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "A ciência que cria dados para pesquisas.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Apenas a criação de gráficos para mostrar informações.";
                    }
                }
            }
            if (questaoAtual === 2) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Qual é a primeira etapa do estudo estatístico?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Coleta de dados.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Organização dos dados.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "Análise dos dados.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Interpretação dos resultados.";
                    }
                }
            }
            if (questaoAtual === 3) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Qual tipo de gráfico é mais adequado para mostrar a evolução de dados ao longo do tempo?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Gráfico de barras.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Gráfico de linhas.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "Gráfico de setores.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Histograma.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Próxima questão";
            }
            if (questaoAtual === 4) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Por que é importante interpretar estatísticas com cuidado?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Porque números sempre mentem.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Para fazer gráficos mais bonitos.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "Para evitar conclusões falsas e tomar decisões adequadas.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Porque a matemática é difícil.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Finalizar";
            }
        }
        if (tipo=="tri"){
            if (questaoAtual === 1) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Num triângulo retângulo, o ângulo agudo α possui: hipotenusa = 10cm, cateto oposto = 5cm. Qual é o valor de sin⁡ 𝛼?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "0,3.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "0,4.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "0,5.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "0,6.";
                    }
                }
            }
            if (questaoAtual === 2) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Resolva cos x = √3/2, com x em [0°, 360°]</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "30° e 330°.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "60° e 300°.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "45° e 315°.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "120° e 240°.";
                    }
                }
            }
            if (questaoAtual === 3) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>O valor de tan(60°) é:</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "√3/2.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "√3.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "√3/3.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "1.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Próxima questão";
            }
            if (questaoAtual === 4) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Em um triângulo, os lados são: b = 8, c = 6, ângulo A = 60°. Calcule a usando a lei dos cossenos.</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "4.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "5.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "7.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "8.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Finalizar";
            }   
        }
        if (tipo=="alg"){
            if (questaoAtual === 1) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Em uma expressão algébrica, o termo 7x − 4, qual afirmativa descreve corretamente o coeficiente e o termo independente?';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "O coeficiente é 4 e o termo independente é 7.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "O coeficiente é −4 e o termo independente é 7.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "O coeficiente é 7 e o termo independente é −4.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "O coeficiente é x e o termo independente é 3.";
                    }
                }
            }
            if (questaoAtual === 2) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Resolva a equação: 5x − 12 = 3x + 8</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "x = 10";
                    }
                    if (i==1){
                        spans[i].innerHTML = "x = −10";
                    }
                    if (i==2){
                        spans[i].innerHTML = "x = 2";
                    }
                    if (i==3){
                        spans[i].innerHTML = "x = −2";
                    }
                }
            }
            if (questaoAtual === 3) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Dada a função f(x) = −2x + 6, qual interpretação está correta?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "A função cresce 2 unidades a cada aumento de 1 em x";
                    }
                    if (i==1){
                        spans[i].innerHTML = "A função decresce 2 unidades a cada aumento de 1 em x";
                    }
                    if (i==2){
                        spans[i].innerHTML = "A função não possui inclinação, é constante";
                    }
                    if (i==3){
                        spans[i].innerHTML = "A função cresce até x=6 e depois decresce";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Próxima questão";
            }
            if (questaoAtual === 4) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Considere a função f(x) = 3x. Qual das opções melhor descreve o gráfico dessa função?</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Uma reta decrescente que cruza o eixo y em 3";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Uma parábola crescente com vértice na origem";
                    }
                    if (i==2){
                        spans[i].innerHTML = "Uma reta crescente que passa pela origem";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Uma linha horizontal com valor constante igual a 3";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Finalizar";
            }   
        }
        if (tipo=='cal'){
            if (questaoAtual === 1) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>A integral surgiu historicamente da necessidade de resolver problemas físicos reais envolvendo movimento e variação contínua. Do ponto de vista conceitual rigoroso, a integral de uma função representa, fundamentalmente:';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "Um método puramente algébrico para inverter a derivada, sem relação direta com fenômenos físicos.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Um processo de soma aproximada de retângulos finitos, sem ligação com limites.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "O limite de uma soma de contribuições infinitamente pequenas que reconstrói uma quantidade total acumulada.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Uma forma alternativa de calcular taxas de crescimento sem uso da derivada.";
                    }
                }
            }
            if (questaoAtual === 2) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>Ao calcular uma integral indefinida, sempre aparece uma constante 𝐶 C. Do ponto de vista matemático profundo (e não apenas operacional), essa constante existe porque:<br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "A integral não é uma operação totalmente definida, pois depende do intervalo de integração.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "A derivada elimina informações sobre o valor absoluto da função, preservando apenas sua taxa de variação.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "Toda função possui infinitas derivadas possíveis.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "A derivada sempre anula constantes por convenção algébrica, sem significado conceitual.";
                    }
                }
            }
            if (questaoAtual === 3) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>A integral definida transforma uma função em um número real. Conceitualmente, esse número representa:</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "A soma de todos os valores pontuais da função entre dois extremos.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "A área geométrica pura entre a curva e o eixo, independentemente de sinais.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "O valor acumulado de uma grandeza cuja taxa de variação é dada pela função em um intervalo.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "Uma média aritmética ponderada dos valores da função no intervalo.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Próxima questão";
            }
            if (questaoAtual === 4) {
                document.querySelector('.pergunta-exercicio').innerHTML = '<strong>O Teorema Fundamental do Cálculo estabelece a conexão entre derivadas e integrais. Em termos conceituais, ele afirma que:</strong><br><br>';
                const opcoes = document.querySelector('.opcoes');
                const spans = opcoes.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    if (i==0){
                        spans[i].innerHTML = "A integral é sempre o processo inverso direto da derivada, sem exceções.";
                    }
                    if (i==1){
                        spans[i].innerHTML = "Toda função contínua possui uma primitiva elementar expressável por fórmulas simples.";
                    }
                    if (i==2){
                        spans[i].innerHTML = "O cálculo de uma quantidade acumulada pode ser reduzido à avaliação de uma primitiva apenas nos extremos do intervalo.";
                    }
                    if (i==3){
                        spans[i].innerHTML = "A derivada existe sempre que uma integral definida puder ser calculada.";
                    }
                }
                const proximo = document.querySelector('button.botao-principal#final');
                proximo.innerHTML = "Finalizar";
            }   
        }
    }, 300);
}

function verify(quests, marcado, n, crt) {
    quests.forEach( elemento =>{
        alternativa = elemento.firstElementChild.textContent;
        txt = crt[n].firstElementChild.textContent;
        if (txt==marcado) {} else {
            if (alternativa==marcado) {
                elemento.classList.add('wrong-answer');
                aba = document.querySelectorAll('.answer-key-item');
                aba[n].classList.remove('right-answer');
                aba[n].classList.add('wrong-answer');
                kestao = document.querySelectorAll('.question-number-circle');
                kestao[n].classList.remove('right-answer');
                kestao[n].classList.add('wrong-answer');

                acertouSera = document.querySelectorAll('.answer-status-indicator');
                acertouSera[n].classList.remove('right-answer');
                acertouSera[n].classList.add('wrong-answer');
                acertouSera[n].innerHTML = "Resposta Incorreta";
            }
        }
    });
}

function constarRespostas(){
    const um = respostas[1];
    const dois = respostas[2];
    const tres = respostas[3];
    const quatro = respostas[4];
    const quests1 = document.querySelectorAll('.choice-item-row.um');
    const crt1 = document.querySelectorAll('.choice-item-row.right-answer');
    verify(quests1, um, 0, crt1);

    const quests2 = document.querySelectorAll('.choice-item-row.dois');
    verify(quests2, dois, 1, crt1);

    const quests3 = document.querySelectorAll('.choice-item-row.tres');
    verify(quests3, tres, 2, crt1);

    const quests4 = document.querySelectorAll('.choice-item-row.quatro');
    verify(quests4, quatro, 3, crt1);
}

function constarEstatisticas(reposta, corretos, questoes) {
    for (let i = 1; i <= questoes; i++) {
        if (reposta[i] == corretos[i]) {
            acertosAvaliacao += 1;
        }
    }
    errosAvaliacao = questoes - acertosAvaliacao;
    document.querySelector('span.statistic-number-big.correct-answer').innerHTML = acertosAvaliacao;
    document.querySelector('span.statistic-number-big.wrong-answer').innerHTML = errosAvaliacao;
    let Aproveitamento = (acertosAvaliacao * 100) / questoes;
    document.querySelector('span.statistic-number-big.porcentagi').innerHTML = Math.floor(Aproveitamento) + "%";
    document.querySelector('.grade-display-large').innerHTML = Math.floor(Aproveitamento) + "%";
    document.querySelector('.badge-metadata.feed').innerHTML = "📊 " + acertosAvaliacao + "/" + questoes + " Acertos";
    const icone = document.querySelector('.badge-metadata.back');

    // OBTER ID DA AULA ATUAL DINAMICAMENTE
    const mainAula = document.querySelector('main[data-aula-id]');
    const aulaId = mainAula ? mainAula.getAttribute('data-aula-id') : null;

    // 🎯 CONTROLE DE APROVAÇÃO/REPROVAÇÃO
    if (Aproveitamento > 74) {
        icone.innerHTML = "✅ Aprovado";
        icone.classList.add('sucess-state');
        document.querySelector('.outcome-status-text').innerHTML = "Parabéns! Você foi Aprovado!";
        document.querySelector('.outcome-description-text').innerHTML = "Você demonstrou um bom entendimento dos conceitos apresentados nesse módulo.";
        
    

        // 🎯 SALVAR NO BANCO APENAS SE APROVADO
        if (aulaId) {
            fetch('/concluir_aula', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `aula_id=${aulaId}`
            }).then(response => {
                if (response.ok) {
                    console.log(`Aula ${aulaId} concluída com sucesso!`);
                }
            });
        }

    } else {
        icone.innerHTML = "❌ Reprovado";
        icone.classList.add('warning-state');
        document.querySelector('.outcome-status-text').innerHTML = "Você foi reprovado.";
        document.querySelector('.outcome-description-text').innerHTML = "Revise as aulas do módulo e volte para reavaliar suas competências, por enquanto, insuficientes.";
        document.querySelector('.results-showcase-card').classList.add('failed-status');

    }
}

function gabarito(tipo) {
    voltarAoTopo();
    if (tipo =="est"){
        var correcao = correcaoEst;
        var alio = 'aula-3'
    }
    else if (tipo=="tri"){
        var correcao = correcaoTri;
        var alio = 'aula-7'
    }
    else if (tipo=='alg'){
        var correcao = correcaoAlg;
        var alio = 'aula-11'
    }
    else if (tipo=='cal'){
        var correcao = correcaoCal;
        var alio = 'aula-14'
    }
    prova = document.querySelector('.corpo-conteudo');
    prova.classList.add('inativo');
    const teudo = document.getElementById(alio);
    if (teudo) teudo.classList.add('inativo');
    const certos = document.querySelector('.avaliation-wrapper');
    certos.classList.remove('inativo');
    setTimeout(() => {
        constarRespostas();
        constarEstatisticas(respostas, correcao, 4);
        const tudo = document.querySelectorAll('.module-header');
        tudo.forEach(elemento => {
            elemento.classList.remove('desativado');
        });
    }, 100);
}

function ativarEx(botao) {
    voltarAoTopo();
    
    // Mostrar a avaliação
    const prova = document.querySelector('.corpo-conteudo');
    prova.classList.remove('inativo');
    botao.classList.add('inativo');
    
    // 🎯 DESATIVAR SIDEBAR (mas manter visível)
    const sidebar = document.querySelector('.course-sidebar');
    if (sidebar) {
        sidebar.classList.add('sidebar-disabled');
    }
    
    // Recolher módulos, mas NÃO esconder completamente
    const modulos = document.querySelectorAll('.module-header');
    const listas = document.querySelectorAll('.lesson-list');
    
    modulos.forEach(modulo => {
        modulo.classList.remove('active');
        const toggle = modulo.querySelector('.module-toggle');
        if (toggle) toggle.classList.remove('expanded');
    });
    
    listas.forEach(lista => {
        lista.classList.remove('expanded');
    });
}

// Inicialização específica do curso de Estatística
document.addEventListener('DOMContentLoaded', function() {
    const cartoes = document.querySelectorAll('.cartao-exercicio, .secao-progresso, .cartao-resumo');
    cartoes.forEach((cartao, indice) => {
        cartao.style.animationDelay = `${indice * 0.1}s`;
    });
});

function tentarNovamente(tipo) {
    voltarAoTopo();
    
    // Esconder o gabarito
    const gabarito = document.querySelector('.avaliation-wrapper');
    if (gabarito) gabarito.classList.add('inativo');
    
    const mainAtual = document.querySelector('main[data-aula-id]');
    if (mainAtual) mainAtual.classList.remove('inativo');
    // Mostrar a avaliação novamente
    const prova = document.querySelector('.corpo-conteudo');
    if (prova) prova.classList.remove('inativo');
    
    // 🎯 MANTER SIDEBAR DESATIVADA (ainda em avaliação)
    const sidebar = document.querySelector('.course-sidebar');
    if (sidebar) {
        sidebar.classList.add('sidebar-disabled');
    }
    
    // Resetar variáveis da avaliação
    respostas = {};
    questaoAtual = 1;
    acertosAvaliacao = 0;
    errosAvaliacao = 0;
    
    // Recarregar primeira questão
    atualizarProgresso();
    carregarProximaQuestao(tipo);
}