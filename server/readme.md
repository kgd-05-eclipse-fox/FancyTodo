# FancyTodo Server

**Show All Todos**
----

* **URL**

  <_/todos_>

* **Method:**

  `GET`
  
*  **URL Params**

   <_None_> 

* **Data Params**

  <_None_> 

* **Success Response:**

  * **Code:** 200 **OK**<br />
    **Content:** 
    ```json
    [
    {
        "id": 4, 
        "title": "Kejar deadline",
        "description": "Deadline alert!",
        "status": false,
        "due_date": "2020-10-29T00:00:00.000Z",
        "createdAt": "2020-10-26T20:17:28.026Z",
        "updatedAt": "2020-10-26T20:17:28.026Z"
    },
    {
        "id": "...",
        "title": "...",
        "description": "...",
        "status": "...",
        "due_date": "...",
        "createdAt": "...",
        "updatedAt": "..."
    }
  ]
  ```
 
* **Error Response:**

  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

* **Notes:**

  `This path showing all list of todos and sort by 'due date' order by DESC`

**Add a Todo**
----

* **URL**

  <_/todos_>

* **Method:**

  `POST`
  
*  **URL Params**

   <_None_> 

* **Data Params**

  <_None_> 


* **Request Body**
  * **Content:**
    ```json
    {
        "title": "Shopping",
        "description": "Shopping with my favorite person ever!",
        "due_date": "2020-11-10"
    }
    ```

* **Success Response:**

  * **Code:** 201 **Created** <br />
    **Content:** 
    ```json
    {
        "id": 7,
        "title": "Shopping",
        "description": "Shopping with my favorite person ever!",
        "due_date": "2020-11-10T00:00:00.000Z",
        "updatedAt": "2020-10-26T20:55:06.240Z",
        "createdAt": "2020-10-26T20:55:06.240Z",
        "status": false
    }
    ```
 
* **Error Response:**
    `If error from the server`
  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

    `If error from the validate data input`
  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "error": "Please enter title,Date cannot be blank,Date must be greater than present"
    }
    ```

* **Notes:**

  `This path to add a Todo and can do some validates`

  
**Show One Todo**
----

* **URL**

  <_/todos/:id_>

* **Method:**

  `GET`
  
* **URL Params**
  **Required:**

  `id=[integer]`

* **Data Params**

  <_None_> 

* **Request Body**
  <_None_> 


* **Success Response:**

  * **Code:** 200 **OK**<br />
    **Content:** 
    ```json
    {
        "id": 6,
        "title": "Me time",
        "description": "Gaming time!",
        "status": false,
        "due_date": "2020-10-27T00:00:00.000Z",
        "createdAt": "2020-10-26T20:31:59.842Z",
        "updatedAt": "2020-10-26T20:31:59.842Z"
    }
    ```
 
* **Error Response:**
    `If error from the server`
  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

    `If error data not found`
  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "error": "Todo not found"
    }
    ```

* **Notes:**

  `This path to find one Todo by it's id`


**Update Todo**
----

* **URL**

  <_/todos/:id_>

* **Method:**

  `PUT`
  
* **URL Params**
  **Required:**

  `id=[integer]`

* **Data Params**

  <_None_> 

* **Request Body**
  * **Content:**
    ```json
    {
        "title": "Dinner with fam.",
        "description": "Important dinner!",
        "due_date": "2020-10-29"
    }
    ```


* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "title": "Dinner with fam.",
        "description": "Important dinner!",
        "status": false,
        "due_date": "2020-10-29T00:00:00.000Z",
        "createdAt": "2020-10-26T19:46:01.775Z",
        "updatedAt": "2020-10-26T21:01:12.247Z"
    }
    ```
 
* **Error Response:**
    `If error from the server`
  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

    `If error data not found`
  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "error": "Date cannot be blank"
    }
    ```

* **Notes:**

  `This path to update existing Todo.`

**Update Todo Status**
----

* **URL**

  <_/todos/:id_>

* **Method:**

  `PATCH`
  
* **URL Params**
  **Required:**

  `id=[integer]`

* **Data Params**

  <_None_> 

* **Request Body**
  * **Content:**
    ```json
    { "status": true }
    ```


* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "title": "Dinner with fam.",
        "description": "Important dinner!",
        "status": true,
        "due_date": "2020-10-29T00:00:00.000Z",
        "createdAt": "2020-10-26T19:46:01.775Z",
        "updatedAt": "2020-10-26T21:11:33.434Z"
    }
    ```
 
* **Error Response:**
    `If error from the server`
  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

    `If error data not found`
  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "error": "Should be true or false"
    }
    ```

* **Notes:**

  `This path to update Todo Status.`

**Delete a Todo**
----

* **URL**

  <_/todos/:id_>

* **Method:**

  `DELETE`
  
* **URL Params**
  **Required:**

  `id=[integer]`

* **Data Params**

  <_None_> 

* **Request Body**
  * **Content:** `NONE`


* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "todo success to delete"
    }
    ```
 
* **Error Response:**
    `If error from the server`
  * **Code:** 500 **Internal Server Error** <br />
    **Content:** `{ error: 'Internal Server Error' }`

    `If error data not found`
  * **Code:** 404 **Not Found** <br />
    **Content:** 
    ```json
    {
        "error": "todo not found"
    }
    ```

* **Notes:**

  `This path to delete a Todo.`