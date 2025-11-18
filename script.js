let carrinho = [];
let total = 0;

function adicionarCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  total += preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  document.getElementById("contador").textContent = carrinho.length;

  const lista = document.getElementById("itens-carrinho");
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerItem(${index})" class="remover-item">X</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  total -= carrinho[index].preco;     // subtrai o valor do item removido
  carrinho.splice(index, 1);          // remove o item
  atualizarCarrinho();                // atualiza tela
}

function limparCarrinho() {
  carrinho = [];
  total = 0;
  atualizarCarrinho();
}

function abrirCarrinho() {
  document.getElementById("carrinho").style.display = "block";
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
}

function finalizarCompra() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "comprar.html";
}
