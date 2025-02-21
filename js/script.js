// Dados de exemplo para inicialização
let inventory = [
    {
        id: 1,
        code: 'TEC-001',
        name: 'Teclado Mecânico',
        category: 'electronics',
        price: 249.99,
        quantity: 15
    },
    {
        id: 2,
        code: 'MOU-002',
        name: 'Mouse Gamer',
        category: 'electronics',
        price: 129.99,
        quantity: 20
    },
    {
        id: 3,
        code: 'MON-003',
        name: 'Monitor 24"',
        category: 'electronics',
        price: 899.99,
        quantity: 5
    }
];

let transactions = [
    {
        date: '2025-02-21',
        code: 'TEC-001',
        product: 'Teclado Mecânico',
        type: 'entrada',
        quantity: 5,
        value: 1249.95
    },
    {
        date: '2025-02-21',
        code: 'MOU-002',
        product: 'Mouse Gamer',
        type: 'saída',
        quantity: 2,
        value: 259.98
    }
];

// Elementos DOM
const productNameInput = document.getElementById('product-name');
const productCodeInput = document.getElementById('product-code');
const productCategorySelect = document.getElementById('product-category');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput = document.getElementById('product-quantity');
const addStockForm = document.getElementById('add-stock-form');
const removeStockForm = document.getElementById('remove-stock-form');
const removeProductSelect = document.getElementById('remove-product-select');
const removeQuantityInput = document.getElementById('remove-quantity');
const inventoryTableBody = document.getElementById('inventory-table-body');
const dailyReportBody = document.getElementById('daily-report-body');
const totalProductsEl = document.getElementById('total-products');
const stockValueEl = document.getElementById('stock-value');
const todayEntriesEl = document.getElementById('today-entries');
const todayExitsEl = document.getElementById('today-exits');
const tabButtons = document.querySelectorAll('.tab-btn');

// Formatador de moeda
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    updateInventoryTable();
    updateDailyReport();
    updateDashboardSummary();
    populateRemoveProductSelect();
    setupEventListeners();
}

// Função para atualizar a tabela de inventário
function updateInventoryTable() {
    inventoryTableBody.innerHTML = '';
    
    inventory.forEach(item => {
        const tr = document.createElement('tr');
        
        // Define o status baseado na quantidade
        let status = '';
        if (item.quantity > 10) {
            status = '<span class="status-badge in-stock">Em estoque</span>';
        } else if (item.quantity > 0) {
            status = '<span class="status-badge low-stock">Estoque baixo</span>';
        } else {
            status = '<span class="status-badge out-of-stock">Sem estoque</span>';
        }
        
        tr.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${getCategoryName(item.category)}</td>
            <td>${currencyFormatter.format(item.price)}</td>
            <td>${item.quantity}</td>
            <td>${status}</td>
            <td>
                <span class="action-icon" onclick="editItem(${item.id})">✏️</span>
                <span class="action-icon" onclick="removeItem(${item.id})">🗑️</span>
            </td>
        `;
        
        inventoryTableBody.appendChild(tr);
    });
}

// Função para atualizar o relatório diário
function updateDailyReport() {
    dailyReportBody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.code}</td>
            <td>${transaction.product}</td>
            <td>${transaction.type === 'entrada' ? 'Entrada' : 'Saída'}</td>
            <td>${transaction.quantity}</td>
            <td>${currencyFormatter.format(transaction.value)}</td>
        `;
        
        dailyReportBody.appendChild(tr);
    });
}

// Função para atualizar o resumo do dashboard
function updateDashboardSummary() {
    // Calcular total de produtos únicos
    totalProductsEl.textContent = inventory.length;
    
    // Calcular valor total do estoque
    const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    stockValueEl.textContent = currencyFormatter.format(totalValue);
    
    // Calcular entradas e saídas do dia
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date === today);
    
    const entries = todayTransactions
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.quantity, 0);
        
    const exits = todayTransactions
        .filter(t => t.type === 'saída')
        .reduce((sum, t) => sum + t.quantity, 0);
        
    todayEntriesEl.textContent = entries;
    todayExitsEl.textContent = exits;
}

// Função para preencher o select de produtos para remoção
function populateRemoveProductSelect() {
    removeProductSelect.innerHTML = '<option value="">Selecione um produto</option>';
    
    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.code} - ${item.name} (${item.quantity} em estoque)`;
        removeProductSelect.appendChild(option);
    });
}

// Configurar listeners de eventos
function setupEventListeners() {
    // Form de adicionar ao estoque
    addStockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos
        if (!productNameInput.value || !productCodeInput.value || !productCategorySelect.value ||
            !productPriceInput.value || !productQuantityInput.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const price = parseFloat(productPriceInput.value);
        const quantity = parseInt(productQuantityInput.value);
        
        if (isNaN(price) || price <= 0) {
            alert('O preço deve ser um número positivo.');
            return;
        }
        
        if (isNaN(quantity) || quantity <= 0) {
            alert('A quantidade deve ser um número inteiro positivo.');
            return;
        }
        
        // Verificar se o código já existe
        const existingProduct = inventory.find(item => item.code === productCodeInput.value);
        
        if (existingProduct) {
            // Atualizar quantidade do produto existente
            existingProduct.quantity += quantity;
            
            // Registrar transação
            const transaction = {
                date: new Date().toISOString().split('T')[0],
                code: existingProduct.code,
                product: existingProduct.name,
                type: 'entrada',
                quantity: quantity,
                value: existingProduct.price * quantity
            };
            
            transactions.push(transaction);
            
            alert(`Quantidade atualizada para o produto ${existingProduct.name}.`);
        } else {
            // Adicionar novo item ao inventário
            const newItem = {
                id: inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1,
                code: productCodeInput.value,
                name: productNameInput.value,
                category: productCategorySelect.value,
                price: price,
                quantity: quantity
            };
            
            inventory.push(newItem);
            
            // Registrar transação
            const transaction = {
                date: new Date().toISOString().split('T')[0],
                code: newItem.code,
                product: newItem.name,
                type: 'entrada',
                quantity: newItem.quantity,
                value: newItem.price * newItem.quantity
            };
            
            transactions.push(transaction);
            
            alert('Produto adicionado com sucesso!');
        }
        
        // Atualizar a interface
        updateInventoryTable();
        updateDailyReport();
        updateDashboardSummary();
        populateRemoveProductSelect();
        
        // Limpar formulário
        addStockForm.reset();
    });
    
    // Form de remover do estoque
    removeStockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = parseInt(removeProductSelect.value);
        const quantity = parseInt(removeQuantityInput.value);
        
        // Validar campos
        if (!productId || isNaN(productId)) {
            alert('Por favor, selecione um produto.');
            return;
        }
        
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            alert('Por favor, informe uma quantidade válida.');
            return;
        }
        
        // Encontrar produto no inventário
        const productIndex = inventory.findIndex(item => item.id === productId);
        
        if (productIndex === -1) {
            alert('Produto não encontrado.');
            return;
        }
        
        const product = inventory[productIndex];
        
        // Verificar se há quantidade suficiente
        if (product.quantity < quantity) {
            alert(`Quantidade insuficiente. Disponível: ${product.quantity}`);
            return;
        }
        
        // Atualizar quantidade
        product.quantity -= quantity;
        
        // Se a quantidade chegar a zero, perguntar se deseja remover completamente
        if (product.quantity === 0 && confirm('O produto ficou sem estoque. Deseja removê-lo completamente do cadastro?')) {
            inventory.splice(productIndex, 1);
        }
        
        // Registrar transação
        const transaction = {
            date: new Date().toISOString().split('T')[0],
            code: product.code,
            product: product.name,
            type: 'saída',
            quantity: quantity,
            value: product.price * quantity
        };
        
        transactions.push(transaction);
        
        // Atualizar a interface
        updateInventoryTable();
        updateDailyReport();
        updateDashboardSummary();
        populateRemoveProductSelect();
        
        // Limpar formulário
        removeStockForm.reset();
        
        alert('Produto removido com sucesso!');
    });
    
    // Alternar entre tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabContainer = this.closest('.tab-container');
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe ativa de todos os botões e conteúdos
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Adicionar classe ativa ao botão e conteúdo correto
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Funções para editar e remover itens (chamadas pelos ícones da tabela)
function editItem(id) {
    const item = inventory.find(i => i.id === id);
    
    if (!item) {
        alert('Produto não encontrado.');
        return;
    }
    
    // Preencher formulário para edição
    productNameInput.value = item.name;
    productCodeInput.value = item.code;
    productCategorySelect.value = item.category;
    productPriceInput.value = item.price;
    productQuantityInput.value = 0; // Quantidade inicial zero para adição
    
    // Mudar para a tab