let total = 0;
let selectedItems = {};

// Lista de itens com preços fixos
const itemPrices = {
    "Salada de Frutas": 5.00,
    "Batata Chips": 5.00,
    "Slime": 5.00,
    "Bijuterias ": 3.00,
    "Garrafa decorada": 10.00
};

// Função para gerar a tabela de itens
function gerarTabelaItens() {
    const itemTable = document.getElementById("itemTable");
    itemTable.innerHTML = "";

    for (let item in itemPrices) {
        const row = document.createElement("tr");

        const itemNameCell = document.createElement("td");
        itemNameCell.innerText = item;

        const itemPriceCell = document.createElement("td");
        itemPriceCell.innerText = `R$ ${itemPrices[item].toFixed(2)}`;

        const actionCell = document.createElement("td");
        
        // Botão de adicionar
        const addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.className = "action";
        addButton.onclick = () => adicionarItem(item);

        // Botão de remover
        const removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.className = "action";
        removeButton.onclick = () => removerItem(item);

        actionCell.appendChild(addButton);
        actionCell.appendChild(removeButton);

        row.appendChild(itemNameCell);
        row.appendChild(itemPriceCell);
        row.appendChild(actionCell);

        itemTable.appendChild(row);
    }
}

// Função para adicionar um item ao total e atualizar a tabela de itens selecionados
function adicionarItem(item) {
    if (!selectedItems[item]) {
        selectedItems[item] = 0;
    }
    selectedItems[item]++;

    total += itemPrices[item];
    atualizarTotal();
    atualizarTabelaSelecionados();
}

// Função para remover um item do total e atualizar a tabela de itens selecionados
function removerItem(item) {
    if (selectedItems[item] && selectedItems[item] > 0) {
        selectedItems[item]--;
        total -= itemPrices[item];
        atualizarTotal();
        atualizarTabelaSelecionados();
    }
}

// Função para atualizar o valor total
function atualizarTotal() {
    document.getElementById("totalAmount").innerText = total.toFixed(2);
}

// Função para atualizar a tabela de itens selecionados
function atualizarTabelaSelecionados() {
    const selectedItemsTable = document.getElementById("selectedItemsTable");
    selectedItemsTable.innerHTML = "";

    for (let item in selectedItems) {
        if (selectedItems[item] > 0) {
            const row = document.createElement("tr");

            const itemNameCell = document.createElement("td");
            itemNameCell.innerText = item;

            const itemQuantityCell = document.createElement("td");
            itemQuantityCell.innerText = selectedItems[item];

            row.appendChild(itemNameCell);
            row.appendChild(itemQuantityCell);

            selectedItemsTable.appendChild(row);
        }
    }
}

// Função para finalizar a compra e calcular o troco
function finalizarCompra() {
    const paidAmount = parseFloat(document.getElementById("paidAmount").value);
    if (isNaN(paidAmount) || paidAmount <= 0) {
        alert("Por favor, insira um valor válido para o pagamento.");
        return;
    }

    const troco = paidAmount - total;

    if (troco >= 0) {
        document.getElementById("changeAmount").innerText = troco.toFixed(2);
        alert(`Compra finalizada! Total: R$${total.toFixed(2)}, Troco: R$${troco.toFixed(2)}`);
    } else {
        document.getElementById("changeAmount").innerText = "0.00";
        alert("Valor insuficiente para finalizar a compra!");
    }

    resetarCompra();
}

// Função para resetar a compra
function resetarCompra() {
    total = 0;
    selectedItems = {};
    atualizarTotal();
    atualizarTabelaSelecionados();
    document.getElementById("paidAmount").value = "";
    document.getElementById("changeAmount").innerText = "0.00";
}

// Inicializa a tabela de itens ao carregar a página
window.onload = gerarTabelaItens;
