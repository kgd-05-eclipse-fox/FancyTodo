# FancyTodo

**Add To Do**
----
  Save new To Do to database and return new To Do as object

* **URL**

  /todos

* **Method:**
  
  `POST`
  
* **Data Params**

    title,
    description,
    status,
    due_date

* **Success Response:**  

  * **Code:** 201 <br />
    **Content:** 
{
    "id": 6,
    "title": "Live Code3",
    "description": "Third live code",
    "status": "On Progress",
    "due_date": "2020-10-30T00:00:00.000Z",
    "updatedAt": "2020-10-26T10:44:39.247Z",
    "createdAt": "2020-10-26T10:44:39.247Z"
}
 
* **Error Response:**

  * **Code:** 400 UNAUTHORIZED <br />
    **Content:** 
  {
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation isAfter on due_date failed",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-10-10T00:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Live Code3",
                "description": "Third live code",
                "status": "On Progress",
                "due_date": "2020-10-10T00:00:00.000Z",
                "updatedAt": "2020-10-26T10:42:14.014Z",
                "createdAt": "2020-10-26T10:42:14.014Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "Mon Oct 26 2020 17:41:00 GMT+0700 (Western Indonesia Time)"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "Mon Oct 26 2020 17:41:00 GMT+0700 (Western Indonesia Time)"
                ]
            }
        }
    ]
}

  OR

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Internal Server Error" }`


**Show To Do List**
----
  Show all to do list in database

* **URL**

  /todos

* **Method:**
  
  `GET`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    [
      {
          "id": 1,
          "title": "Coding",
          "description": "Coding Fancy TO DO",
          "status": "On Progress",
          "due_date": "2020-10-27T00:00:00.000Z",
          "createdAt": "2020-10-26T07:35:20.797Z",
          "updatedAt": "2020-10-26T07:35:20.797Z"
      },
      {
          "id": 2,
          "title": "Lecture",
          "description": "Lecture REST API",
          "status": "On Progress",
          "due_date": "2020-10-26T00:00:00.000Z",
          "createdAt": "2020-10-26T07:47:36.029Z",
          "updatedAt": "2020-10-26T07:47:36.029Z"
      },
      {
          "id": 3,
          "title": "Live Code",
          "description": "First live code",
          "status": "On Progress",
          "due_date": "2020-11-03T00:00:00.000Z",
          "createdAt": "2020-10-26T10:14:54.208Z",
          "updatedAt": "2020-10-26T10:14:54.208Z"
      }
    ]
 
* **Error Response:**

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Internal Server Error" }`



**Show Todo By Id**
----
  Show Todo By Id

* **URL**

  /todos/:id

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
      "id": 1,
      "title": "Coding",
      "description": "Coding Fancy TO DO",
      "status": "On Progress",
      "due_date": "2020-10-27T00:00:00.000Z",
      "createdAt": "2020-10-26T07:35:20.797Z",
      "updatedAt": "2020-10-26T07:35:20.797Z"
    }
 
* **Error Response:**

  * **Code:** 404 NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`




**Update To do By Id**
----
  Update Todo By Id and show the new Todo

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    title,
    description,
    status,
    due_date

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    {
      "id": 2,
      "title": "lecture",
      "description": "Lecture REST API",
      "status": "On Progress Lagi",
      "due_date": "2020-10-27T00:00:00.000Z",
      "createdAt": "2020-10-26T07:47:36.029Z",
      "updatedAt": "2020-10-26T12:28:39.080Z"
    }
* **Error Response:**

  * **Code:** 400 UNAUTHORIZED <br />
    **Content:**
    {
      {
        "name": "SequelizeValidationError",
        "errors": [
            {
                "message": "Validation isAfter on due_date failed",
                "type": "Validation error",
                "path": "due_date",
                "value": "2020-10-10T00:00:00.000Z",
                "origin": "FUNCTION",
                "instance": {
                    "id": null,
                    "title": "Live Code3",
                    "description": "Third live code",
                    "status": "On Progress",
                    "due_date": "2020-10-10T00:00:00.000Z",
                    "updatedAt": "2020-10-26T10:42:14.014Z",
                    "createdAt": "2020-10-26T10:42:14.014Z"
                },
                "validatorKey": "isAfter",
                "validatorName": "isAfter",
                "validatorArgs": [
                    "Mon Oct 26 2020 17:41:00 GMT+0700 (Western Indonesia Time)"
                ],
                "original": {
                    "validatorName": "isAfter",
                    "validatorArgs": [
                        "Mon Oct 26 2020 17:41:00 GMT+0700 (Western Indonesia Time)"
                    ]
                }
            }
        ]
      }
    }

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Data not found" }`

  OR

  * **Code:** 500 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Internal Server Error" }`