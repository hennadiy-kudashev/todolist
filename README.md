# REST
## 1. Get TODO list

### Request

URI               | Method      | Type
----              | ----        | -----
/rest/todo | GET 		  | application/json

### Response

	{
	   "list":[
		  {
			 "id":"name",
			 "name":"Name",
			 "status":"string"
		  },
		  ...
	   ]
   }
