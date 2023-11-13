// Função para inicializar o carrossel
function iniciarCarrossel() {
    $('#carrossel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true, // Ativar indicadores
        prevArrow: '<div class="seta anterior"></div>',
        nextArrow: '<div class="seta seguinte"></div>',
    });
}

// Função para carregar uma nova página
function carregarPagina(pagina) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("conteudo-carregado").innerHTML = this.responseText;
            iniciarCarrossel(); // Inicializar o carrossel após carregar o conteúdo
        }
    };
    xhttp.open("GET", pagina, true);
    xhttp.send();
}

// Inicializar o carrossel quando a página é carregada
$(document).ready(function() {
    iniciarCarrossel();
});


function carregarPrimeiraPagina() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "home.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("conteudo-carregado").innerHTML = xhr.responseText;

            executarScriptsDaPrimeiraPagina();
        }
    };

    xhr.send();
}

function carregarPaginaHomepage() {
    document.getElementById("conteudo-carregado").classList.add("fade-out");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "home.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // limpa o conteúdo e carrega a nova página
            setTimeout(function() {
                document.getElementById("conteudo-carregado").innerHTML = xhr.responseText;
                
                executarScriptsDaPaginaHomepage();
                
                // Remove a classe fade-out para que o novo conteúdo seja visível
                document.getElementById("conteudo-carregado").classList.remove("fade-out");
            }, 500); 
        }
    };

    xhr.send();
}

document.getElementById("linkHomepage").addEventListener("click", function (event) {
    event.preventDefault();
    carregarPagina("home.html", executarScriptsDaPaginaHomepage);
});