# Desafio de Consulta Processual

Nesse Desafio de consulta processual, comecei populando o Mongodb com os dados Json, em seguida, desenvolvi a API que se conecta com o MongoDB, 
implementando os métodos read e readOne no controller. Na sequência, iniciei o desenvolvimento do front-end baixando a biblioteca 
EsLint visando encontra e corrigir problemas do meu código e estiliza o meu código, 
facilitando assim a criação do contexto que deixava o estado globa e as paginas de Busca e Explorar, conforme solicitado no desafio. 
Na página de Busca, utilizei a biblioteca Axios para fazer a conexão do front e o back para que assim que o 
usuário escolha o tribunal ou o CNJ que deseja ser redirecionando para página de Explorar que terá o processo que o usuário buscou, 
onde poderá verificar o número do processo buscado, o autor e o réu, o tribunal de origem, a data do início, a data da movimentação e a descrição dela. 
Feito o front e o back, comecei a fazer a realização dos testes de Frontend utilizando a biblioteca Jest com objetivo de testa o Axios e o seu retorno. 
Fazendo assim que meu site rodasse localmente, para ter certeza que o meu código rodara num Mac OS X OU no Ubuntu conforme o desafio pedia, 
decidir realizar, criando um Markfile e um Docker-compose na raiz da página que o DockerFile do front-end e do back-end rodasse, 
esse sem dúvidas foi o meu maior desafio, me fazendo restrutura o meu código por completo para ter a maior certeza de que quando rodasse o 
**make run** o contêiner do front, do back e Mongo subisse para rodar o meu site em qualquer máquina, 
além disso, fiz o **make test** para a certeza que os meus testes ainda estava funcionando.

- Para rodar o meu codigo **make run**
- Para rodar os meus testes **make test**
- Abaixo vai estar o gif do meu site funcionando ⬇️

![siteDeConsultaProcessual](https://user-images.githubusercontent.com/75230945/231012078-1dd95ba6-9dc5-4aa8-b1f4-b0824a2fadd9.gif)
