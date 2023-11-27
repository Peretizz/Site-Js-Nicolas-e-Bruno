document.addEventListener('DOMContentLoaded', function () {
    // Array para armazenar os itens do carrinho
    var carrinhoItens = [];

    // Função para atualizar o carrinho e calcular o total
    function atualizarCarrinho() {
        // Lógica para atualizar o carrinho aqui
        // ...

        // Atualize o total
        var total = carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        document.getElementById('total').textContent = 'Total: R$ ' + total.toFixed(2);
    }

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho(nome, preco, quantidade) {
        carrinhoItens.push({ nome: nome, preco: preco, quantidade: quantidade });
        atualizarCarrinho();
    }

    // Função para remover um item do carrinho
    function removerDoCarrinho(index) {
        carrinhoItens.splice(index, 1);
        atualizarCarrinho();
    }

    // Evento de clique nos botões de compra
    var botoesCompra = document.querySelectorAll('.card button');
    botoesCompra.forEach(function (botao, index) {
        botao.addEventListener('click', function () {
            // Substitua esses valores pelos dados reais do produto
            var nome = 'Nome do Produto';
            var preco = 19.99;
            var quantidade = 1;
            adicionarAoCarrinho(nome, preco, quantidade);
        });
    });

    // Evento de clique no botão de finalizar compra
    document.getElementById('finalizarCompra').addEventListener('click', function () {
        // Lógica para validar o formulário aqui
        // ...

        // Lógica para enviar os dados do formulário via e-mail
        // ...

        // Lógica para salvar o total da venda no localStorage
        localStorage.setItem('historicoVendas', JSON.stringify(carrinhoItens.map(item => item.preco * item.quantidade)));

        // Lógica para enviar os dados ao servidor
        // ...

        // Lógica para mostrar o total das vendas no site
        var historicoVendas = JSON.parse(localStorage.getItem('historicoVendas'));
        var totalVendas = historicoVendas ? historicoVendas.reduce((acc, venda) => acc + venda, 0) : 0;
        document.getElementById('totalVendas').textContent = 'Total de Vendas: R$ ' + totalVendas.toFixed(2);
    });

    // Evento de clique nos botões de remoção do carrinho
    var botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(function (botao, index) {
        botao.addEventListener('click', function () {
            removerDoCarrinho(index);
        });
    });
})
var cartItems = [];
var cartTotal = 0;

function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  cartTotal += price;

  // Atualizar o carrinho de compras na página
  updateCart();
}

function updateCart() {
  var cartItemsList = document.getElementById('cart-items');
  var cartTotalElement = document.getElementById('cart-total');

  // Limpar a lista de itens do carrinho
  cartItemsList.innerHTML = '';

  // Adicionar cada item ao carrinho à lista
  cartItems.forEach(function(item) {
    var listItem = document.createElement('li');
    listItem.textContent = item.name + ' - R$' + item.price;
    cartItemsList.appendChild(listItem);
  });

  // Atualizar o total do carrinho
  cartTotalElement.textContent = cartTotal.toFixed(2);
}