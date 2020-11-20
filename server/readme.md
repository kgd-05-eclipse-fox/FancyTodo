**Show All Todo**
----
  ALL TODO

* **URL**

/todos

* **Method:**

  `GET` 
  
*  **URL Params**

* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** [
    {
        "id": 1,
        "title": "nyuci motor",
        "description": "sebelum jam 3 sore",
        "status": "holding",
        "due_date": "2020-12-10T00:00:00.000Z",
        "createdAt": "2020-10-27T15:06:01.200Z",
        "updatedAt": "2020-10-27T21:52:32.115Z",
        "UserId": 1
    }
]
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`



**Show Add Todo**
----
 ADD TODO

* **URL**

/todos

* **Method:**
  
  `POST` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "title": "main bola",
    "description": "jangan terlalu malam",
    "status": "holding",
    "due_date": "2020-12-10T00:00:00.000Z",
    "createdAt": "2020-10-27T22:09:28.759Z",
    "updatedAt": "2020-10-27T22:10:16.855Z",
    "UserId": 1
}`
 
* **Error Response:**

  * **Code:** 400 Validation <br />
    **Content:** `{ error : "Validation Error" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`


**Update Todo**
----
 UPDATE TODO

* **URL**

/todos/:id

* **Method:**
  
  `PUT` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "title": "main basket",
    "description": "maksimal jam 10",
    "status": "holding",
    "due_date": "2020-12-10T00:00:00.000Z",
    "createdAt": "2020-10-27T22:09:28.759Z",
    "updatedAt": "2020-10-27T22:13:34.575Z",
    "UserId": 1
}`
 
* **Error Response:**

  * **Code:** 400 Validation <br />
    **Content:** `{ error : "Validation Error" }`

  OR

  * **Code:** 404 not found <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`

    
**Delete Todo**

 DELETE TODO

* **URL**

/todos/:id

* **Method:**
  
  `DELETE` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
   message : deleted success
}`
 
* **Error Response:**

  * **Code:** 404 not found <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`


**Patch Todo**

 Patch/edit TODO

* **URL**

/todos/:id

* **Method:**
  
  `PATCH` 
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
   deleted success
}`
 
* **Error Response:**

  * **Code:** 404 not found <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`


**Register**
----
 register

* **URL**

/register

* **Method:**
  
  `POST` 
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 1,
    "email": "tescuy@yahoo.com"
}`
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`

    **Register**
----
 login

* **URL**

/login

* **Method:**
  
  `POST` 
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNjdXlAeWFob28uY29tIiwiaWF0IjoxNjAzODM4MDU3fQ.Aa5zsGS0zKCqxT44XSKLzTXS8fE1JldUEFCLitInEA4"
}`
 
* **Error Response:**

 * **Code:** 401 not found <br />
    **Content:** `"message": "wrong password/email"`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "internal server" }`