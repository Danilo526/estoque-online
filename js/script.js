













// Navegação entre telas
document.getElementById('cadastrar-btn').addEventListener('click', function() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('cadastro-screen').style.display = 'block';
});

document.getElementById('voltar-btn').addEventListener('click', function() {
    document.getElementById('cadastro-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});

document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});

// Login de usuário (este você já tinha implementado parcialmente)
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const usuarioSalvo = localStorage.getItem(email);
    if (usuarioSalvo) {
        const dadosUsuario = JSON.parse(usuarioSalvo);
        if (dadosUsuario.senha === senha) {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-screen').style.display = 'block';
        } else {
            alert("Senha incorreta.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
});

// Inicializar dados de produtos se não existirem
if (!localStorage.getItem('produtos')) {
    const produtosIniciais = {
        'Produto 1': { preco: 50.00, quantidade: 100, historico: [{data: new Date().toISOString(), quantidade: 100}] },
        'Produto 2': { preco: 25.50, quantidade: 75, historico: [{data: new Date().toISOString(), quantidade: 75}] },
        'Produto 3': { preco: 120.00, quantidade: 30, historico: [{data: new Date().toISOString(), quantidade: 30}] },
        'Produto 4': { preco: 10.99, quantidade: 200, historico: [{data: new Date().toISOString(), quantidade: 200}] },
        'Produto 5': { preco: 75.80, quantidade: 50, historico: [{data: new Date().toISOString(), quantidade: 50}] }
    };
    localStorage.setItem('produtos', JSON.stringify(produtosIniciais));
}

// Variáveis para controle do gráfico e produto atual
let graficoAtual = null;
let produtoAtual = null;

// Abrir modal de produto
document.querySelectorAll('.estoque-btn').forEach(button => {
    button.addEventListener('click', function() {
        produtoAtual = this.dataset.produto;
        const produtos = JSON.parse(localStorage.getItem('produtos'));
        const produto = produtos[produtoAtual];
        
        document.getElementById('produto-titulo').textContent = produtoAtual;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('quantidade').value = produto.quantidade;
        
        document.getElementById('modal').style.display = 'block';
        
        // Criar gráfico
        criarGrafico(produto.historico);
    });
});

// Fechar modal
document.getElementById('fechar-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
    if (graficoAtual) {
        graficoAtual.destroy();
        graficoAtual = null;
    }
});

// Salvar dados do produto
document.getElementById('salvar-dados').addEventListener('click', function() {
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    
    if (isNaN(preco) || isNaN(quantidade)) {
        alert("Preencha valores válidos para preço e quantidade");
        return;
    }
    
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos[produtoAtual];
    
    // Atualizar valores
    produto.preco = preco;
    produto.quantidade = quantidade;
    
    // Adicionar ao histórico se a quantidade mudou
    if (produto.historico.length === 0 || produto.quantidade !== produto.historico[produto.historico.length - 1].quantidade) {
        produto.historico.push({
            data: new Date().toISOString(),
            quantidade: quantidade
        });
    }
    
    // Limitar histórico a 10 entradas
    if (produto.historico.length > 10) {
        produto.historico = produto.historico.slice(-10);
    }
    
    // Salvar alterações
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    // Atualizar gráfico
    if (graficoAtual) {
        graficoAtual.destroy();
    }
    criarGrafico(produto.historico);
    
    alert("Dados salvos com sucesso!");
});

// Função para criar gráfico de histórico de estoque
function criarGrafico(historico) {
    const ctx = document.getElementById('grafico').getContext('2d');
    
    const dados = historico.map(item => {
        return {
            x: new Date(item.data).toLocaleDateString('pt-BR'),
            y: item.quantidade
        };
    });
    
    graficoAtual = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Histórico de Estoque',
                data: dados,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                }
            }
        }
    });
}