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

### /meetings

Headers required:

```
{
    Content-Type: application/json
}
```

Body Returned:

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
                "id": "1dk4ife94jz0c8soh",
                "name": "From Poop",
                "description": "hello there",
                "timeAllotted": 0,
                "votable": false,
                "usersAye": [],
                "usersNay": [],
                "startTime": "2019-08-06T21:10:59.042Z",
                "endTime": "2019-08-06T21:10:59.042Z"
            },
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