document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro-form");
  const botao = document.getElementById("btnEnviar");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    botao.disabled = true;
    botao.innerText = "Conectando...";

    const loginVal = document.getElementById('admin')?.value?.trim();
    const passVal = document.getElementById('808')?.value?.trim();

    if (loginVal === 'admin' && passVal === '808') {
      alert('✅ login aceito! Redirecionando...');
      window.location.href = 'relatorio.html';
      return;
    }

    alert('Usuário ou senha incorretos.');
    botao.disabled = false;
    botao.innerText = 'enviar';
  });
});
