# FancyTodo Server


**Create Todo**
----
  Insert new Todo

* **URL**

  - /todos

* **Method:**

   - `POST`

*   **Required Data Params:**
 
      - input type `title` is string
      - input type `description` is string
      - input type `status` is string
      - input type `due_date` is date

   * **Example:**</br>
      ```
      {
         "title": "Learn REST API",
         "description": "Testing Server with postman",
         "due_date": "2020-10-27"
      }
      ``` 

* **Success Response:**

  * **Code:** 201 CREATED <br/>

   ```
   {
      "id": 15,
      "title": "Learn REST API",
      "description": "Testing Server with postman",
      "due_date": "2020-10-27T00:00:00.000Z",
      "updatedAt": "2020-10-26T17:47:34.399Z",
      "createdAt": "2020-10-26T17:47:34.399Z",
      "status": "not complete"
   }
   ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `{ error }`

   OR

  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{ error }`


**Read Todo**
----
  Select All Todo

* **URL**

  - /todos

* **Method:**
  
  - `GET` 

* **Success Response:**
* **Code:** 200 OK<br />
    ```
    [
       {
         "id": 15,
         "title": "Learn REST API",
         "description": "Testing Server with postman",
         "status": "not complete",
         "due_date": "2020-10-27T00:00:00.000Z",
         "createdAt": "2020-10-26T17:47:34.399Z",
         "updatedAt": "2020-10-26T17:47:34.399Z"
       }, 
       {
         ...
       },
       ...
    ]
     ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error }`


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
    ```
    {
      "id": 15,
      "title": "Learn REST API",
      "description": "Testing Server with postman",
      "status": "not complete",
      "due_date": "2020-10-27T00:00:00.000Z",
      "createdAt": "2020-10-26T17:47:34.399Z",
      "updatedAt": "2020-10-26T17:47:34.399Z"
   }
   ```
 
* **Error Response:**

* **Code:** 404 NOT FOUND <br />
    ```
    {id with 5 not found}
    ```

    OR

* **Code:** 500 INTERNAL SERVER ERROR <br />
    ```
    {error}
    ```




**Update Todo**
----
  Returns json data with status complete

* **URL**

  - /todos/:id

* **Method:**

  - `PUT`
  
*  **URL Params**

   **Required Data Params:**
 
     id=[integer]

 * **Example:**</br>
 
   ```
   {
	  "title": "check one two three",
	  "description": "cek 123",
	  "due_date": "2021-05-16"
   }
   ```

* **Success Response:**

* **Code:** 200 OK <br />
    ```
    {
      "id": 10,
      "title": "check one two three",
      "description": "cek 123",
      "status": "not complete",
      "due_date": "2021-05-16T00:00:00.000Z",
      "createdAt": "2020-10-26T13:43:49.436Z",
      "updatedAt": "2020-10-26T18:09:44.743Z"
    }
    ```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />
    ```
      {
         "message": "todo with id 18 is not found"
      }
    ```



**Updated Todo**
----
  Returns json data with status complete

* **URL**

  - /todos/:id

* **Method:**

  - `PATCH`
  
*  **URL Params**

   **Required Data Params:**
 
     id=[integer]

   **Required Data Params:**
 
   - input type `title` is string
   - input type `description` is string
   - input type `status` is string
   - input type `due_date` is date

* **Success Response:**
* **Code:** 200 OK <br />
    ```
    {
      "id": 12,
      "title": "check one two three",
      "description": "cek 123",
      "status": "complete",
      "due_date": "2021-05-16T00:00:00.000Z",
      "createdAt": "2020-10-26T13:44:57.550Z",
      "updatedAt": "2020-10-26T18:13:07.922Z"
    }
    ```
 
* **Error Response:**

* **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      "message": "todo with id 30 is not found"
    }
    ```


**Delete Todo**
----
  Return Message

* **URL**

  - /todos/:id

* **Method:**

  - `DELETE`
  
*  **URL Params**

   **Required Data Params:**
 
   id=[integer]

* **Success Response:**

* **Code:** 200 OK <br />
    ```
    {
      "message": "todo success to delete"
    }
    ```
 
* **Error Response:**

* **Code:** 404 NOT FOUND <br />
    ```
    {
      "message": "error not found"
    }
    ```

   OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  ```
  {error}
  ```



















