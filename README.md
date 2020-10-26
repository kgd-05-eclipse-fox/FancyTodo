# FancyTodo

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
    ```javascript
    [
        { 
            id : 12,
            title: "Kerjain Todo",
            description: "Mengerjakan Todo di hari pertama",
            due_date: "2020-10-26",
            isFinished: false
        },
        {
            id: ...,
            title: ...,
            description: ...,
            due_date: ...,
            isFinished: ...
        }
    ]
 
* **Error Response:**

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** `{ error : "Internal Server Error" }`


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

  * **Content:**
    ```javascript
    {
        id: 12
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```javascript
    { 
        id : 12,
        title: "Kerjain Todo",
        description: "Mengerjakan Todo di hari pertama",
        due_date: "2020-10-26",
        isFinished: false
    }
    ```
 
* **Error Response:**

  `If todo doesn't exist`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** `{ error : "Todo doesn't exist" }`


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
    ```javascript
    {
        id : 13,
        title: "Makan Siang",
        description: "Makan siang setelah mengerjakan Todo",
        due_date: "2020-10-27",
        isFinished: false
    }
    ```

* **Success Response:**

  * **Code:** 201 **CREATED** <br />
    **Content:** 
    ```javascript
    { 
        id : 13,
        title: "Makan Siang",
        description: "Makan siang setelah mengerjakan Todo",
        due_date: "2020-10-27",
        isFinished: false
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** `{ error : "Cannot Create new Todo" }`

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** `{ error : "Internal Server Error" }`


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
    ```javascript
    {
        id : 13,
        title: "Makan Siang Setelah Mengerjakan Todo",
        description: "Makan siang setelah mengerjakan Todo",
        due_date: "2020-10-27",
        isFinished: false
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```javascript
    { 
        id : 13,
        title: "Makan Siang Setelah Mengerjakan Todo",
        description: "Makan siang setelah mengerjakan Todo",
        due_date: "2020-10-27",
        isFinished: false
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** `{ error : "Cannot Update Todo" }`

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** `{ error : "Todo Not Found" }`

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** `{ error : "Internal Server Error" }`


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
    ```javascript
    {
        isFinished: true
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```javascript
    { 
        id : 13,
        title: "Makan Siang Setelah Mengerjakan Todo",
        description: "Makan siang setelah mengerjakan Todo",
        due_date: "2020-10-27",
        isFinished: true
    }
    ```
 
* **Error Response:**

  `If validation error`

  * **Code:** 400 **BAD REQUEST** <br />
    **Content:** `{ error : "Cannot Update Todo Status" }`

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** `{ error : "Todo Not Found" }`

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** `{ error : "Internal Server Error" }`


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

   None

* **Request Body:**

  * **Content:**
    ```javascript
    {
        id : 13
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```javascript
    { 
        message: "todo success to delete"
    }
    ```
 
* **Error Response:**

  `If Todo Not Found`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:** `{ error : "Todo Not Found" }`

  `If error from server`

  * **Code:** 500 **INTERNAL SERVER ERROR** <br />
    **Content:** `{ error : "Internal Server Error" }`