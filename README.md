# Discord Bot Template 🚀

Um template robusto e moderno para criação de bots de Discord utilizando **TypeScript**, **Discord.js v14** e as melhores práticas de desenvolvimento.

## ✨ Funcionalidades

-   🛡️ **TypeScript**: Desenvolvimento totalmente tipado para evitar erros em runtime.
-   📂 **Auto-loading**: Sistema automático para carregar comandos e eventos.
-   📝 **Winston Logging**: Logs profissionais com escopos, cores no console e salvamento em arquivos (`logs/`).
-   🎨 **Qualidade de Código**: Configuração rigorosa de **ESLint 9** e **Prettier**.
    -   Ordenação de imports por tamanho de linha.
    -   Remoção automática de imports não utilizados.
    -   Estilo consistente (4 espaços, sem ponto e vírgula, aspas duplas).
-   ⚙️ **Gestão de Variáveis**: Integração com `@marcuth/env` para um gerenciamento seguro do `.env`.

## 🛠️ Pré-requisitos

-   [Node.js](https://nodejs.org/) (v16.x ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma conta no [Discord Developer Portal](https://discord.com/developers/applications)

## 🚀 Instalação e Início

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/discord-bot-template.git
    cd discord-bot-template
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o ambiente:**
    Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis:
    ```env
    DISCORD_BOT_TOKEN=seu_token_aqui
    DISCORD_ADMIN_ID=seu_id_de_usuario_discord
    DISCORD_APPLICATION_ID=id_da_sua_aplicacao
    DISCORD_PUBLIC_KEY=sua_chave_publica
    ```

4.  **Inicie o bot:**
    ```bash
    # Modo desenvolvimento
    npm run dev

    # Modo desenvolvimento com auto-reload (nodemon)
    npm run dev:reload

    # Build para produção
    npm run build
    npm start
    ```

## 📜 Scripts Disponíveis

| Comando            | Descrição                                             |
| ------------------ | ----------------------------------------------------- |
| `npm run dev`      | Executa o bot em modo de desenvolvimento.             |
| `npm run dev:reload` | Executa o bot com Nodemon para reiniciar ao salvar.   |
| `npm run build`    | Compila o TypeScript para JavaScript (pasta `dist/`). |
| `npm start`        | Inicia o bot compilado.                               |
| `npm run lint`     | Verifica erros de linting.                            |
| `npm run lint:fix` | Corrige erros de linting e formata o código.          |

## 📁 Estrutura de Pastas

```text
src/
├── client/          # Lógica central do bot
│   ├── commands/    # Comandos (Slash Commands)
│   ├── events/      # Handlers de eventos do Discord
│   ├── handlers/    # Carregadores automáticos
│   └── helpers/     # Auxiliares de configuração
├── enums/           # Enums globais
├── interfaces/      # Definições de tipos e interfaces
└── utils/           # Utilitários (Logger, JSON parser, etc.)
```

## ⚖️ Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Feito com ❤️ por [Marcuth](https://github.com/marcuth)
