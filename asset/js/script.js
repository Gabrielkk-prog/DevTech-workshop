const dataEvento = new Date(2026, 7, 23, 19, 0, 0);
const Ambos = document.getElementById('marcarTodos');
const campoTexto = document.getElementById('opiniao');
function atualizarContador() {
    const agora = new Date();
    const diferenca = dataEvento - agora;
    const dias = Math.max(0, Math.floor(diferenca / (1000 * 60 * 60 * 24)));
    const horas = Math.max(0, Math.floor((diferenca / (1000 * 60 * 60)) % 24));
    const minutos = Math.max(0, Math.floor((diferenca / (1000 * 60)) % 60));
    const segundos = Math.max(0, Math.floor((diferenca / 1000) % 60));

    document.getElementById("tempo").innerText = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
}
setInterval(atualizarContador, 1000);
atualizarContador();


