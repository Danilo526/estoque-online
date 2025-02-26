













// Dados mock para demonstração
let inventory = [
    { code: "P001", name: "Monitor LED", category: "electronics", price: 599.99, quantity: 15 },
    { code: "P002", name: "Teclado Mecânico", category: "electronics", price: 299.99, quantity: 8 },
    { code: "P003", name: "Mesa de Escritório", category: "furniture", price: 799.99, quantity: 5 },
    { code: "P004", name: "Cadeira Ergonômica", category: "furniture", price: 899.99, quantity: 3 },
    { code: "P005", name: "Camiseta", category: "clothing", price: 59.99, quantity: 25 }
];

let movements = [
    { date: "2025-02-21", code: "P001", productName: "Monitor LED", type: "entrada", quantity: 5, totalValue: 2999.95 },
    { date: "2025-02-21", code: "P002", productName: "Teclado Mecânico", type: "entrada", quantity: 3, totalValue: 899.97 },
    { date: "2025-02-21", code: "P003", productName: "Mesa de Escritório", type: "saída", quantity: 1, totalValue: 799.99 }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tabs
    initTabs();
    
    // Carregar dados iniciais
    updateDashboard();
    loadInventoryTable();
    loadMovementsTable();
    updateProductSelect();
    
    // Adicionar event listeners para os formulários
    document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
    document.getElementById('remove-product-form').addEventListener('submit', handleRemoveProduct);
});

// Função para inicializar as tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões e conteúdos
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Atualizar o dashboard
function updateDashboard() {
    document.getElementById('total-products').textContent = inventory.length;
    
    const stockValue = inventory.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('stock-value').textContent = `R$ ${stockValue.toFixed(2)}`;
    
    const todayEntries = movements.filter(m => m.type === 'entrada' && isToday(m.date)).length;
    document.getElementById('today-entries').textContent = todayEntries;
    
    const todayExits = movements.filter(m => m.type === 'saída' && isToday(m.date)).length;
    document.getElementById('today-exits').textContent = todayExits;
}

// Função auxiliar para verificar se uma data é hoje
function isToday(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// Carregar tabela de inventário
function loadInventoryTable() {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    
    inventory.forEach(item => {
        const row = document.createElement('tr');
        
        // Adicionar classe low-stock se a quantidade for baixa
        if (item.quantity < 5) {
            row.classList.add('low-stock');
        }
        
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${getCategoryName(item.category)}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>
                <span class="status-badge ${item.quantity < 5 ? 'warning' : 'success'}">
                    ${item.quantity < 5 ? 'Baixo Estoque' : 'Normal'}
                </span>
            </td>
            <td>
                <button class="action-btn edit-btn" data-code="${item.code}">Editar</button>
                <button class="action-btn delete-btn" data-code="${item.code}">Excluir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar event listeners para os botões de ação
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');
            // Implementar edição de produto
            showNotification('Funcionalidade de edição em desenvolvimento', 'warning');
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');
            deleteProduct(code);
        });
    });
}

// Carregar tabela de movimentações
function loadMovementsTable() {
    const tableBody = document.getElementById('daily-report-body');
    tableBody.innerHTML = '';
    
    movements.forEach(movement => {
        const row = document.createElement('tr');
        
        // Formatando a data
        const date = new Date(movement.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${movement.code}</td>
            <td>${movement.productName}</td>
            <td class="${movement.type}">${movement.type}</td>
            <td>${movement.quantity}</td>
            <td>R$ ${movement.totalValue.toFixed(2)}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Placeholder para gráfico
    document.getElementById('daily-movement-chart').textContent = "Gráfico de Movimentações Diárias";
}

// Atualizar select de produtos para remoção
function updateProductSelect() {
    const select = document.getElementById('remove-product-select');
    select.innerHTML = '<option value="">Selecione um produto</option>';
    
    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.code;
        option.textContent = `${item.code} - ${item.name} (Disponível: ${item.quantity})`;
        select.appendChild(option);
    });
}

// Lidar com adição de produto
function handleAddProduct(e) {
    e.preventDefault();
    
    const code = document.getElementById('product-code').value;
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);
    
    // Verificar se o código já existe
    const existingProductIndex = inventory.findIndex(item => item.code === code);
    
    if (existingProductIndex >= 0) {
        // Atualizar produto existente
        inventory[existingProductIndex].quantity += quantity;
        
        // Registrar movimento
        registerMovement(code, inventory[existingProductIndex].name, 'entrada', quantity, price * quantity);
        
        showNotification(`Quantidade atualizada: ${inventory[existingProductIndex].name}`, 'success');
    } else {
        // Adicionar novo produto
        const newProduct = {
            code,
            name,
            category,
            price,
            quantity
        };
        
        inventory.push(newProduct);
        
        // Registrar movimento
        registerMovement(code, name, 'entrada', quantity, price * quantity);
        
        showNotification(`Produto adicionado: ${name}`, 'success');
    }
    
    // Atualizar UI
    updateDashboard();
    loadInventoryTable();
    loadMovementsTable();
    updateProductSelect();
    
    // Limpar formulário
    document.getElementById('add-product-form').reset();
}

// Lidar com remoção de produto
function handleRemoveProduct(e) {
    e.preventDefault();
    
    const code = document.getElementById('remove-product-select').value;
    const quantity = parseInt(document.getElementById('remove-quantity').value);
    
    if (!code) {
        showNotification('Selecione um produto para remover', 'error');
        return;
    }
    
    const productIndex = inventory.findIndex(item => item.code === code);
    
    if (productIndex >= 0) {
        const product = inventory[productIndex];
        
        if (product.quantity < quantity) {
            showNotification(`Quantidade insuficiente. Disponível: ${product.quantity}`, 'error');
            return;
        }
        
        // Atualizar quantidade
        product.quantity -= quantity;
        
        // Registrar movimento
        registerMovement(code, product.name, 'saída', quantity, product.price * quantity);
        
        // Remover produto se quantidade for zero
        if (product.quantity === 0) {
            inventory.splice(productIndex, 1);
        }
        
        showNotification(`Removido: ${quantity} unidades de ${product.name}`, 'success');
        
        // Atualizar UI
        updateDashboard();
        loadInventoryTable();
        loadMovementsTable();
        updateProductSelect();
        
        // Limpar formulário
        document.getElementById('remove-product-form').reset();
    }
}

// Excluir produto
function deleteProduct(code) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este produto?');
    
    if (confirmDelete) {
        const productIndex = inventory.findIndex(item => item.code === code);
        
        if (productIndex >= 0) {
            const productName = inventory[productIndex].name;
            inventory.splice(productIndex, 1);
            
            showNotification(`Produto excluído: ${productName}`, 'success');
            
            // Atualizar UI
            updateDashboard();
            loadInventoryTable();
            updateProductSelect();
        }
    }
}

// Registrar movimentação
function registerMovement(code, productName, type, quantity, totalValue) {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const movement = {
        date: dateString,
        code,
        productName,
        type,
        quantity,
        totalValue
    };
    
    movements.push(movement);
}

// Mostrar notificação
function showNotification(message, type = 'success') {
    // Remover notificações existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-icon">
            ${type === 'success' ? '✓' : type === 'error' ? '✗' : '⚠'}
        </div>
        <div class="notification-content">
            <div class="notification-title">${type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Aviso'}</div>
            <div>${message}</div>
        </div>
        <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Fechar ao clicar no botão
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Fechar automaticamente após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Função auxiliar para obter nome da categoria
function getCategoryName(categoryCode) {
    const categories = {
        'electronics': 'Eletrônicos',
        'furniture': 'Móveis',
        'clothing': 'Vestuário',
        'books': 'Livros',
        'other': 'Outros'
    };
    
    return categories[categoryCode] || categoryCode;
}