# FancyTodo

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
    **Content:** `[
        {
            "id": 2,
            "title": "Go swimming",
            "description": "3 times repetition",
            "status": "not finished",
            "due_date": "2020-10-26T07:30:06.179Z",
            "createdAt": "2020-10-26T07:30:06.179Z",
            "updatedAt": "2020-10-26T07:30:06.179Z"
        },
        {
            "id": 1,
            "title": "Go to gym",
            "description": "Benchpress 10 times",
            "status": "not finished",
            "due_date": "2020-10-26T07:30:06.179Z",
            "createdAt": "2020-10-26T07:30:06.179Z",
            "updatedAt": "2020-10-26T07:54:49.704Z"
        }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Currently unable to handle this request`

**Update Todos**
----
  return the newest data is just been updated

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
 
   `title=[string]`
   `description=[string]`
   `status=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "play basketball",
    "description": "90 minutes",
    "status": "not finished",
    "due_date": "2020-10-26T07:30:06.179Z",
    "createdAt": "2020-10-26T07:30:06.179Z",
    "updatedAt": "2020-10-26T09:59:47.603Z"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Currently unable to handle this request`



