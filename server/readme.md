# FancyTodo Server


**Create Todo**
----
  Insert new data Todo.

* **URL**

  - /todos

* **Method:**

   - `POST`

*   **Required:**
 
      - input type `title` is string
      - input type `description` is string
      - input type `status` is string
      - input type `due_data` is date

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 3, title : "Third Learn REST API", description : "Learn how to create RESTful API with Express and Sequelize, status : "not completed", due_date : "Today - Oct 28" 
     }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Some field is required" }`


**Read Todo**
----
  Returns json data about list Todo

* **URL**

  - /todos

* **Method:**
  
  - `GET` 

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ```[{ id : 1, title : "Make Documentation REST API", description : "Learn how to create documentation RESTful API with Express and Sequelize, status : "not completed", due_date : "Today - Oct 28" 
     }, 
     { id : "...", title : "...", description : "...", status : "...", due_date : "..." 
     }]```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Ups! List Todos Not Found" }`




**Details**
----
  Returns json data about a single Todo

* **URL**

  - /todos/:id

* **Method:**

  - `GET`
  
*  **URL Params**

   **Required:**
 
   - `id=[integer]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "Learn REST API", due_date : "Today - Oct 28", priority : "Medium", status : "On track", Section : "Todo" Description : "Add more detail to this task..." }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Ups! Todo doesn't exist" }`



**Update Todo**
----
  Returns json data about a single Todo

* **URL**

  - /todos/:id

* **Method:**

  - `PUT`
  
*  **URL Params**

   **Required:**
 
   - input type `title` is string
   - input type `description` is string
   - input type `status` is string
   - input type `due_data` is date

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "Learn REST API", due_date : "Today - Oct 28", priority : "Medium", status : "On track", Section : "Todo" Description : "Add more detail to this task..." }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Ups! Todo doesn't exist" }`




















