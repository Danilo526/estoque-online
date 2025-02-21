// Formulário de adição de produto
const addForm = document.getElementById('add-product-form');
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        loader.show();
        
        // Simula processamento
        setTimeout(() => {
            const newProduct = {
                id: products.length + 1,
                code: document.getElementById('product-code').value,
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                price: parseFloat(document.getElementById('product-price').value),
                quantity: parseInt(document.getElementById('product-quantity').value),
                status: parseInt(document.getElementById('product-quantity').value) <= 5 ? "Baixo estoque" : "Em estoque"
            };
            
            products.push(newProduct);
            
            // Atualiza a interface
            loadInventoryTable();
            updateDashboard();
            populateProductSelect();
            
            // Limpa o formulário
            this.reset();
            
            loader.hide();
            notify.success('Produto adicionado com sucesso!');
        }, 500);
    });
}

// Event listeners para os botões de ação na tabela
function addTableActionEventListeners() {
    // Botões de edição
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Aqui você implementaria a lógica para editar o produto
                // Por exemplo, abrir um modal com um formulário preenchido
                notify.warning('Função de edição em desenvolvimento');
            }
        });
    });
    
    // Botões de exclusão
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                loader.show();
                
                // Simula processamento
                setTimeout(() => {
                    products = products.filter(p => p.id !== productId);
                    
                    // Atualiza a interface
                    loadInventoryTable();
                    updateDashboard();
                    populateProductSelect();
                    
                    loader.hide();
                    notify.success('Produto removido com sucesso!');
                }, 500);
            }
        });
    });
}

// Remover produto pelo formulário de remoção rápida
const removeForm = document.getElementById('remove-product-form');
if (removeForm) {
    removeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = parseInt(document.getElementById('remove-product-select').value);
        if (!productId) {
            notify.error('Selecione um produto para remover');
            return;
        }
        
        const product = products.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById('remove-quantity').value);
        
        if (quantity <= 0) {
            notify.error('A quantidade deve ser maior que zero');
            return;
        }
        
        if (quantity > product.quantity) {
            notify.error('Quantidade informada maior que disponível em estoque');
            return;
        }
        
        loader.show();
        
        // Simula processamento
        setTimeout(() => {
            // Atualiza a quantidade
            product.quantity -= quantity;
            
            // Se a quantidade chegou a zero, remove o produto
            if (product.quantity === 0) {
                products = products.filter(p => p.id !== productId);
            } else {
                // Atualiza o status se necessário
                product.status = product.quantity <= 5 ? "Baixo estoque" : "Em estoque";
            }
            
            // Registra a transação
            const newTransaction = {
                date: "21/02/2025", // Data atual simulada
                code: product.code,
                product: product.name,
                type: "Saída",
                quantity: quantity,
                totalValue: product.price * quantity
            };
            
            transactions.push(newTransaction);
            
            // Atualiza a interface
            loadInventoryTable();
            loadDailyReport();
            updateDashboard();
            populateProductSelect();
            
            // Limpa o formulário
            this.reset();
            
            loader.hide();
            notify.success(`${quantity} unidades removidas do estoque com sucesso!`);
        }, 500);
    });
}