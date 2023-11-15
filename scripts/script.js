//inicializar o carrossel com slick
function iniciarCarrossel() {
    $('#carrossel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        prevArrow: '<div class="seta anterior"></div>',
        nextArrow: '<div class="seta seguinte"></div>',
    });
}

//carregar pagina dinamicamente
function carregarPagina(pagina, callback) {
    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById("conteudo-carregado").innerHTML = this.responseText;
                    resolve();

                    if ($('#carrossel').hasClass('slick-initialized')) {
                        $('#carrossel').slick('unslick');
                    }

                    if (callback) {
                        callback();
                    }

                    setTimeout(function () {
                        iniciarCarrossel();
                    }, 100);
                } else {
                    reject(new Error('Erro ao carregar a página'));
                }
            }
        };
        xhttp.open("GET", pagina, true);
        xhttp.send();
    });
}

// Event listeners para links de navegacao
const linksNavegacao = ["Home", "SobreNos", "Servicos", "Contato","UltimosPosts"];

linksNavegacao.forEach(function (link) {
    const linkElement = document.getElementById("link" + link);
    if (linkElement) {
        linkElement.addEventListener("click", function (event) {
            event.preventDefault();
            carregarPagina(link.toLowerCase() + ".html");
        });
    }
});

// ...

// Event listener para link da homepage
if (document.getElementById("linkHomepage")) {
    document.getElementById("linkHomepage").addEventListener("click", function (event) {
        event.preventDefault();
        carregarPagina("home.html", function () {
            iniciarCarrossel();
            executarScriptsDaPaginaHomepage();
        });
    });
}

//carrega pag Servicos
function carregarServicos() {
    carregarPagina("nossosServicos.html", gerarCartoesServico);
}

// Event listener para link de servicos
if (document.getElementById("linkServicos")) {
    document.getElementById("linkServicos").addEventListener("click", function (event) {
        event.preventDefault();
        carregarServicos();
    });
}

// dados dos cartoes
const servicos = [
    { imagem: 'https://cdn.pixabay.com/photo/2023/10/12/17/56/after-the-rain-8311416_1280.jpg', descricao: 'Descrição do Serviço 1' },
    { imagem: 'https://cdn.pixabay.com/photo/2023/09/18/16/47/leaves-8260967_1280.jpg', descricao: 'Descrição do Serviço 2' },
    { imagem: 'https://media.istockphoto.com/id/1197239452/photo/fern-leaves-on-dark-background-in-jungle-dense-dark-green-fern-leaves-in-garden-at-night.jpg?s=2048x2048&w=is&k=20&c=8T7z3w0NDUM5cqApaEKZiTx6wQ3TyR1cvEJH7RnOzOo=', descricao: 'Descrição do Serviço 3' },

];

// gerar cartoes de servico
function gerarCartoesServico() {
    console.log('Iniciando a geração de cartões de serviço...');

    const servicosContainer = document.getElementById('servicos-container');

    if (!servicosContainer) {
        console.error('Container dos serviços não encontrado.');
        return;
    }

    servicosContainer.innerHTML = '';

    servicos.forEach((servico, index) => {
        const cartaoDiv = document.createElement('div');
        cartaoDiv.className = 'col-md-4 mb-4 service-card';

        const imagem = document.createElement('img');
        imagem.src = servico.imagem;
        imagem.alt = 'Imagem do Serviço';
        imagem.className = 'service-image';

        const descricao = document.createElement('p');
        descricao.textContent = servico.descricao;

        const botaoDetalhes = document.createElement('button');
        botaoDetalhes.className = 'btn btn-primary toggle-button';
        botaoDetalhes.textContent = 'Mais detalhes';
        botaoDetalhes.addEventListener('click', () => alternarDetalhes(index));

        const detalhesContainer = document.createElement('div');
        detalhesContainer.id = `servico-detalhe-${index}`;
        detalhesContainer.className = 'mt-4';
        detalhesContainer.style.display = 'none';

        cartaoDiv.appendChild(imagem);
        cartaoDiv.appendChild(descricao);
        cartaoDiv.appendChild(botaoDetalhes);
        cartaoDiv.appendChild(detalhesContainer);

        servicosContainer.appendChild(cartaoDiv);

        console.log('Cartão gerado para serviço:', servico.descricao);
    });

    console.log('Cartões gerados com sucesso.');
}

// chama a funcao gerarCartoes
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes("nossosServicos.html")) {
        gerarCartoesServico();
    }
});


if (document.getElementById("linkUltimosPosts")) {
    document.getElementById("linkUltimosPosts").addEventListener("click", function (event) {
        event.preventDefault();
        carregarUltimosPosts();
    });
}

function carregarUltimosPosts() {
    carregarPagina("ultimosPosts.html", gerarCartoesPosts);
}

// Dados de exemplo para posts
const ultimosPosts = [
    { titulo: 'Título do Post 1', conteudo: 'Conteúdo do Post 1' },
    { titulo: 'Título do Post 2', conteudo: 'Conteúdo do Post 2' },
    { titulo: 'Título do Post 3', conteudo: 'Conteúdo do Post 3' },
];

// Função para gerar cartões de postagens
function gerarCartoesPosts() {
    console.log('Iniciando a geração de cartões de posts...');

    const postsContainer = document.getElementById('posts-container');

    if (!postsContainer) {
        console.error('Container de posts não encontrado.');
        return;
    }

    postsContainer.innerHTML = '';

    ultimosPosts.forEach((post, index) => {
        const cartaoDiv = document.createElement('div');
        cartaoDiv.className = 'col-md-4 mb-4 post-card';

        const titulo = document.createElement('h2');
        titulo.textContent = post.titulo;

        const conteudo = document.createElement('p');
        conteudo.textContent = post.conteudo;

        cartaoDiv.appendChild(titulo);
        cartaoDiv.appendChild(conteudo);

        postsContainer.appendChild(cartaoDiv);

        console.log('Cartão gerado para post:', post.titulo);
    });

    console.log('Cartões de posts gerados com sucesso.');
}

// Chama a função para gerar os cartões de posts quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes("ultimosPosts.html")) {
        gerarCartoesPosts();
    }
});