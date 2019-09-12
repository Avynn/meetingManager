# MeetingManager

Meeting manager is s a tool intended for usage by organizers and activists for an easier meeting experience.  This is an experimental application is not ready for widespread usage, however if you're a developer I highly encourage you to take a look around and play with the currently functional backend!  Below you'll find API and other miscellaneous documentation.

## Instalation

This app is currently not hosted on any package manager, you'll have to clone this repo and run the following command before launching:

```
npm install
```

Currently this is no hosted backend for this app so you'll have to host it locally on your own box.  You can launch the backend with the following command:

```
node controller/controller
```

Finally launch the program:

```
npm run dev
```

NOTE: The current state of this program is not intended for release and is currently under development.

## API

This section is intended to help developers work with the backend API when creating a frontend/webapp.  What follows is a guide
on the API endpoints what headers they expect and the bodies that they return:

### CORS

currently the backend is configured to allow for all (*) CORS requests.  This will obviously change closer to release.

### GET /meetings

Body response example:

the body that is returned depends on the current state of the backend but currently the body returned will be a list
of the JSON representations of each meeting currently written to a JSON file on the server's drive.  This will obviously 
have to change as the number of meetings goes up but for our purposes currently this works just fine.  Below is an example of a body returned:

```
[
    {
        "id": "1dk4ifai8jz0bixur",
        "startTime": "2019-08-06T21:10:59.042Z",
        "endTime": "2019-08-06T21:10:59.042Z",
        "users": [],
        "items": []
    },
    {
        "id": "1dk4ifai8jz0bixus",
        "startTime": "2019-08-06T21:10:59.042Z",
        "endTime": "2019-08-06T21:14:59.042Z",
        "users": [],
        "items": [
            {
                "id": "1dk4ifai8jz0bixwj",
                "name": "example",
                "description": "description",
                "timeAllotted": 60000,
                "votable": true,
                "usersAye": [],
                "usersNay": [
                    {
                        "name": "Avynn"
                    }
                ],
                "usersAbstain": [],
                "startTime": "2019-08-06T21:10:59.042Z",
                "endTime": "2019-08-06T21:11:59.042Z"
            },
            {
                "id": "1dk4ifai8jz0bixwk",
                "name": "example",
                "description": "description",
                "timeAllotted": 60000,
                "votable": true,
                "usersAye": [],
                "usersNay": [],
                "usersAbstain": [
                    {
                        "name": "Avynn"
                    }
                ],
                "startTime": "2019-08-06T21:11:59.042Z",
                "endTime": "2019-08-06T21:12:59.042Z"
            },
            {
                "id": "1dk4ife94jz0c9fj6",
                "name": "From Postman",
                "description": "hello from postman",
                "timeAllotted": 0,
                "votable": false,
                "usersAye": [],
                "usersNay": [],
                "startTime": "2019-08-06T21:12:59.042Z",
                "endTime": "2019-08-06T21:12:59.042Z"
            }
        ]
    }
]
```

meeting format description:

- id: a uniquely generated id string

- startTime: the starting time generated from a Date().toString() method

- endtTime: the ending time generated frome a Date().toString() method

- users: a list of users (to be fleshed out in the future)

- items: a list of items (described below)

### POST /meetings

This endpoint is for creating new meetings and adding them to the list of meetings.  

request body:

Any or none of the aforementioned meeting fields EXCEPT for the ID field.  passing an ID for a meeting that already exists will result in undefined behavior (yes I'm adding this to a todo list).  This is because an ID will be assigned automatically by the backend.

body response example:

The newly created meeting.

```
{
    "id": "1dk4ifbfwk0701nl3",
    "startTime": "2019-09-05T18:03:42.000Z",
    "endTime": "2019-09-05T18:03:42.000Z",
    "users": [],
    "items": []
}
```

### GET /meetings/:meetingID/

This endpoint is for fetching a single meeting by ID.

body response example:

```
{
    "id": "1dk4ifai8jz0bixur",
    "startTime": "2019-08-06T21:10:59.042Z",
    "endTime": "2019-08-06T21:10:59.042Z",
    "users": [],
    "items": []
}
```

### GET /meetings/:meetingID/items/

this endpoint fetches all the agenda items associated with a meeting.

body response:

```
]
    {
        "id": "1dk4ifai8jz0bixwj",
        "name": "example",
        "description": "description",
        "timeAllotted": 60000,
        "votable": true,
        "usersAye": [],
        "usersNay": [
            {
                "name": "Avynn"
            }
        ],
        "usersAbstain": [],
        "startTime": "2019-08-06T21:10:59.042Z",
        "endTime": "2019-08-06T21:11:59.042Z"
    },
    {
        "id": "1dk4ifai8jz0bixwk",
        "name": "example",
        "description": "description",
        "timeAllotted": 60000,
        "votable": true,
        "usersAye": [],
        "usersNay": [],
        "usersAbstain": [
            {
                "name": "Avynn"
            }
        ],
        "startTime": "2019-08-06T21:11:59.042Z",
        "endTime": "2019-08-06T21:12:59.042Z"
    },
    {
        "id": "1dk4ife94jz0c9fj6",
        "name": "From Postman",
        "description": "hello from postman",
        "timeAllotted": 0,
        "votable": false,
        "usersAye": [],
        "usersNay": [],
        "startTime": "2019-08-06T21:12:59.042Z",
        "endTime": "2019-08-06T21:12:59.042Z"
    }
]
```

the item description is as follows:

- id: a uniquely generated ID for the item

- name: the user generated name for the item

- description: the user generated name for the item

- votabe: a boolean describing whether or not this item is votable

- usersAye: a list of users that have voted for this item

- usersNay: a list of users that have voted against this item

- usersAbstain: a list of users that have abstained from voting on this item

startTime: a Date().toString() that is determined by the end time of the previous item.  If this is the first item it inherits the start time of the meeting.

endTime:  a Date().toString() that is determined by the start time + the duration of the agenda item.

### POST /meetings/:meetingID/items/

This endpoint is for adding a new item to a given meeting.

Request body:

Like the meeting post this Post requires that you do not ID feild when initalizing a new

body response: *see GET /meetings/:meetingID/items/*

### PATCH /meetings/:meetingID/items/

This endpoint is for updating agenda items and the data within.

Request body example:
```
{
	"patch" : {
		"id" : "1dk4ife94jz0c8soh",
		"name" : "From Poop",
		"description" : "hello there",
		"timeAlloted" : 180000
	},
	"pos" : 0
}
```

the following are the required fields for this patch:

- patch {id}: the body fields you wish to patch.  must include an ID or an error will be thrown.

- pos: the indicated position -1 if you wish to delet this item.

body response: *see GET /meetings/:meetingID/items*

### GET /meetings/:meetingID/items/:itemID

this endpoint is for fetching a specific item

body response:

```
{
    "id": "1dk4ifai8jz0bixwj",
    "name": "example",
    "description": "description",
    "timeAllotted": 60000,
    "votable": true,
    "usersAye": [],
    "usersNay": [
        {
            "name": "Avynn"
        }
    ],
    "usersAbstain": [],
    "startTime": "2019-08-06T21:10:59.042Z",
    "endTime": "2019-08-06T21:11:59.042Z"
}
```

### PATCH /meetings/:meetingID/items/:itemID

this endpoint is for updating a user's vote

Request body example:

```
{
	"user" : {
		"name" : "Avynn"	
	},
	"vote" : 2
}
```

the following are required fields for this patch:

- user : this field specifies the user to update

- vote: this specifies which vote position to take

body response: *see GET /meetings/:meetingID/items/:itemID*