# FancyTodo

https://gettodo-naim.web.app

<h2>GET TO DO</h2>

<ul>
<br>
<h3><li> GET / todos</h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 200
    <li> Conten:
</ul>

```json
[
    {
        "id": 6,
        "title": "Olahraga",
        "description": "GYM",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T10:49:49.365Z",
        "updatedAt": "2020-10-26T10:49:49.365Z"
    },
    {
        "id": 8,
        "title": "Olahraga",
        "description": "lari pagi",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:00:35.331Z",
        "updatedAt": "2020-10-26T12:00:35.331Z"
    }
]
```

`Error Response:`
<ul>
    <li>Code: 500 
    <li>Conten:
</ul>

````html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Error</title>
</head>

<body>
	<pre>Cannot GET /todo</pre>
</body>

</html>
````
`Notes: Perhatikan URL`

---
<br>
<h2>POST TO DO</h2>

<ul>
<br>
<h3><li> POST / todos</h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 201
    <li> Conten:  { id: 10 }
</ul>

```json
[
    {
        "id": 10,
        "title": "Hiburan",
        "description": "Main Gitar",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "updatedAt": "2020-10-26T14:52:33.938Z",
        "createdAt": "2020-10-26T14:52:33.938Z"
    }
]
```

`Error Response:`
<ul>
    <li>Code: 400 
    <li>Conten:
</ul>

````json
=> Input

[
    {
        "title": "",
        "description": "Main Gitar",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z"
    }
]

------------------------------------------------------

=> Output

[
    "title Tidak boleh kosong"
]
````
`Notes: Tidak boleh kosong`

---
<br>
<h2>GET TO DO BY ID</h2>

<ul>
<br>
<h3><li> GET / todos / :id </h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos/:id
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 200
    <li> Conten:
</ul>

```json

=> Input
            Http://localhost:3000/todos/9

------------------------------------------------------

=> Output

[
    {
        "id": 9,
        "title": "asdasd",
        "description": "adasda",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]
```

`Error Response:`
<ul>
    <li>Code: 404 
    <li>Conten:
</ul>

````json
=> Input
            Http://localhost:3000/todos/20

------------------------------------------------------

=> Output

                        Null

````
`Notes: Id yang di cari tidak ditemukan`

---
<br>
<h2>PUT TO DO</h2>

<ul>
<br>
<h3><li> PUT / todos / :id </h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos/:id
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 200
    <li> Conten:
</ul>

```json

=> Input
            Http://localhost:3000/todos/9

[
    {
        "id": 9,
        "title": "asdasd",
        "description": "adasda",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]

------------------------------------------------------

=> Output

[
    {
        "id": 9,
        "title": "Memancing",
        "description": "Memancing ikan di sungai terdekat",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]
```

`Error Response:`
<ul>
    <li>Code: 400 
    <li>Conten:
</ul>

````json
=> Input
            Http://localhost:3000/todos/9

[
    {
      "title": "",
      "description": "",
      "status": "not done",
      "dueDate": ""
     }
]

------------------------------------------------------

=> Output

[
    "title Tidak boleh kosong",
    "description Tidak boleh kosong",
    "status Tidak boleh kosong",
    "dueDate Tidak boleh kosong"
]

````
`Notes: Tidak boleh dikosongkan`

---
<br>
<h2>PATCH TO DO</h2>

<ul>
<br>
<h3><li> PATCH / todos / :id </h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos/:id
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 200
    <li> Conten:
</ul>

```json

=> Input
            Http://localhost:3000/todos/9

[
    {
        "id": 9,
        "title": "asdasd",
        "description": "adasda",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]

------------------------------------------------------

=> Output

[
    {
        "id": 9,
        "title": "Memancing",
        "description": "Memancing ikan di sungai terdekat",
        "status": "done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]
```

`Error Response:`
<ul>
    <li>Code: 400 
    <li>Conten:
</ul>

````json
=> Input
            Http://localhost:3000/todos/9

[
    {
      "title": "",
      "description": "",
      "status": "done",
      "dueDate": ""
     }
]

------------------------------------------------------

=> Output

[
    "title Tidak boleh kosong",
    "description Tidak boleh kosong",
    "dueDate Tidak boleh kosong"
]

````
`Notes: Tidak boleh dikosongkan`

---
<br>
<h2>DELETE TO DO</h2>

<ul>
<br>
<h3><li> DELETE / todos / :id </h3>
<br>
</ul>

`Content-type:`
```
application/json
```

`URL:`
```
Http://localhost:3000/todos/:id
```

`Data Params:`

````objec
{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
}
````

`Success Response:`
<ul>
    <li>Code: 200
    <li> Conten:
</ul>

```json

=> Input
            Http://localhost:3000/todos/11

[
    {
        "id": 9,
        "title": "asdasd",
        "description": "adasda",
        "status": "not done",
        "dueDate": "2020-10-26T10:49:49.365Z",
        "createdAt": "2020-10-26T12:13:21.687Z",
        "updatedAt": "2020-10-26T13:40:53.191Z"
    }
]

------------------------------------------------------

=> Output

{
    "massage": "todo succes to delete"
}
```

`Error Response:`
<ul>
    <li>Code: 400 
    <li>Conten:
</ul>

````json
=> Input
            Http://localhost:3000/todos/20

------------------------------------------------------

=> Output

{
    "massage": "Id Tidak ditemukan"
}
````
`Notes: Id Tidak Ditemukan`

---