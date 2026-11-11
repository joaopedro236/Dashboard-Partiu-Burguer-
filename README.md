# Partiu Burguer — Dashboard

> **Projeto em desenvolvimento.** Este repositório está sendo construído e pode mudar; algumas funcionalidades e instruções ainda podem ser ajustadas.

Dashboard para apoiar o gerenciamento do menu e dos pedidos do Partiu Burguer. A aplicação está organizada em uma interface web e uma API, com funcionalidades de criação e consulta de pedidos, atualização de status e autorização.

## Tecnologias

- **Frontend:** React, JavaScript, Vite e Tailwind CSS
- **Backend:** Python e FastAPI
- **Banco de dados e serviços:** dependências para PostgreSQL e Redis estão incluídas na API

## Estrutura do projeto

```text
.
├── API/                 # API FastAPI, rotas, serviços e acesso a dados
│   ├── Databases/
│   ├── Routers/
│   ├── Schemas/
│   └── Services/
├── src/                 # Interface React
│   ├── Components/
│   ├── Requisitions/
│   └── StylesGlobals/
├── package.json
└── README.md
```

## Requisitos

- Node.js e pnpm
- Python 3
- Serviços de banco de dados ou cache necessários para as funcionalidades que você executar

## Como executar

### Frontend

Na raiz do repositório:

```bash
pnpm install
pnpm dev
```

O Vite exibirá no terminal o endereço local da aplicação. Para gerar uma versão de produção ou executá-la localmente:

```bash
pnpm build
pnpm preview
```

### API

Na raiz do repositório, crie e ative um ambiente virtual e instale as dependências:

```bash
python -m venv .venv
```

No macOS/Linux:

```bash
source .venv/bin/activate
```

No Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Em seguida:

```bash
pip install -r API/requirements.txt
```

Configure as variáveis de ambiente necessárias em um arquivo `.env` na raiz. A API usa `FRONTEND_URLS` para configurar as origens permitidas pelo CORS; informe as URLs do frontend separadas por vírgula. Confira também as configurações exigidas pelos serviços e integrações habilitados no ambiente.

Inicie a API com:

```bash
uvicorn API.main:app --reload
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento do frontend |
| `pnpm build` | Gera a build de produção do frontend |
| `pnpm preview` | Pré-visualiza a build localmente |
| `pnpm lint` | Executa o Oxlint |

## Contribuições

Como o projeto ainda está em desenvolvimento, sugestões, relatos de problemas e melhorias são bem-vindos. Abra uma issue ou envie um pull request.

## Status

Em desenvolvimento 🚧
