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

  `headers = [string]`

  ```json
  body {
   "title": "[string]",
   "description": "[string]",
   "due_date": "[date]"
    }
  

  
  

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

    { "message": "must be greater than today" }


**Find All Todos**
----
  return all available todos on server

* **URL**

  /todos

* **Method:**
  
  <_The request type_>

  `GET` 

* **Data Params**
  **Required:**
  
  `headers = [string]`


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
   ```json
   headers {
     "token": "string"
   }
`
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
   ```json
   headers : {
     "token" : "string"
   } 
`
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

  ```json
  headers: {
    "token" : "string"
  }
  

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

**Find All Todos**
----
  return weathers data from 3rd party API

* **URL**

  /weathers/location

* **Method:**
  
  <_The request type_>

  `GET` 

* **Data Params**
  **Required:**
  
  `headers = [string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "coord": {
        "lon": 106.99,
        "lat": -6.23
    },
    "weather": [
        {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 304.2,
        "feels_like": 306.76,
        "temp_min": 304.15,
        "temp_max": 304.26,
        "pressure": 1011,
        "humidity": 66
    },
    "visibility": 9000,
    "wind": {
        "speed": 4.6,
        "deg": 240
    },
    "clouds": {
        "all": 40
    },
    "dt": 1604202923,
    "sys": {
        "type": 1,
        "id": 9384,
        "country": "ID",
        "sunrise": 1604183139,
        "sunset": 1604227528
    },
    "timezone": 25200,
    "id": 1649378,
    "name": "Bekasi",
    "cod": 200
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{error: Internal server errors}`




