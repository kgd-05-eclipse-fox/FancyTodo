# FancyTodo Server

**FancyTodo**
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

  * **Code:** 200 <br />
    **Content:** `[
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
        "id": ...,
        "title": ...,
        "description": ...,
        "status": ...,
        "due_date": ...,
        "createdAt": ...,
        "updatedAt": ...
    }
  ]`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error: 'Internal Server Error' }`

* **Notes:**

  <_This path showing all list of todos and sort by 'due date' order by DESC_> 