function cinzento(concluido){
            concluido.classList.add('terminou')
            while (!concluido.classList.contains('course-content')) {
            concluido = concluido.parentElement;
            }
            atual = concluido.classList[1]
            const x = document.querySelectorAll('.lesson-item')
            x.forEach (elemento => {
                if (elemento.id == atual)
            {
                elemento.classList.add('completed')
            }
            })
            const y = document.querySelectorAll('.lesson-icon')
            y.forEach (elemento =>{
                const icone = elemento.parentElement
                if (icone.id.includes(atual))
            {
                elemento.classList.add('completed')
            }
            })

            

        }
        let respostas = {}
        let correcao = {1: 'B', 2: 'A', 3: 'B', 4: 'C'}
        let questaoAtual = 1;
        let totalQuestoes = 4;
        let acertosAvaliacao = 0
        let errosAvaliacao = 0

        function selecionarOpcao(opcao) {
            
            document.querySelectorAll('.opcao').forEach(opt => {
                opt.classList.remove('selecionada');
            });
            
    
            opcao.classList.add('selecionada');
        }


        function limparSelecao() {
            document.querySelectorAll('.opcao').forEach(opt => {
                opt.classList.remove('selecionada');
            });
        }

        function proximaQuestao() {
            const selecionada = document.querySelector('.opcao.selecionada');
            if (!selecionada) {
                alert('Por favor, selecione uma alternativa antes de continuar.');
                return;
            }

            const resposta = document.querySelector('.selecionada')
                if (resposta){
                    const letrinha = resposta.querySelector('.letra-opcao');
                    respostas[questaoAtual] = letrinha.textContent
                }

            if (questaoAtual < totalQuestoes) {
                questaoAtual++;
                atualizarProgresso();
                carregarProximaQuestao();
            } else {
                if (confirm('Tem certeza que deseja finalizar a avaliação?')) {
                    alert('Avaliação finalizada! Redirecionando para os resultados...');
                    gabarito()
                }
            }
        }
        function verify(quests,marcado,n,crt)
        {
            quests.forEach( elemento =>{
                alternativa = elemento.firstElementChild.textContent
                txt = crt[n].firstElementChild.textContent
                if (txt==marcado) {} else {
                    if (alternativa==marcado)
                {
                    elemento.classList.add('wrong-answer')
                    aba = document.querySelectorAll('.answer-key-item')
                    aba[n].classList.remove('right-answer')
                    aba[n].classList.add('wrong-answer')
                    kestao = document.querySelectorAll('.question-number-circle')
                    kestao[n].classList.remove('right-answer')
                    kestao[n].classList.add('wrong-answer')

                    acertouSera = document.querySelectorAll('.answer-status-indicator')
                    acertouSera[n].classList.remove('right-answer')
                    acertouSera[n].classList.add('wrong-answer')
                    acertouSera[n].innerHTML = "Resposta Incorreta"
                    
                }
                }}
            )
        }
        function constarRespostas(){
            const um = respostas[1]
            const dois = respostas[2]
            const tres = respostas[3]
            const quatro = respostas[4]
            const quests1 = document.querySelectorAll('.choice-item-row.um')
            const crt1 = document.querySelectorAll('.choice-item-row.right-answer')
            verify(quests1,um,0,crt1)

            const quests2 = document.querySelectorAll('.choice-item-row.dois')
            verify(quests2,dois,1,crt1)

            const quests3 = document.querySelectorAll('.choice-item-row.tres')
            verify(quests3,tres,2,crt1)

            const quests4 = document.querySelectorAll('.choice-item-row.quatro')
            verify(quests4,quatro,3,crt1)
}
        function constarEstatisticas(reposta,corretos,questoes){
            for (let i = 1; i <= questoes; i++) {
                    if (reposta[i]==corretos[i]){
                        acertosAvaliacao+=1
                    }
                }
            errosAvaliacao = questoes - acertosAvaliacao
            document.querySelector('span.statistic-number-big.correct-answer').innerHTML = acertosAvaliacao;
            document.querySelector('span.statistic-number-big.wrong-answer').innerHTML = errosAvaliacao;
            let Aproveitamento = (acertosAvaliacao * 100)/ questoes
            document.querySelector('span.statistic-number-big.porcentagi').innerHTML = Math.floor(Aproveitamento) + "%"
            document.querySelector('.grade-display-large').innerHTML = Math.floor(Aproveitamento) + "%"
            document.querySelector('.badge-metadata.feed').innerHTML = "📊 "+ acertosAvaliacao + "/" + questoes + " Acertos"
            const icone = document.querySelector('.badge-metadata.back')
            if (Aproveitamento > 74)
            {
                
                icone.innerHTML = "✅ Aprovado"
                icone.classList.add('sucess-state')
                document.querySelector('.outcome-status-text').innerHTML = "Parabéns! Você foi Aprovado!"
                document.querySelector('.outcome-description-text').innerHTML = "Você demonstrou um bom entendimento dos conceitos apresentados nesse módulo."
            }
            else {
                
                icone.innerHTML = "❌ Reprovado"
                icone.classList.add('warning-state')
                document.querySelector('.outcome-status-text').innerHTML = "Você foi reprovado."
                document.querySelector('.outcome-description-text').innerHTML = "Revise as aulas do módulo e volte para reavaliar suas competências, por enquanto, insuficientes."
                document.querySelector('.results-showcase-card').classList.add('failed-status')
            }


        }

        function gabarito() {
            prova = document.querySelector('.corpo-conteudo')
            prova.classList.add('inativo')
            const teudo = document.querySelector(".course-content."+CSS.escape("1_3"));
            teudo.classList.add('inativo')
            const certos = document.querySelector('.avaliation-wrapper')
            certos.classList.remove('inativo')
            constarRespostas();
            constarEstatisticas(respostas,correcao,4)
            const tudo = document.querySelectorAll('.module-header')
            tudo.forEach(elemento =>
                {
                    elemento.classList.remove('desativado')}
                
                )


        }
        function repassarQuest() {
            const selecionada = document.querySelector('.opcao.selecionada');
            if (questaoAtual == 1) {
                
            } else {
                questaoAtual--;
                atualizarProgresso();
                carregarProximaQuestao();
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

        function carregarProximaQuestao() {
            const cartaoExercicio = document.querySelector('.cartao-exercicio');
            cartaoExercicio.style.opacity = '0.5';
            
            setTimeout(() => {
                document.querySelector('.numero-exercicio').textContent = questaoAtual;
                limparSelecao();
                cartaoExercicio.style.opacity = '1';
                if (respostas[questaoAtual]){
                    const letros = document.querySelectorAll('.opcao')
                    letros.forEach(elemento => {
                        const teste = elemento.querySelector('.letra-opcao')
                    if (teste.textContent == respostas[questaoAtual]) {
                        elemento.classList.add('selecionada');
                        }
                    });

                }
                
                
                if (questaoAtual === 1) {
                    document.querySelector('.pergunta-exercicio').innerHTML = 
                        '<strong>O que é Estatística?</strong><br><br>'
                    const opcoes = document.querySelector('.opcoes');
                    const spans = opcoes.querySelectorAll('span')
                    for (let i = 0; i < spans.length; i++)
                {
                    if (i==0){
                        spans[i].innerHTML = "Uma área da matemática que estuda apenas números inteiros."
                    }
                    if (i==1){
                        spans[i].innerHTML = "Um conjunto de métodos para coletar, organizar, analisar e interpretar dados."
                    }
                    if (i==2){
                        spans[i].innerHTML = "A ciência que cria dados para pesquisas."
                    }
                    if (i==3){
                        spans[i].innerHTML = "Apenas a criação de gráficos para mostrar informações."
                    }
                    //gabarito: BBBB
                }
                }
                if (questaoAtual === 2) {
                    document.querySelector('.pergunta-exercicio').innerHTML = 
                        '<strong>Qual é a primeira etapa do estudo estatístico?</strong><br><br>'
                    const opcoes = document.querySelector('.opcoes');
                    const spans = opcoes.querySelectorAll('span')
                    for (let i = 0; i < spans.length; i++)
                {
                    if (i==0){
                        spans[i].innerHTML = "Coleta de dados."
                    }
                    if (i==1){
                        spans[i].innerHTML = "Organização dos dados."
                    }
                    if (i==2){
                        spans[i].innerHTML = "Análise dos dados."
                    }
                    if (i==3){
                        spans[i].innerHTML = "Interpretação dos resultados."
                    }
                    //gabarito: BBBB
                }
                }
                if (questaoAtual === 3) {
                    document.querySelector('.pergunta-exercicio').innerHTML = 
                        '<strong>Qual tipo de gráfico é mais adequado para mostrar a evolução de dados ao longo do tempo?</strong><br><br>'
                    const opcoes = document.querySelector('.opcoes');
                    const spans = opcoes.querySelectorAll('span')
                    for (let i = 0; i < spans.length; i++)
                {
                    if (i==0){
                        spans[i].innerHTML = "Gráfico de barras."
                    }
                    if (i==1){
                        spans[i].innerHTML = "Gráfico de linhas."
                    }
                    if (i==2){
                        spans[i].innerHTML = "Gráfico de setores."
                    }
                    if (i==3){
                        spans[i].innerHTML = "Histograma."
                    }
                    const proximo = document.querySelector('button.botao-principal#final');
                    proximo.innerHTML = "Próxima questão"
                }
                }
                if (questaoAtual === 4) {
                    document.querySelector('.pergunta-exercicio').innerHTML = 
                        '<strong>Por que é importante interpretar estatísticas com cuidado?</strong><br><br>'
                    const opcoes = document.querySelector('.opcoes');
                    const spans = opcoes.querySelectorAll('span')
                    for (let i = 0; i < spans.length; i++)
                {
                    if (i==0){
                        spans[i].innerHTML = "Porque números sempre mentem."
                    }
                    if (i==1){
                        spans[i].innerHTML = "Para fazer gráficos mais bonitos."
                    }
                    if (i==2){
                        spans[i].innerHTML = "Para evitar conclusões falsas e tomar decisões adequadas."
                    }
                    if (i==3){
                        spans[i].innerHTML = "Porque a matemática é difícil."
                    }
                    const proximo = document.querySelector('button.botao-principal#final');
                    proximo.innerHTML = "Finalizar"
                }
                }
            }, 300);
        }

       
        document.addEventListener('DOMContentLoaded', function() {
            const cartoes = document.querySelectorAll('.cartao-exercicio, .secao-progresso, .cartao-resumo');
            cartoes.forEach((cartao, indice) => {
                cartao.style.animationDelay = `${indice * 0.1}s`;
            });
        });

            function ativarEx(botao) {
                prova = document.querySelector('.corpo-conteudo')
                prova.classList.remove('inativo')
                botao.classList.add('inativo')
                const tudo = document.querySelectorAll('.module-header')
                const tudo2 = document.querySelectorAll('.lesson-list')
                tudo.forEach(elemento =>
                {
                    ref = elemento.classList.contains('active')
                    if (ref) {elemento.classList.remove('active')}
                    elemento.classList.add('desativado')}
                
                )
                tudo2.forEach(elemento =>
                {
               
                         elemento.classList.remove('expanded')
                         elemento.style.display = 'none'
                }
                )
            }

            function diminuir(botao) {
                const main = botao.closest("main")
                const teudo = (main.classList[1])
                let tema = +teudo[2] - 1;
                main.classList.add('inativo')

                const anterior = document.querySelector('main.course-content.'+CSS.escape("1_"+String(tema)));
                anterior.classList.remove('inativo')

                const div = document.getElementById(teudo);
                div.classList.remove('active')
                teudo2 = teudo.slice(0, 2) + String(tema)
       
                const div2 = document.getElementById(teudo2)
                div2.classList.add('active')
            }

            function aumentar(botao) {
                const main = botao.closest("main")
                const teudo = (main.classList[1])
                let tema = +teudo[2] + 1;
                main.classList.add('inativo')

                const anterior = document.querySelector('main.course-content.'+CSS.escape("1_"+String(tema)));
                anterior.classList.remove('inativo')

                const div = document.getElementById(teudo);
                div.classList.remove('active')
                teudo2 = teudo.slice(0, 2) + String(tema)
 
                const div2 = document.getElementById(teudo2)
                div2.classList.add('active')
            }


            function toggleItem(lesson) {
                const filhos = document.querySelectorAll('.lesson-item')
          
                let ativacao = false;
                for (let i = 0; i < filhos.length; i++) {
                    if (filhos[i].classList.contains('active')) {
                    ativacao = true;
                    break;
                    }
                }
                if (ativacao) {
                    for (let i = 0; i < filhos.length; i++) {
                    filhos[i].classList.remove('active');
                    }
                }
                lesson.classList.add('active');
                const teudo = document.querySelectorAll(".course-content");
                teudo.forEach(elemento =>
                {
                    ref = elemento.classList.contains(lesson.id)
                    if (ref){elemento.classList.remove('inativo')}
                    else {ref2=elemento.classList.contains('inativo'); if (ref2){} else {elemento.classList.add('inativo')}}
                }
                )
                
            }


        function toggleModule(header) {
            const toggle = header.querySelector('.module-toggle');
            const lessonList = header.nextElementSibling;
            const isExpanded = toggle.classList.contains('expanded');
            
            if (isExpanded) {
                toggle.classList.remove('expanded');
                lessonList.classList.remove('expanded');
                header.classList.remove('active');
                lessonList.style.display = 'none';
            } else {
                header.classList.add('active');
                toggle.classList.add('expanded');
                lessonList.classList.add('expanded');
                lessonList.style.display = 'block';
            }
        }

        


        function updateProgress() {
            const progressFill = document.querySelector('.progress-fill');
            const currentWidth = parseInt(progressFill.style.width);
            const newWidth = Math.min(currentWidth + 5, 100);
            
            progressFill.style.width = newWidth + '%';
            
            const progressText = document.querySelector('.progress-indicator span');
            progressText.textContent = `Progresso ${newWidth}%`;
        }


        document.querySelector('.lesson-complete').addEventListener('click', function() {

            updateProgress();
        });