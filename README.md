# API Agenda

Este projeto é uma API REST desenvolvida para gerenciar uma agenda de contatos.

>  É a minha primeira API desenvolvida de forma independente, com a ajuda apenas de documentação.

__exemplo:__  
A requisição:

 ```GET https://api-agenda-nacz.onrender.com/contacts```
 
 retorna um array de JSON com todos os contatos armazenados no Banco de Dados:
 ```
[
  {  "id": "13fe4421-7a96-4959-a70a-681cdb1575a8",  "name": "Bill Gates",  "email": "billgates@gmail.com",  "phone": "11988009032"  },
  {  "id": "4cfa7618-51b2-496f-980d-b5d0da63e142",  "name": "Mark Zuck Atualizado",  "email": "mark.zuck2@gmail.com",  "phone": "1140028922"  }  
 ]
```
## Links Úteis

- [Deploy da  API](https://api-agenda-nacz.onrender.com)
- [Documentação da API](https://documenter.getpostman.com/view/34346396/2sA3Bn5Br8 )

## Recursos

A API permite realizar as operações CRUD (Criar, Ler, Atualizar e Deletar) em uma agenda de contatos. Além disso, alguns campos são validados para garantir a consistência dos dados.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript no lado do servidor.
- **Fastify**: Framework web rápido e de baixa sobrecarga para Node.js.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional objeto.

## Como Usar

Para usar a API, você pode fazer requisições HTTP para o endpoint de deploy. A documentação fornece detalhes sobre os endpoints disponíveis e os dados necessários para cada requisição.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.


