Como abrir o projeto no Chrome para depuração

1) Usando o script `start` (porta 8080):

```bash
npm run start
```

2) Ou usando Live Server (porta 5500):

```bash
npm run live
```

3) No VS Code:
- Abra a paleta (Ctrl+Shift+P) → `Tasks: Run Task` → selecione `Start Dev Server`.
- Em seguida, abra a aba Run (Executar) e escolha a configuração `Launch Chrome against localhost` ou `Launch with Live Server` e clique em Start.

4) Dicas de depuração:
- Abra o DevTools (F12) para ver erros de Console/Network.
- Caso use `<script type="module">`, certifique-se de servir via HTTP (não `file://`).
- Limpe cache com Ctrl+F5 para forçar recarregamento.
