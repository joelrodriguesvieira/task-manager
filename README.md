# 📝 Gerenciador de Tarefas

Aplicação web fullstack para organização de tarefas pessoais ou profissionais, com funcionalidades de criação, edição, exclusão e visualização de tarefas organizadas por status ("A Fazer", "Em Progresso" e "Finalizada").

---

## 🚀 Tecnologias Utilizadas

### Frontend:

- **Next.js** (com `use client`)
- **TypeScript**
- **CSS Modules**
- **Lucide React** (ícones)

### Backend:

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via MongoDB Atlas)
- **Mongoose** (ODM)

---

## Arquitetura do Projeto

Este projeto utiliza uma arquitetura de monorepo gerenciada pelo Turborepo. A estrutura principal é a seguinte:

├── apps/
│ ├── api/ # Aplicação Back-end (Node.js, Express)
│ └── web/ # Aplicação Front-end (Next.js)
├── packages/ # (Opcional: para código reutilizável entre as apps)
├── turbo.json # Configuração do Turborepo
└── README.md

### Back-end (`apps/api`)

O back-end é construído utilizando Node.js, Express e TypeScript. A persistência dos dados é feita com MongoDB através do Mongoose. A estrutura de pastas do back-end é a seguinte:

src/
├── config/ # Arquivos de configuração (banco de dados, etc.)
├── controllers/ # Lógica para lidar com as requisições HTTP
├── interfaces/ # Definições de tipo para TypeScript
├── models/ # Schemas do Mongoose para os dados
├── repositories/ # Lógica para interagir com o banco de dados
├── routes/ # Definição das rotas da API
├── services/ # Lógica de negócios da aplicação
└── index.ts # Ponto de entrada da aplicação back-end

**Bibliotecas Utilizadas (Back-end):**

- **Node.js:** Ambiente de execução JavaScript para o servidor.
- **Express:** Framework web minimalista e flexível para Node.js.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Mongoose:** Biblioteca para modelagem de objetos MongoDB em Node.js.
- **MongoDB:** Banco de dados NoSQL utilizado para persistência dos dados.
- **cors:** Middleware para habilitar o Cross-Origin Resource Sharing (CORS).
- **dotenv:** Para carregar variáveis de ambiente de um arquivo `.env`.
- **nodemon:** (Apenas em desenvolvimento) Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **ts-node:** (Apenas em desenvolvimento) Permite executar arquivos TypeScript diretamente.
- **@types/\***: Definições de tipo para as bibliotecas JavaScript utilizadas.

### Front-end (`apps/web`)

O front-end é desenvolvido utilizando o framework Next.js, que permite a criação de aplicações React com renderização no servidor e outras funcionalidades. A estrutura de pastas do front-end é a seguinte:

src/
├── components/ # Componentes reutilizáveis da interface do usuário
├── styles/ # Estilos globais e de módulos CSS
├── types/ # Definições de tipo para TypeScript
├── utils/ # Funções utilitárias
├── globals.css # Estilos globais da aplicação
├── layout.tsx # Layout principal da aplicação
├── page.module.css # Estilos para a página principal
└── page.tsx # Página principal da aplicação (listagem de tarefas)

**Bibliotecas Utilizadas (Front-end):**

- **Next.js:** Framework React para a construção de aplicações web com renderização no servidor e roteamento.
- **React:** Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Lucide React:** Biblioteca de React para exibir ícones e símbolos.

---

## 🛠️ Como Configurar o MongoDB Atlas

Para testar a aplicação, você precisa de uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Siga os passos abaixo:

### 1. Criar Conta

- Acesse: https://www.mongodb.com/cloud/atlas
- Clique em **Start Free** e crie uma conta (ou entre com GitHub/Google).
- Crie uma **Organização** e um **Projeto**.

### 2. Criar um Cluster Gratuito

- Clique em **Build a Database**
- Selecione a opção **Free Shared** (M0)
- Escolha uma região e clique em **Create Cluster**

### 3. Criar um Usuário de Banco

- Vá em **Database Access** > **Add New Database User**
- Defina um **username** e **password**
- Deixe as permissões como **Read and Write to any database**
- Clique em **Add User**

### 4. Permitir Conexões

- Vá em **Network Access**
- Clique em **Add IP Address**
- Escolha **Allow Access from Anywhere (0.0.0.0/0)**
- Confirme

### 5. Copiar a URI de Conexão

- Vá em **Clusters > Connect > Connect your application**
- Copie a URI semelhante a esta:

```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.xxxxx.mongodb.net/<DATABASE>?retryWrites=true&w=majority
```

    Substitua `<USERNAME>`, `<PASSWORD>` e `<DATABASE>` pelos dados criados.

### 6. Criar o Arquivo `.env`

Crie um arquivo `.env` na pasta `apps/api` com:

```
MONGODB_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.xxxxx.mongodb.net/<DATABASE>?retryWrites=true&w=majority
```

## Instruções para Executar a Aplicação

Siga estas etapas para executar a aplicação localmente:

1.  **Clonar o repositório:**

    ```bash
    git clone [https://github.com/joelrodriguesvieira/task-manager.git](https://github.com/joelrodriguesvieira/task-manager.git)
    cd task-manager
    ```

2.  **Instalar as dependências:**
    Utilizando o Turborepo, você pode instalar todas as dependências de uma vez na raiz do projeto:

    ```bash
    pnpm install
    ```

3.  **Executar a aplicação em modo de desenvolvimento:**
    Na raiz do projeto, execute o seguinte comando para iniciar ambos os aplicativos (front-end e back-end) em modo de desenvolvimento:

    ```bash
    pnpm run dev
    ```

5.  **Acessar a aplicação:**
    Abra seu navegador e acesse a URL do front-end (`http://localhost:3000`).

## Autor

- [JOEL RODRIGUES VIEIRA]
- [https://github.com/joelrodriguesvieira]
