# ZBRA Challenge

Uma simples página com um formulário que deve validar nome, email e senha para uma REST API pré-determinada.

## Como executar

### Opção 1: pelo CodeSandbox

Acesse o projeto através do link abaixo e teste o formulário lado a lado com o código:

[![Edit form-password-validator](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/form-password-validator-ykjy94)

### Opção 2: execute localmente

Deve ter o Git e o [Node.js](https://nodejs.org/en/download/package-manager) previamente instalado antes de executar os comandos abaixo:

```bash
# Clone o projeto
$ git clone https://github.com/zbra-repos/avpalmeira_2024-07-03
$ cd avpalmeira_2024-07-03

# Instale as dependencias
$ npm install

# Execute o projeto
$ npm start
```

## Como testar

Para executar os testes unitários clone o projeto (descrito acima) e execute no terminal:

```bash
$ npm test
```

## A solução

Estas foram as ferramentas e libs escolhidas para desenvolver a solução

- CodeSandbox para a criação do projeto
- Libs de form e validation: React-hook-form e Zod
- CSS lib: Material-UI com Emotion
- Fetch API para envio de chamada
- Test runner: Jest

### CodeSandbox

Escolhi desenvolver o projeto no CodeSandbox pela facilidade e velocidade de prototipação e início para configurar o projeto.

Nele é possível desenvolver os componentes da aplicação ao mesmo tempo que se visualiza o resultado em tela após cada mudança no código,
podendo também testar o seu funcionamento.

Há a facilidade de se exportar o projeto para um repo no Github, então assim o fiz assim que estava satisfeito com a solução.

### Form e validação

React-hook-form e Zod são libraries que cumprem bem seu papel e integram muito bem para a validação de um form em React.

No caso específico da solução proposta que deveria mostrar todas as mensagens de erro quando houvesse algum problema de validação da senha
não foi possível usar o `zodResolver` padrão do package `@hookform/resolvers`, então criei um `customZodResolver` em `utils.tsx`
que retornava todos os problemas de validação.

### Estilos e responsividade

Para a estilização dos componentes e responsividade foram usadas a biblioteca de componentes React da Material-UI que usa o Emotion por padrão.

A ideia inicial era utilizar o Tailwind para acelerar a prototipação do projeto, mas foi observada uma grande dificuldade em integrá-lo com o CodeSandbox,
então mudei os planos para usar o Material-UI.

De fato a biblioteca não traz tanta flexibilidade para customização dos componentes e em alguns casos tive que recorrer ao uso de prop `sx`
para adicionar inline-styles ao componente, personalizar componente usando o Emotion ou injetar css no componente para responsividade (`styles.ts`).

### Fetch API

Para envio de chamadas foi usada a biblioteca padrão do JavaScript `fetch`

### Test runner

Jest é uma das bibliotecas mais consolidadas, rápidas e robustas atualmente para criar e executar testes em JavaScript.

No arquivo `validation.test.js` foram criados testes para cada um dos tipos de validação usados no campo de senha.

Para criação de testes de integração ou de componentes é possível utilizar a lib `@testing-library/react` junto com
os métodos `render`, `screen` e `fireEvent` para executar eventos nos componentes e identificar comportamentos desejados
como mensagens de erro e identificar se botão está desabilitado ou não.
