 # Desafio de Consulta Processual

Nesse Desafio de consulta processual, comecei populando o Mongodb com dados json, em seguida, desenvolvi a API que se conecta com o banco 
implementando os métodos read e readOne no controller. 

Na sequência, iniciei o desenvolvimento do frontend usando a biblioteca React. Utilizei também o EsLint para encontrar e corrigir problemas no código. 

Para a gestão de estado dos componentes foi utilizado a api react context.

Na página de Busca utilizei o Axios para fazer a conexão do front com o back. Dessa forma, é possível buscar processos por tribunal ou número CNJ. 

Na página de resultados o usuário poderá acessar dados como número do processo, autor, réu, tribunal de origem, data do início, data da movimentação e a descrição dela.

Foram escritos testes em Jest com objetivo de garantir o funcionamento das chamadas http e conexão com o banco de dados.

É possível executar e testar o código em qualquer máquina em razão do uso do docker.

### Para rodar o código
```bash
make run
```



### Para rodar os testes 
```bash
make test
```

![siteDeConsultaProcessual](https://user-images.githubusercontent.com/75230945/231012078-1dd95ba6-9dc5-4aa8-b1f4-b0824a2fadd9.gif)
