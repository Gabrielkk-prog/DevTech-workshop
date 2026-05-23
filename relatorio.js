<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

const supabaseClient = supabase.createClient(
  "https://qgnaenyrbxgjaesejhoc.supabase.co",
  "sb_publishable_4xw9YjqGOxeyB5LxZBmGDw_wrYelGGb"
);



    // ========================================
    // RELATÓRIO
    // ========================================

    if (document.getElementById("tabelaInscritos")) {
        carregarInscritos();
    }


// ========================================
// CARREGAR INSCRITOS
// ========================================

async function carregarInscritos() {
    try {
        console.log("🔄 Buscando inscritos...");

        const { data, error } = await supabaseClient
            .from("Cadastro")
            .select("*")
            .order("id", {
                ascending: false
             });

        console.log("📊 Dados:", data);
        console.log("⚠️ Erro:", error);

        if (error) {
            console.error("❌ Erro:", error);
            alert("Erro: " + error.message);
            return;
        }

        if (!data || data.length === 0) {
            console.warn("⚠️ Nenhum dado encontrado");
            alert("Nenhum cadastro encontrado");
            return;
        }

        const tabela = document.getElementById("tabelaInscritos");
        if (!tabela) return;

        tabela.innerHTML = "";

        data.forEach(inscrito => {
            tabela.innerHTML += `
                <tr>
                    <td>${inscrito.nome ?? ""}</td>
                    <td>${inscrito.email ?? ""}</td>
                    <td>${inscrito.telefone ?? ""}</td>
                    <td>${inscrito.atuacao ?? ""}</td>
                    <td>${inscrito.interesse ?? ""}</td>
                    <td>${inscrito.data ?? ""}</td>
                </tr>
            `;
        });

        console.log("✅ Relatório carregado!");
    } catch (err) {
        console.error("❌ Erro geral:", err);
        alert("Erro inesperado: " + (err.message || "Erro desconhecido"));
    }


    const { data, error } =
        await supabaseClient
            .from("Cadastro")
            .select("*")
            .order("id", {
                ascending: false
            });

    if (error) {

        console.error(error);

        alert(error.message);

        return;
    }
}

const tabela =
        document.getElementById(
            "tabelaInscritos"
        );

    if (!tabela) return;

    tabela.innerHTML = "";

    data.forEach(inscrito => {

        tabela.innerHTML += `

            <tr>

                <td>
                    <input
                        type="text"
                        id="nome-${inscrito.id}"
                        value="${String(inscrito.nome || '').replace(/"/g, '&quot;')}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="email"
                        id="email-${inscrito.id}"
                        value="${inscrito.email ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="telefone-${inscrito.id}"
                        value="${inscrito.telefone ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="atuacao-${inscrito.id}"
                        value="${inscrito.atuacao ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="interesse-${inscrito.id}"
                        value="${inscrito.interesse ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    ${inscrito.data ?? ""}
                </td>

                <td>

                    <button
                        id="btnEditar-${inscrito.id}"
                        onclick="habilitarEdicao(${inscrito.id})"
                    >
                        Editar
                    </button>

                    <button
                        onclick="excluirRegistro(${inscrito.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `;
    });

    // ========================================
    // MÉTRICAS
    // ========================================

    const totalInscritos =
        document.getElementById(
            "totalInscritos"
        );

    if (totalInscritos) {

        totalInscritos.innerText =
            data.length;
    }

    const totalAreas =
        document.getElementById(
            "totalAreas"
        );

    if (totalAreas) {

        const areas = [

            ...new Set(
                data.map(
                    i => i.atuacao
                )
            )
        ];

        totalAreas.innerText =
            areas.length;
    }


// ========================================
// HABILITAR EDIÇÃO
// ========================================

function habilitarEdicao(id) {

    document.getElementById(
        `nome-${id}`
    ).readOnly = false;

    document.getElementById(
        `email-${id}`
    ).readOnly = false;

    document.getElementById(
        `telefone-${id}`
    ).readOnly = false;

    document.getElementById(
        `atuacao-${id}`
    ).readOnly = false;

    document.getElementById(
        `interesse-${id}`
    ).readOnly = false;

    const botao =
        document.getElementById(
            `btnEditar-${id}`
        );

    botao.innerText = "Salvar";

    botao.onclick = function () {

        salvarEdicao(id);
    };
}

// ========================================
// SALVAR EDIÇÃO
// ========================================

async function salvarEdicao(id) {

    const nome =
        document.getElementById(
            `nome-${id}`
        ).value;

    const email =
        document.getElementById(
            `email-${id}`
        ).value;

    const telefone =
        document.getElementById(
            `telefone-${id}`
        ).value;

    const atuacao =
        document.getElementById(
            `atuacao-${id}`
        ).value;

    const interesse =
        document.getElementById(
            `interesse-${id}`
        ).value;

    const { error } =
        await supabaseClient
            .from("Cadastro")
            .update({

                nome,
                email,
                telefone,
                atuacao,
                interesse

            })
            .eq("id", id);

    if (error) {

        console.error(error);

        alert(
            "Erro ao atualizar registro."
        );

        return;
    }

    document.getElementById(
        `nome-${id}`
    ).readOnly = true;

    document.getElementById(
        `email-${id}`
    ).readOnly = true;

    document.getElementById(
        `telefone-${id}`
    ).readOnly = true;

    document.getElementById(
        `atuacao-${id}`
    ).readOnly = true;

    document.getElementById(
        `interesse-${id}`
    ).readOnly = true;

    const botao =
        document.getElementById(
            `btnEditar-${id}`
        );

    botao.innerText = "Editar";

    botao.onclick = function () {

        habilitarEdicao(id);
    };

    alert(
        "Registro atualizado com sucesso!"
    );
}

// ========================================
// EXCLUIR REGISTRO
// ========================================

async function excluirRegistro(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir?"
        );

    if (!confirmar) return;

    const { error } =
        await supabaseClient
            .from("Cadastro")
            .delete()
            .eq("id", id);

    if (error) {

        console.error(error);

        alert(
            "Erro ao excluir registro."
        );

        return;
    }

    alert(
        "Registro excluído!"
    );

    carregarInscritos();
}
