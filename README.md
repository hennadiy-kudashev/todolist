# REST
## 1. Get TODO list

### Request

URI               | Method      | Type
----              | ----        | -----
/api/todo | GET 		  | application/json

### Response

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
