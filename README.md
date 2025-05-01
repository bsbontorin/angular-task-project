<!-- Improved compatibility of back to top link -->
<a id="readme-top"></a>

[![License: AGPL v3.0][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#construção">Construção</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#melhorias">Melhorias</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Sobre o projeto

O projeto emprega a abordagem de componentes independentes, assim como a técnica de componentes em arquivo único, organizando cada funcionalidade em unidades auto-suficientes e isoladas, o que torna a manutenção mais fácil e promove a reutilização. 

A configuração das pastas adota uma metodologia modular, diferenciando de forma clara os seguintes elementos:

- `components/` para elementos visuais reutilizáveis (por exemplo: botões, formulários, etc.),
- `services/` para lógica de aplicação e interação com APIs,
- `models/` para definições de tipos e interfaces,
- `pages/` para componentes relacionados a rotas específicas.

Adicionalmente, o projeto implementa práticas recomendadas do Angular, como a injeção de dependências, a utilização de RxJS para a gestão de estados reativos e a programação declarativa, além da adoção do SASS para criar componentes UI consistentes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Construção

O desenvolvimento do projeto ocorreu com a utilização do angular na versão `19.2.9` e do node na versão `22.15.0`. Além disso, outras tecnologias foram empregadas ao longo do processo:

- [![Angular][Angular]][Angular-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![HTML5][HTML5]][HTML5-url]
- [![CSS3][CSS3]][CSS3-url]
- [![SASS][SASS]][SASS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Começando

Para obter uma cópia local e executá-la, siga os passos abaixo.

### Pré-requisitos

Antes de tudo, é necessário ter o node em uma das seguintes versões `^18.19.1 || ^20.11.1 || ^22.0.0` e o npm nas versões compatíveis instalados em seu sistema, conforme descrito na [documentação de suporte](https://angular.dev/reference/versions) do Angular. Para verificar as versões instaladas, execute os seguintes comandos no terminal:

- node

  ```sh
  node -v
  ```

- npm
  ```sh
  npm -v
  ```

Se as versões não estiverem corretas, é possível atualizá-las usando os seguintes comandos:

- node

  ```sh
  npm install -g n
  n latest
  ```

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/bsbontorin/angular-task-project.git
   ```
2. Entre no diretório do projeto
   ```sh
   cd angular-task-project
   ```
3. Instale as dependências
   ```sh
   npm install
   ```
4. Inicie o servidor de desenvolvimento

   ```sh
   # para rodar tanto o frontend quanto o backend na mesma instância do terminal
   npm run all

   # para rodar o frontend
   npm run start

   # para rodar o backend
   npm run api
   ```

5. Abra o navegador e acesse `http://localhost:4200/` para ver a aplicação em execução.

<!-- IMPROVEMENTS -->

## Melhorias

Este projeto foi desenvolvido com o intuito de ser uma aplicação de gerenciamento de tarefas simples. Assim sendo, há várias melhorias que podem ser feitas para torná-lo melhor, conforme abaixo:

1. **Autenticação e Autorização**: Adicionar um sistema de autenticação para que os usuários possam criar contas e gerenciar suas próprias tarefas.
2. **Persistência de Dados**: O projeto usa um mock de API fornecido pelo JSON-SERVER. Necessário, implementar uma solução de armazenamento persistente.
3. **Interface do Usuário**: Melhorar a interface do usuário para torná-la mais intuitiva e agradável.
4. **Funcionalidades Adicionais**: Adicionar mais funcionalidades como categorias, prioridades, pesquisa, etc.
5. **Testes**: Implementar testes automatizados para garantir a qualidade do código.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## Licença

Distribuído sob a GNU Affero General Public License v3.0. Veja `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contato

Bruno Bontorin - [linkedin][linkedin-url]

Link do projeto: [https://github.com/bsbontorin/angular-task-project](https://github.com/bsbontorin/angular-task-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[license-url]: https://github.com/bsbontorin/angular-task-project/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/bsbontorin/angular-task-project.svg?style=for-the-badge

<!--  -->

[linkedin-url]: https://linkedin.com/in/bsbontorin
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white

<!--  -->

[Angular-url]: https://angular.dev/
[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white

<!--  -->

[TypeScript-url]: https://www.typescriptlang.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white

<!--  -->

[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://www.w3.org/html/logo/

<!--  -->

[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://www.w3.org/Style/CSS/

<!--  -->

[SASS]: https://img.shields.io/badge/Sass-000?style=for-the-badge&logo=sass
[SASS-url]: https://sass-lang.com/
