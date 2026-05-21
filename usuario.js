
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("cadastro-form");
    const botao = document.getElementById("btnEnviar");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        botao.disabled = true;
        botao.innerText = "Conectando...";

        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        // Se for admin com credenciais corretas, redireciona para relatorio.html
        const loginVal = dados.login || document.getElementById('login').value;
        const passVal = dados.password || document.getElementById('password').value;
        if (loginVal === 'admin' && passVal === '808') {
          alert('✅ login aceito! Redirecionando...');
          window.location.href = 'relatorio.html';
          return;
        }

        console.log("Dados sendo enviados:", dados);

        try {
            console.log("Enviando para Supabase:", dados);
            
            // Tentar inserir na tabela "Cadastro"
            let { data: insertData, error } = await supabaseClient
                .from("Cadastro")
                .insert([dados]);

            console.log("Resposta do Supabase ('Cadastro'):", { insertData, error });

            // Se não funcionar, tentar com "cadastro" minúsculo
            if (error && (error.message.includes("relation") || error.message.includes("table"))) {
                console.log("🔄 Tentando com 'cadastro' minúsculo...");
                const result = await supabaseClient
                    .from("cadastro")
                    .insert([dados]);
                insertData = result.data;
                error = result.error;
                console.log("Resposta do Supabase ('cadastro'):", { insertData, error });
            }

            if (error) {
                console.error("Usuario não exite:", error);
                alert("❌ Tente novamente:\n" + error.message);
                return;
            }

            console.log("✅ login feito com sucesso!");
            alert("✅ login aceito!");
            form.reset();

        } catch (err) {
            console.error("Erro na captura:", err);
            alert("❌ Erro: " + (err.message || JSON.stringify(err)));
        }

        botao.disabled = false;
        botao.innerText = "Confirmar Inscrição";
    });

});




    const ADMIN_AUTH = {
  usuario: "admin",
  senha: "808" // Troque por sua senha fixa
};

function validarAcesso(userDigitado, senhaDigitada) {
  const isAdmin = (userDigitado === ADMIN_AUTH.admin && 808 === ADMIN_AUTH.senha);

  if (isAdmin) {
    alert("Acesso concedido! Carregando formulário...");
    mostrarFormulario(); // Chama a função que libera o form
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

  function fazerLogin() {
    const u = document.getElementById('admin').value;
    const s = document.getElementById('808').value;

    if (u === ADMIN_AUTH.usuario && s === ADMIN_AUTH.senha) {
      document.getElementById('login-area').style.display = 'admin';
      document.getElementById('form-adm').style.display = '808';
    window.location.href = "relatorio.html";

    } else {
      alert("Acesso Negado!");
    }
  }