// -------------------------
// CLASSES
// -------------------------

// Classe base (superclasse)
class Produto {
  constructor(nome, preco, categoria = "geral") {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }
}

// Classe filha com herança
class ProdutoCarrinho extends Produto {
  constructor(nome, preco, categoria) {
    super(nome, preco, categoria); // herança
    this.dataAdicionado = new Date();
  }
}

// Classe responsável por gerenciar o carrinho
class CarrinhoDeCompras {
  constructor() {
    this.itens = [];
    this.total = 0;
  }

  adicionar(produto) {
    this.itens.push(produto);
    this.total += produto.preco;
    this.atualizarInterface();
  }

  remover(index) {
    this.total -= this.itens[index].preco;
    this.itens.splice(index, 1);
    this.atualizarInterface();
  }

  limpar() {
    this.itens = [];
    this.total = 0;
    this.atualizarInterface();
  }

  // -------------------------
  // SWITCH (utilizando categorias)
  // -------------------------
  definirMensagemPorCategoria(produto) {
    switch (produto.categoria) {
      case "roupa":
        return "Você adicionou uma peça de roupa!";
      case "eletronico":
        return "Item eletrônico adicionado!";
      case "decoracao":
        return "Item decorativo adicionado ao carrinho!";
      default:
        return "Item adicionado ao carrinho!";
    }
  }

  atualizarInterface() {
    document.getElementById("contador").textContent = this.itens.length;

    const lista = document.getElementById("itens-carrinho");
    lista.innerHTML = "";

    // -------------------------
    // FOR (loop clássico)
    // -------------------------
    for (let i = 0; i < this.itens.length; i++) {
      const item = this.itens[i];
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nome} - R$ ${item.preco.toFixed(2)}
        <button onclick="removerItem(${i})" class="remover-item">X</button>
      `;
      lista.appendChild(li);
    }

    document.getElementById("total").textContent = `Total: R$ ${this.total.toFixed(2)}`;
  }

  finalizar() {
    // operador ternário
    this.itens.length === 0
      ? alert("Seu carrinho está vazio! Adicione algum item antes de finalizar a compra.")
      : (localStorage.setItem("carrinho", JSON.stringify(this.itens)),
         window.location.href = "comprar.html");
  }

  // -------------------------
  // LEITURA COM WHILE
  // -------------------------
  listarItensConsole() {
    let i = 0;
    while (i < this.itens.length) {
      console.log("Item:", this.itens[i].nome);
      i++;
    }
  }

  // -------------------------
  // DO WHILE (exemplo simples)
  // -------------------------
  verificarMinimo() {
    let quantidade = this.itens.length;
    do {
      console.log("Quantidade atual:", quantidade);
      quantidade--;
    } while (quantidade > 0);
  }
}

// -------------------------
// INSTÂNCIA DO CARRINHO
// -------------------------

const carrinho = new CarrinhoDeCompras();

// -------------------------
// FUNÇÕES USADAS PELO HTML
// -------------------------

function adicionarCarrinho(nome, preco, categoria = "geral") {
  const produto = new ProdutoCarrinho(nome, preco, categoria);
  
  // usando o switch
  console.log(carrinho.definirMensagemPorCategoria(produto));

  carrinho.adicionar(produto);
}

function removerItem(index) {
  carrinho.remover(index);
}

function limparCarrinho() {
  carrinho.limpar();
}

function finalizarCompra() {
  carrinho.finalizar();
}

function abrirCarrinho() {
  document.getElementById("carrinho").style.display = "block";
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
}


