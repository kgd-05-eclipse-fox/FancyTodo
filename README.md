# FancyTodo

> Demo https://fancy-todo-akbarhabiby.web.app/

**Show All Todos**
----
  Returns json data from all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Request Body:**

  None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:**
    ```json
    [
        { 
            "id": 12,
            "title": "Kerjain Todo",
            "description": "Mengerjakan Todo di hari pertama",
            "due_date": "2020-10-26",
            "status": false,
            "updatedAt": "2020-10-26T07:45:55.351Z",
            "createdAt": "2020-10-26T07:45:55.351Z"
        },
        {
            "id": "...",
            "title": "...",
            "description": "...",
            "due_date": "...",
            "status": "...",
            "updatedAt": "...",
            "createdAt": "..."
        }
    ]
 
* **Error Response:**

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** 
    ```json
    {
       "error": "Internal Server Error" 
    }
    ```


**Show One Todo**
----
  Returns json data from one selected todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   None

* **Request Body:**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    { 
        "id": 12,
        "title": "Kerjain Todo",
        "description": "Mengerjakan Todo di hari pertama",
        "due_date": "2020-10-26",
        "status": false,
        "updatedAt": "2020-10-26T07:45:55.351Z",
        "createdAt": "2020-10-26T07:45:55.351Z"
    }
    ```
 
* **Error Response:**

  `If todo doesn't exist`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** 
    ```json
    { 
      "error": "Todo doesn't exist" 
    }
    ```


**Create Todo**
----
  Returns json data after creating new Todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Request Body:**

  * **Content:**
    ```json
    {
        "title": "Makan Siang",
        "description": "Makan siang setelah mengerjakan Todo",
        "due_date": "2020-10-27",
        "status": false
    }
    ```

* **Success Response:**

  * **Code:** 201 **CREATED** <br />
    **Content:** 
    ```json
    { 
        "id": 13,
        "title": "Makan Siang",
        "description": "Makan siang setelah mengerjakan Todo",
        "due_date": "2020-10-29T00:00:00.000Z",
        "status": false,
        "updatedAt": "2020-10-26T07:45:55.351Z",
        "createdAt": "2020-10-26T07:45:55.351Z"
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** 
    ```json
    {
       "error": "Cannot Create or Update Todo" 
    }
    ```

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** 
    ```json
    {
       "error": "Internal Server Error" 
    }
    ```


**Update Todo**
----
  Returns json data after updating a Todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   None

* **Request Body:**

  * **Content:**
    ```json
    {
        "title": "Makan Siang Setelah Mengerjakan Todo",
        "description": "Makan siang setelah mengerjakan Todo",
        "due_date": "2020-10-27",
        "status": false
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    { 
        "id": 13,
        "title": "Makan Siang Setelah Mengerjakan Todo",
        "description": "Makan siang setelah mengerjakan Todo",
        "due_date": "2020-10-27",
        "status": false,
        "updatedAt": "2020-10-26T07:45:55.351Z",
        "createdAt": "2020-10-26T07:45:55.351Z"
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** 
    ```json
    {
       "error" : "Cannot Create or Update Todo" 
    }
    ```

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** 
    ```json
    {
       "error" : "Todo Not Found" 
    }
    ```

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** 
    ```json
    {
       "error" : "Internal Server Error" 
    }
    ```


**Update Todo Status**
----
  Returns json data after updating a Todo status.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   None

* **Request Body:**

  * **Content:**
    ```json
    {
        "status": true
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    { 
        "id": 13,
        "title": "Makan Siang Setelah Mengerjakan Todo",
        "description": "Makan siang setelah mengerjakan Todo",
        "due_date": "2020-10-27",
        "status": true,
        "updatedAt": "2020-10-26T07:45:55.351Z",
        "createdAt": "2020-10-26T07:45:55.351Z"
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** 
    ```json
    {
        "error" : "Cannot Create or Update Todo"
    }
    ```

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** 
    ```json
    {
        "error" : "Todo Not Found"
    }
    ```

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```


**Delete Todo**
----
  Return a message after success deleting Todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   id

* **Request Body:**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    { 
        "message": "todo success to delete"
    }
    ```
 
* **Error Response:**

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:**
    ```json
    {
        "error": "Todo Not Found"
    }
    ```

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```