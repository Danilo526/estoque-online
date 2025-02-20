













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