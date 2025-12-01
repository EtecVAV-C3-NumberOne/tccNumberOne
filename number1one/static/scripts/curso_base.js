// curso_base.js - Funções comuns a todos os cursos

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleModule(header) {
    const toggle = header.querySelector('.module-toggle');
    const lessonList = header.parentElement.querySelector('.lesson-list');
    header.classList.toggle('active');
    toggle.classList.toggle('expanded');
    lessonList.classList.toggle('expanded');
}

function toggleItem(lesson) {
    if (typeof voltarAoTopo === 'function') voltarAoTopo();

    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
    lesson.classList.add('active');

    const aulaId = lesson.getAttribute("data-aula-id");
    const url = new URL(window.location);
    url.searchParams.set("aula_atual", aulaId);
    window.history.replaceState({}, "", url);

    // Ocultar todos os conteúdos
    document.querySelectorAll('main.course-content, .avaliation-wrapper').forEach(el => el.classList.add('inativo'));

    // Mostrar o conteúdo da aula clicada
    const main = document.getElementById('aula-' + aulaId);
    if (main) {
        main.classList.remove('inativo');
        
        // ✅ CORREÇÃO: Sempre reativar módulos quando clicar em uma aula
        const modulos = document.querySelectorAll('.module-header');
        const listasAulas = document.querySelectorAll('.lesson-list');
        
        modulos.forEach(modulo => {
            modulo.classList.remove('desativado');
        });
        
        listasAulas.forEach(lista => {
            lista.style.display = ''; // Remove display: none
        });
    }
}

function diminuir(botao) {
    voltarAoTopo();
    const main = botao.closest("main");
    const idAtual = parseInt(main.id.replace("aula-", ""), 10);
    const idAnterior = idAtual - 1;
    if (idAnterior < 1) return;
    
    main.classList.add("inativo");
    const anterior = document.getElementById("aula-" + idAnterior);
    if (anterior) anterior.classList.remove("inativo");
    
    document.querySelectorAll(".lesson-item").forEach(el => el.classList.remove("active"));
    const aulaAnterior = document.querySelector(`.lesson-item[data-aula-id="${idAnterior}"]`);
    if (aulaAnterior) aulaAnterior.classList.add("active");
    
    const url = new URL(window.location);
    url.searchParams.set("aula_atual", idAnterior);
    window.history.replaceState({}, "", url);
}

function aumentar(botao) {
    voltarAoTopo();
    const main = botao.closest("main");
    const idAtual = parseInt(main.id.replace("aula-", ""), 10);
    const idProxima = idAtual + 1;
    
    main.classList.add("inativo");
    const proxima = document.getElementById("aula-" + idProxima);
    if (proxima) proxima.classList.remove("inativo");
    
    document.querySelectorAll(".lesson-item").forEach(el => el.classList.remove("active"));
    const aulaProxima = document.querySelector(`.lesson-item[data-aula-id="${idProxima}"]`);
    if (aulaProxima) aulaProxima.classList.add("active");
    
    const url = new URL(window.location);
    url.searchParams.set("aula_atual", idProxima);
    window.history.replaceState({}, "", url);
}

// Função para navegar para próxima aula após avaliação
function proxima() {
    console.log('🚀 FUNÇÃO proximaAulaPosAvaliacao CHAMADA');
    
    voltarAoTopo();
    
    // 1. Esconder o gabarito
    const gabarito = document.querySelector('.avaliation-wrapper');
    if (gabarito) {
        gabarito.classList.add('inativo');
        console.log('✅ Gabarito escondido');
    }
    
    // 2. OBTER PRÓXIMA AULA DINAMICAMENTE
    const mainAulaAtual = document.querySelector('main[data-proxima-aula]');
    console.log('🔍 Procurando main com data-proxima-aula:', mainAulaAtual);
    
    const proximaAulaId = mainAulaAtual ? mainAulaAtual.getAttribute('data-proxima-aula') : null;
    console.log('📌 Próxima aula ID encontrada:', proximaAulaId);

    if (proximaAulaId) {
        // 🎯 SOLUÇÃO: Em vez de manipular DOM, REDIRECIONAR para recarregar a página
        const url = new URL(window.location);
        url.searchParams.set("aula_atual", proximaAulaId);
        
        console.log('🔄 Redirecionando para:', url.toString());
        window.location.href = url.toString(); // ⬅️ ISSO RECARREGA A PÁGINA
        
    } else {
        console.log('❌ Nenhuma próxima aula encontrada');
    }
}