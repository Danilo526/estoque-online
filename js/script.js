// Dados iniciais para demonstração
let products = [
    {id: 1, code: "TEC-001", name: "Teclado Mecânico", category: "electronics", price: 249.90, quantity: 15, status: "Em estoque"},
    {id: 2, code: "MOU-002", name: "Mouse Gamer", category: "electronics", price: 89.90, quantity: 23, status: "Em estoque"},
    {id: 3, code: "CAD-001", name: "Cadeira Ergonômica", category: "furniture", price: 799.90, quantity: 5, status: "Baixo estoque"},
    {id: 4, code: "NOT-003", name: "Notebook Ultra", category: "electronics", price: 3599.90, quantity: 7, status: "Em estoque"}
];

// Dados de movimentação para demonstração
let transactions = [
    {date: "21/02/2025", code: "TEC-001", product: "Teclado Mecânico", type: "Entrada", quantity: 5, totalValue: 1249.50},
    {date: "21/02/2025", code: "MOU-002", product: "Mouse Gamer", type: "Entrada", quantity: 10, totalValue: 899.00},
    {date: "21/02/2025", code: "CAD-001", product: "Cadeira Ergonômica", type: "Saída", quantity: 2, totalValue: 1599.80},
    {date: "20/02/2025", code: "NOT-003", product: "Notebook Ultra", type: "Entrada", quantity: 3, totalValue: 10799.70}
];

// Inicializa o aplicativo quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Atualiza os valores do dashboard
    updateDashboard();
    
    // Carrega a lista de produtos
    loadInventoryTable();
    
    // Carrega o relatório diário
    loadDailyReport();
    
    // Preenche o select de produtos para remoção
    populateProductSelect();
    
    // Inicializa os event listeners
    initEventListeners();
}

function updateDashboard() {
    // Atualiza os indicadores do dashboard
    document.getElementById('total-products').textContent = products.length;
    
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    document.getElementById('stock-value').textContent = `R$ ${totalValue.toFixed(2)}`;
    
    // Filtra as transações de hoje
    const today = "21/02/2025"; // Data atual simulada
    const todayEntries = transactions.filter(t => t.date === today && t.type === "Entrada").length;
    const todayExits = transactions.filter(t => t.date === today && t.type === "Saída").length;
    
    document.getElementById('today-entries').textContent = todayEntries;
    document.getElementById('today-exits').textContent = todayExits;
}

function loadInventoryTable() {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Adiciona classe baseada no status do estoque
        if (product.quantity <= 5) {
            row.classList.add('low-stock');
        }
        
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${product.status}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${product.id}">Editar</button>
                <button class="action-btn delete-btn" data-id="${product.id}">Excluir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adiciona listeners aos botões de ação
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

function getCategoryName(categoryCode) {
    const categories = {
        "electronics": "Eletrônicos",
        "furniture": "Móveis",
        "clothing": "Vestuário",
        "books": "Livros",
        "other": "Outros"
    };
    
    return categories[categoryCode] || categoryCode;
}

function loadDailyReport() {
    const reportBody = document.getElementById('daily-report-body');
    reportBody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.code}</td>
            <td>${transaction.product}</td>
            <td class="${transaction.type.toLowerCase()}">${transaction.type}</td>
            <td>${transaction.quantity}</td>
            <td>R$ ${transaction.totalValue.toFixed(2)}</td>
        `;
        
        reportBody.appendChild(row);
    });
}

function populateProductSelect() {
    const select = document.getElementById('remove-product-select');
    select.innerHTML = '<option value="">Selecione um produto</option>';
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.code} - ${product.name} (${product.quantity} em estoque)`;
        select.appendChild(option);
    });
}

function initEventListeners() {
    // Controladores de tabs
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabContainer = this.closest('.tab-container');
            const tabName = this.getAttribute('data-tab');
            
            // Remove a classe active de todos os botões e conteúdos
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao botão e conteúdo correto
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Formulário de adição de produto
    document.getElementById('add-stock-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewProduct();
    });
    
    // Formulário de remoção de produto
    document.getElementById('remove-stock-form').addEventListener('submit', function(e) {
        e.preventDefault();
        removeProductStock();
    });
}

function addNewProduct() {
    // Obtém os valores do formulário
    const name = document.getElementById('product-name').value.trim();
    const code = document.getElementById('product-code').value.trim();
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);
    
    // Validação básica
    if (!name || !code || !category || isNaN(price) || isNaN(quantity)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    // Verifica se o código já existe
    if (products.some(p => p.code === code)) {
        alert('Este código de produto já está em uso. Por favor, escolha outro.');
        return;
    }
    
    // Cria o novo produto
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        code,
        name,
        category,
        price,
        quantity,
        status: quantity <= 5 ? 'Baixo estoque' : 'Em estoque'
    };
    
    // Adiciona o produto ao array
    products.push(newProduct);
    
    // Registra a transação
    const today = "21/02/2025"; // Data atual simulada
    transactions.push({
        date: today,
        code: newProduct.code,
        product: newProduct.name,
        type: "Entrada",
        quantity: newProduct.quantity,
        totalValue: newProduct.price * newProduct.quantity
    });
    
    // Atualiza a interface
    updateDashboard();
    loadInventoryTable();
    loadDailyReport();
    populateProductSelect();
    
    // Limpa o formulário
    document.getElementById('add-stock-form').reset();
    
    // Notifica o usuário
    alert(`Produto "${name}" adicionado com sucesso!`);
}

function removeProductStock() {
    // Obtém os valores do formulário
    const productId = parseInt(document.getElementById('remove-product-select').value);
    const quantity = parseInt(document.getElementById('remove-quantity').value);
    const reason = document.getElementById('remove-reason').value;
    
    // Validação básica
    if (isNaN(productId) || isNaN(quantity) || !reason) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    // Encontra o produto
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        alert('Produto não encontrado.');
        return;
    }
    
    const product = products[productIndex];
    
    // Verifica se há estoque suficiente
    if (product.quantity < quantity) {
        alert(`Estoque insuficiente. Disponível: ${product.quantity} unidades.`);
        return;
    }
    
    // Atualiza a quantidade
    product.quantity -= quantity;
    
    // Atualiza o status se necessário
    if (product.quantity <= 5) {
        product.status = 'Baixo estoque';
    }
    if (product.quantity === 0) {
        product.status = 'Sem estoque';
    }
    
    // Registra a transação
    const today = "21/02/2025"; // Data atual simulada
    transactions.push({
        date: today,
        code: product.code,
        product: product.name,
        type: "Saída",
        quantity: quantity,
        totalValue: product.price * quantity
    });
    
    // Atualiza a interface
    updateDashboard();
    loadInventoryTable();
    loadDailyReport();
    populateProductSelect();
    
    // Limpa o formulário
    document.getElementById('remove-stock-form').reset();
    
    // Notifica o usuário
    alert(`${quantity} unidades de "${product.name}" removidas com sucesso!`);
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Esta é uma implementação simples. Em um sistema real, você poderia abrir um modal.
    const newName = prompt("Novo nome:", product.name);
    if (newName === null) return;
    
    const newPrice = parseFloat(prompt("Novo preço:", product.price));
    if (isNaN(newPrice)) return;
    
    // Atualiza o produto
    product.name = newName;
    product.price = newPrice;
    
    // Atualiza a interface
    loadInventoryTable();
    populateProductSelect();
    
    alert(`Produto "${product.name}" atualizado com sucesso!`);
}

function deleteProduct(productId) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
        return;
    }
    
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const productName = products[productIndex].name;
    
    // Remove o produto
    products.splice(productIndex, 1);
    
    // Atualiza a interface
    updateDashboard();
    loadInventoryTable();
    populateProductSelect();
    
    alert(`Produto "${productName}" excluído com sucesso!`);
}