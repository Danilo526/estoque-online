function adicionarEstoque() {
    let produto = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    
    if (!produto || isNaN(quantidade) || quantidade <= 0) {
        alert("Preencha corretamente os campos.");
        return;
    }
    
    let tabela = document.getElementById("tabela-estoque");
    let linhas = tabela.getElementsByTagName("tr");
    let encontrado = false;
    
    for (let i = 0; i < linhas.length; i++) {
        let colunas = linhas[i].getElementsByTagName("td");
        if (colunas.length > 0 && colunas[0].innerText === produto) {
            colunas[1].innerText = parseInt(colunas[1].innerText) + quantidade;
            colunas[3].innerText = parseInt(colunas[3].innerText) + quantidade;
            encontrado = true;
            break;
        }
    }
    
    if (!encontrado) {
        let novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `<td>${produto}</td><td>${quantidade}</td><td>0</td><td>${quantidade}</td>`;
    }
}

function removerEstoque() {
    let produto = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    
    if (!produto || isNaN(quantidade) || quantidade <= 0) {
        alert("Preencha corretamente os campos.");
        return;
    }
    
    let tabela = document.getElementById("tabela-estoque");
    let linhas = tabela.getElementsByTagName("tr");
    
    for (let i = 0; i < linhas.length; i++) {
        let colunas = linhas[i].getElementsByTagName("td");
        if (colunas.length > 0 && colunas[0].innerText === produto) {
            let estoqueAtual = parseInt(colunas[3].innerText);
            if (estoqueAtual < quantidade) {
                alert("Quantidade insuficiente em estoque.");
                return;
            }
            colunas[2].innerText = parseInt(colunas[2].innerText) + quantidade;
            colunas[3].innerText = estoqueAtual - quantidade;
            return;
        }
    }
    
    alert("Produto não encontrado.");
}
