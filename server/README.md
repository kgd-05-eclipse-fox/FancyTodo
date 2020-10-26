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
