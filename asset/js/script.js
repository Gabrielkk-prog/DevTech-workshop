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

function cadastrar(event) {
    event.preventDefault(); // impede envio automático

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const area = document.getElementById("area").value;

    if (!nome || !email || !area) {
        alert("Preencha Nome, Email e Área.");
        return;
    }

      if (document.getElementById("tabelaInscritos")) {

        carregarInscritos();

    }
    // AGORA sim envia pro Formspree
    document.getElementById("cadastro-form").submit();

    const message = document.getElementById("cadastro-message");
    message.innerText = "Cadastro realizado com sucesso! Obrigado por participar.";
    message.style.display = "block";
    message.scrollIntoView({ behavior: "smooth", block: "center" });
}


