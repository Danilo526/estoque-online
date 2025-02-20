













// Função para verificar se o login é válido
function verificarLogin(email, senha) {
    // Carrega os usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verifica se algum usuário tem o email e a senha informados
    return usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
}

// Função para redirecionar para a tela principal
function fazerLogin(usuario) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('nome-usuario').innerText = Bem-vindo, ${usuario.nome} ${usuario.sobrenome};
}

// Processa o login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let usuario = verificarLogin(email, senha);

    if (usuario) {
        // Se o usuário for encontrado, redireciona para a tela principal
        fazerLogin(usuario);
    } else {
        alert('E-mail ou senha incorretos!');
    }
});

// Função de cadastro
document.getElementById('cadastrar-btn').addEventListener('click', function() {
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let novoUsuario = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
    };

    // Salva o novo usuário no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    document.getElementById('login-form').reset(); // Limpa o formulário
});