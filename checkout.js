import {
  apagarDoLocalStorage,
  desenharProdutoCarrinhoSimples,
  lerLocalStorage,
  salvarLocalStorage,
} from "./src/utils";

function desenharProdutoCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evt) {
  evt.preventDefault();
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  const dataAtual = new Date();

  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");
  window.location.href = "./pedidos.html";
}

desenharProdutoCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
