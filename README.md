# Docker: Desafio Nginx com Node

Instrução de execução:

- Faça o clone do repositório docker-desafio-nginx-node no [GitHub](https://github.com/jhonissonsa/docker-desafio-nginx-node) usando no terminal o comando `git clone https://github.com/jhonissonsa/docker-desafio-nginx-node.git`
- Após clonar o repositório, dentro do diretório raiz do projeto, execute no terminal, o comando `docker compose up`¹.
- Aguarde o docker fazer o pull da(s) imagem, e subir os containers. Quando os containers estiverem executando², acesse no browser o endereço [http://localhost:8080](http://localhost:8080)
- Cada vez que atualizar a página ou acessá-la será adicionando um novo nome na lista. Se os containers forem encerrados os nomes que estavam armazenados no banco somem.

Obs.: 
¹ algumas versões mais antigas do docker compose utilizam o comando `docker-compose up`.
² o log mostra a mensagem "Rodando na porta 3000" quando o container da aplicação está executando
