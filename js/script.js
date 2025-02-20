













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

// Elementos do formulário
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const cadastrarBtn = document.getElementById('cadastrar-btn');
const nomeUsuario = document.getElementById('nome-usuario');

// Carregar o nome do usuário do localStorage
function carregarNomeUsuario() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        const dadosUsuario = JSON.parse(usuario);
        nomeUsuario.textContent = Bem-vindo, ${dadosUsuario.nome};
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
            // Login bem-sucedido
            nomeUsuario.textContent = Bem-vindo, ${dadosUsuario.nome};
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
function cadastrarConta(event) {
    event.preventDefault();
    const nome = nomeInput.value;
    const sobrenome = sobrenomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;

    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
    };

    // Salvar usuário no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso!');
    loginScreen.style.display = 'none';
    mainScreen.style.display = 'block';
}

// Configurar o formulário de login e o botão de cadastro
loginForm.addEventListener('submit', realizarLogin);
cadastrarBtn.addEventListener('click', cadastrarConta);

// Carregar nome do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', carregarNomeUsuario);