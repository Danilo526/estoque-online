













// Navegar para a tela de cadastro
document.getElementById('cadastrar-btn').addEventListener('click', function() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('cadastro-screen').style.display = 'block';
});

// Voltar para a tela de login
document.getElementById('voltar-btn').addEventListener('click', function() {
    document.getElementById('cadastro-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});

// Implementar o logout
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});