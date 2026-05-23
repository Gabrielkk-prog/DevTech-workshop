const supabaseClient = supabase.createClient(
  "https://qgnaenyrbxgjaesejhoc.supabase.co",
  "sb_publishable_4xw9YjqGOxeyB5LxZBmGDw_wrYelGGb"
);

async function carregarInscritos() {
  const tabela = document.getElementById("tabelaInscritos");
  if (!tabela) return;

  tabela.innerHTML = "";

  try {
    const { data, error } = await supabaseClient
      .from("Cadastro")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Erro ao buscar inscritos:", error);
      alert("Erro ao carregar dados: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      tabela.innerHTML = `
        <tr>
          <td colspan="7">Nenhum cadastro encontrado.</td>
        </tr>
      `;
      atualizarResumo(0, 0);
      return;
    }

    data.forEach((inscrito) => {
      tabela.innerHTML += `
        <tr>
          <td><input type="text" id="nome-${inscrito.id}" value="${sanitize(inscrito.nome)}" readonly></td>
          <td><input type="email" id="email-${inscrito.id}" value="${sanitize(inscrito.email)}" readonly></td>
          <td><input type="text" id="telefone-${inscrito.id}" value="${sanitize(inscrito.telefone)}" readonly></td>
          <td><input type="text" id="atuacao-${inscrito.id}" value="${sanitize(inscrito.atuacao)}" readonly></td>
          <td><input type="text" id="interesse-${inscrito.id}" value="${sanitize(inscrito.interesse)}" readonly></td>
          <td>${sanitize(inscrito.data)}</td>
          <td>
            <button type="button" id="btnEditar-${inscrito.id}" onclick="habilitarEdicao(${inscrito.id})">Editar</button>
            <button type="button" onclick="excluirRegistro(${inscrito.id})">Excluir</button>
          </td>
        </tr>
      `;
    });

    const totalAreas = [...new Set(data.map((item) => item.atuacao))].filter(Boolean);
    atualizarResumo(data.length, totalAreas.length);
  } catch (err) {
    console.error("Erro inesperado ao carregar inscritos:", err);
    alert("Erro inesperado ao carregar dados.");
  }
}

function sanitize(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function atualizarResumo(total, areas) {
  const totalInscritos = document.getElementById("totalInscritos");
  const totalAreas = document.getElementById("totalAreas");
  if (totalInscritos) totalInscritos.innerText = total;
  if (totalAreas) totalAreas.innerText = areas;
}

function habilitarEdicao(id) {
  const campos = ["nome", "email", "telefone", "atuacao", "interesse"];
  campos.forEach((campo) => {
    const elemento = document.getElementById(`${campo}-${id}`);
    if (elemento) elemento.readOnly = false;
  });

  const botao = document.getElementById(`btnEditar-${id}`);
  if (!botao) return;
  botao.innerText = "Salvar";
  botao.onclick = () => salvarEdicao(id);
}

async function salvarEdicao(id) {
  const nome = document.getElementById(`nome-${id}`)?.value?.trim() ?? "";
  const email = document.getElementById(`email-${id}`)?.value?.trim() ?? "";
  const telefone = document.getElementById(`telefone-${id}`)?.value?.trim() ?? "";
  const atuacao = document.getElementById(`atuacao-${id}`)?.value?.trim() ?? "";
  const interesse = document.getElementById(`interesse-${id}`)?.value?.trim() ?? "";

  try {
    const { error } = await supabaseClient
      .from("Cadastro")
      .update({ nome, email, telefone, atuacao, interesse })
      .eq("id", id);

    if (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar registro: " + error.message);
      return;
    }

    const campos = ["nome", "email", "telefone", "atuacao", "interesse"];
    campos.forEach((campo) => {
      const elemento = document.getElementById(`${campo}-${id}`);
      if (elemento) elemento.readOnly = true;
    });

    const botao = document.getElementById(`btnEditar-${id}`);
    if (botao) {
      botao.innerText = "Editar";
      botao.onclick = () => habilitarEdicao(id);
    }

    alert("Registro atualizado com sucesso!");
    carregarInscritos();
  } catch (err) {
    console.error("Erro inesperado ao salvar:", err);
    alert("Erro inesperado ao salvar registro.");
  }
}

async function excluirRegistro(id) {
  const confirmar = confirm("Deseja realmente excluir este registro?");
  if (!confirmar) return;

  try {
    const { error } = await supabaseClient
      .from("Cadastro")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir registro: " + error.message);
      return;
    }

    alert("Registro excluído com sucesso!");
    carregarInscritos();
  } catch (err) {
    console.error("Erro inesperado ao excluir:", err);
    alert("Erro inesperado ao excluir registro.");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", carregarInscritos);
} else {
  carregarInscritos();
}
