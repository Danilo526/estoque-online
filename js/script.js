













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

<script>
    document.getElementById('cadastro-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('cadastro-email').value;
        const senha = document.getElementById('cadastro-senha').value;
        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }
        localStorage.setItem(email, JSON.stringify({ senha: senha }));
        alert("Cadastro realizado com sucesso!");
        document.getElementById('cadastro-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'block';
    });

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
            alert("Usuário não encontrado.");
        }
    });
</script>

</body>
</html>