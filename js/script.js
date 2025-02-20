













// Elementos do formulário
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const cadastrarBtn = document.getElementById('cadastrar-btn');

// Carregar o usuário salvo
function carregarUsuario() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }
}

// Função de Login
function realizarLogin(event) {
    event.preventDefault();
    const email = emailInput.value;
    const senha = senhaInput.value;

    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
        const dadosUsuario = JSON.parse(usuarioSalvo);
        if (dadosUsuario.email === email && dadosUsuario.senha === senha) {
            loginScreen.style.display = 'none';
            mainScreen.style.display = 'block';
        } else {
            alert('E-mail ou senha incorretos');
        }
    } else {
        alert('Nenhum usuário cadastrado');
    }
}

// Função de Cadastro
function cadastrarConta() {
    const email = prompt("Digite seu e-mail:");
    const senha = prompt("Digite sua senha:");

    if (!email || !senha) {
        alert("E-mail e senha são obrigatórios!");
        return;
    }

    const usuario = {
        email: email,
        senha: senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso! Agora faça login.');
}

// Função de Logout
function logout() {
    localStorage.removeItem('usuario');
    loginScreen.style.display = 'block';
    mainScreen.style.display = 'none';
}

// Configurar o evento de login e cadastro
loginForm.addEventListener('submit', realizarLogin);
cadastrarBtn.addEventListener('click', cadastrarConta);

// Carregar usuário ao iniciar
document.addEventListener('DOMContentLoaded', carregarUsuario);

<!DOCTYPE html><html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Estoque</title>
    <link rel="stylesheet" href="css/estilo.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div id="login-screen">
        <h2>Login</h2>
        <form id="login-form">
            <input type="email" id="email" placeholder="E-mail" required>
            <input type="password" id="senha" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>
        <button id="cadastrar-btn">Cadastrar</button>
    </div><div id="cadastro-screen" style="display: none;">
    <h2>Cadastro</h2>
    <form id="cadastro-form">
        <input type="email" id="cadastro-email" placeholder="E-mail" required>
        <input type="password" id="cadastro-senha" placeholder="Senha" required>
        <button type="submit">Salvar</button>
    </form>
    <button id="voltar-btn">Voltar</button>
</div>

<div id="main-screen" style="display: none;">
    <h2>Gestão de Estoque</h2>
    <button id="logout-btn">Sair</button>
    
    <div id="estoque-container">
        <button class="estoque-btn" data-produto="Produto 1">Produto 1</button>
        <button class="estoque-btn" data-produto="Produto 2">Produto 2</button>
        <button class="estoque-btn" data-produto="Produto 3">Produto 3</button>
        <button class="estoque-btn" data-produto="Produto 4">Produto 4</button>
        <button class="estoque-btn" data-produto="Produto 5">Produto 5</button>
    </div>
</div>

<div id="modal" style="display: none;">
    <h3 id="produto-titulo"></h3>
    <label>Preço: <input type="number" id="preco"></label>
    <label>Quantidade: <input type="number" id="quantidade" min="0" max="1000"></label>
    <button id="salvar-dados">Salvar</button>
    <canvas id="grafico"></canvas>
    <button id="fechar-modal">Fechar</button>
</div>

<script src="js/script.js"></script>

</body>
</html>