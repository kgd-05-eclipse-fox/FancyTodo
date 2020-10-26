# FancyTodo Server

**POST TO DO**
----
* **URL**

  /todos

* **Method:**
  
  <_The request type_>

  `POST` 

* **Data Params**
  **Required:**
 
   `title=[string]`
   `description=[string]`
   `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json 
    {
        "id": 1,
        "title": "Go to circuit",
        "description": "Riding",
        "status": "not finished",
        "due_date": "2020-10-29T00:00:00.000Z",
        "createdAt": "2020-10-26T10:43:44.518Z",
        "updatedAt": "2020-10-26T10:43:44.518Z"
    }    
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
    "error": {
        "message": "must be greater than today",
        "type": "Validation error",
        "path": "due_date",
        "value": "2020-10-15T00:00:00.000Z",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "Go to circuit",
            "description": "Riding",
            "due_date": "2020-10-15T00:00:00.000Z",
            "updatedAt": "2020-10-26T10:40:01.023Z",
            "createdAt": "2020-10-26T10:40:01.023Z"
        },
        "validatorKey": "isAfter",
        "validatorName": "isAfter",
        "validatorArgs": [
            "2020-10-26"
        ],
        "original": {
            "validatorName": "isAfter",
            "validatorArgs": [
                "2020-10-26"
            ]
        }
      }
    }


**Find All Todos**
----
  return all available todos on server

* **URL**

  /todos

* **Method:**
  
  <_The request type_>

  `GET` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
          "id": 1,
          "title": "Go to circuit",
          "description": "Riding",
          "status": "not finished",
          "due_date": "2020-10-29T00:00:00.000Z",
          "createdAt": "2020-10-26T10:43:44.518Z",
          "updatedAt": "2020-10-26T10:43:44.518Z"
      },
      {
          "id": 2,
          "title": "Go to gym",
          "description": "Benchpress 10 times",
          "status": "not finished",
          "due_date": "2020-10-28T00:00:00.000Z",
          "createdAt": "2020-10-26T10:44:15.903Z",
          "updatedAt": "2020-10-26T10:44:15.903Z"
      },
      {
          "id": 3,
          "title": "Go to market",
          "description": "Buy fish and vegetables",
          "status": "not finished",
          "due_date": "2020-10-27T00:00:00.000Z",
          "createdAt": "2020-10-26T10:47:19.806Z",
          "updatedAt": "2020-10-26T10:47:19.806Z"
      }
    ]
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{error: Internal server errors}`

**Update Todos**
----
  return the newest data that just been updated

* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `PUT` 
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
 
   `title=[string]`
   `description=[string]`
   `status=[string]`
   `due_date=[date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "title": "Go to mall",
    "description": "Shopping",
    "status": "not finished",
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T10:43:44.518Z",
    "updatedAt": "2020-10-26T10:58:50.581Z"
  }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{error: Internal server errors}`

**Patch Update Todos**
----
  return the newest data that just been updated

* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `PATCH` 
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
 
   `status=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 2,
    "title": "Go to gym",
    "description": "Benchpress 10 times",
    "status": "finished",
    "due_date": "2020-10-28T00:00:00.000Z",
    "createdAt": "2020-10-26T10:44:15.903Z",
    "updatedAt": "2020-10-26T11:11:16.250Z"
  }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `<!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="utf-8">
          <title>Error</title>
        </head>

        <body>
          <pre>Cannot PATCH /todos/2</pre>
        </body>

        </html>`
  **Code:** 500 INTERNAL SERVER ERRORS <br />
  **Content:** `{error: Internal server errors}`
        

**Delete By Id**
----
  return data which just has been deleted

* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `DELETE` 
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "message: todo success to delete"
 
* **Error Response:**

  **Code:** 404 NOT FOUND <br />
  **Content:** `<!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="utf-8">
        <title>Error</title>
      </head>

      <body>
        <pre>Cannot DELETE /todos/3</pre>
      </body>

      </html>`

  **Code:** 500 INTERNAL SERVER ERRORS <br />
  **Content:** `{error: Internal server errors}`




