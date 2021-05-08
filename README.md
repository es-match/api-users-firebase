# api-users-firebase


API Criada para uso dentro do aplicativo Easy Sport Match, desenvolvido durante especializaçao em Engenharia de Software EES UFSCAR


Requests disponíveis



# GET /users/googleToken/:googleToken

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| googleToken            | string        | sim          |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| id     | string        |
| userEmail     | string        |
| userName     | string        |
| role     | string        |
| imageUrl     | string        |
| createDate     | string        |

---

# GET /users/emailToken/:emailToken

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| emailToken      | string              | sim        |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| id     | string        |
| userEmail     | string        |
| userName     | string        |
| role     | string        |
| imageUrl     | string        |
| createDate     | string        |

---


# GET /users/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id      | string              | sim        |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| id     | string        |
| userEmail     | string        |
| userName     | string        |
| role     | string        |
| imageUrl     | string        |
| createDate     | string        |

---

# GET /users/

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|       |               |         |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| listUsers     | List<Map<string,string>>        |

---

# POST /events/

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|  googleToken     |  string              | sim         |
|  emailToken     |  string              | sim         |
|  userEmail     |  string              | sim         |
|  userName     |  string              | sim         |
|  role     |  string              | sim         |
|  imageUrl     |  string              | sim         |
|  createDate     |  string              | sim         |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| response     | string        |

---


# DELETE /users/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id      | string              | sim   |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
|  response     | string |

---

# PATCH /users/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id      | string              | sim   |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
|  response     | string |

---

# PATCH /events/:id

| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|  googleToken     |  string              | sim         |
|  emailToken     |  string              | sim         |
|  userEmail     |  string              | sim         |
|  userName     |  string              | sim         |
|  role     |  string              | sim         |
|  imageUrl     |  string              | sim         |
|  createDate     |  string              | sim         |

## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
|  response     | string               |        

