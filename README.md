# Build
The latest build can be tested [here](https://bugbus.herokuapp.com/)

# REST
## 1. Get TODO items.

### Request

URI               | Method      | Type
----              | ----        | -----
/api/item | GET 		  | application/json

### Response 200

    [
      {
        "id": 1,
        "title": "Create a to-do list1",
        "isDone": true
      },
      {
        "id": 2,
        "title": "Take down Christmas tree",
        "isDone": false
      },
      {
        "id": 3,
        "title": "Learn Ember.js",
        "isDone": false
      },
      {
        "id": 4,
        "title": "Binge watch every episode of MacGyver",
        "isDone": false
      },
      {
        "id": 5,
        "title": "Alphabetize everything in the fridge",
        "isDone": false
      },
      {
        "id": 6,
        "title": "Do 10 pull-ups without dropping",
        "isDone": false
      }
    ]

### Response 500
    {
        "name": "ConnectionError",
        "message": "Login failed for user 'barada'.",
        "code": "ELOGIN"
    }

## 2. Create an item for TODO list.

### Request

URI               | Method      | Type
----              | ----        | -----
/api/item | POST 		  | application/json

    {
    	"title": "The new goal for this week"
    }

### Response 201
    {
        "id":"58",
        "title":"The new goal for this week",
        "isDone":false
    }

### Response 500
    {
        "name": "ConnectionError",
        "message": "Login failed for user 'barada'.",
        "code": "ELOGIN"
    }

## 3. Update existing item in TODO list.

### Request

URI               | Method      | Type
----              | ----        | -----
/api/item/{itemID} | PUT 		  | application/json

    {
    	"title": "The new goal for this week",
    	"IsDone": true
    }

### Response 204

### Response 500
    {
        "name": "ConnectionError",
        "message": "Login failed for user 'barada'.",
        "code": "ELOGIN"
    }


## 4. Delete existing item from TODO list.

### Request

URI               | Method      | Type
----              | ----        | -----
/api/item/{itemID} | DELETE 		  | application/json

### Response 204

### Response 500
    {
        "name": "ConnectionError",
        "message": "Login failed for user 'barada'.",
        "code": "ELOGIN"
    }

