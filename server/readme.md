# FancyTodo Server

**FindTodos**
----
    return all available Todos

* **URL**

  /todos

* **Method:**
  
    `GET`
  

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "title": "lari sore",
        "description": "lari seputar komplek",
        "status": "holding",
        "due_date": "2020-12-02T00:00:00.000Z",
        "createdAt": "2020-10-26T14:44:30.245Z",
        "updatedAt": "2020-10-26T14:44:30.245Z"
    },
    {
        "id": 1,
        "title": "lari sore",
        "description": "lari seputar komplek",
        "status": "holding",
        "due_date": "2020-12-02T00:00:00.000Z",
        "createdAt": "2020-10-26T14:44:30.245Z",
        "updatedAt": "2020-10-26T15:41:21.827Z"
    }
]`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`


**UpdateTodo**
----
    edit a Todo's File

* **URL**

  /todos/:id

* **Method:**
  
    `PUT`
* **URL Params**
    **Required:**
    `id=[integer]`
  
* **Data Params**
    **Required:**
    `[title = [string]]`
    `[description = [string]]`
    `[status = [string]]`
    ´[]
  

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[
  {
    "id": 1,
    "title": "lari malem",
    "description": "lari seputar kampung",
    "status": "holding",
    "due_date": "2020-12-02T00:00:00.000Z",
    "createdAt": "2020-10-26T14:44:30.245Z",
    "updatedAt": "2020-10-26T16:13:10.877Z"
}
]`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

