# taxi-booking-system


## Clone this project
```
git clone git@github.com:tanvo18/taxi-booking-system.git
```

## Run app via Docker
- Navigate to the root of this project
- Make sure your machine can run the script on bin folder
```
chmod +x bin/*
```
- Run app
```
./bin/run-app run
```

## Run app on local machine
- Navigate to the root of this project
- Using Node.js v16.14.0
- Install npm
```
npm install
```
- Run app
```
npm start
```

## Run test on local machine
- Using Node.js v16.14.0
- Install npm
```
npm install
```
- Make sure the app server is running (by running via docker or local)
```
npm start
```
- Run test (on another tab of your terminal)
```
npm run test
```

## APIs

#### `POST /api/book`

Our system will pick the nearest available car to the customer location and return the total time taken to travel from the current car location to customer location then to customer destination.

- Request payload

  | Parameter | Type | Description |
  | :--- | :--- | :--- |
  | `location json object` | `object` | **Required** |

```json
{
  "source": {
    "x": x1,
    "y": y1
  },
  "destination": {
    "x": x2,
    "y": y2
  }
}
```

- Response payload if there is at least 1 car available

```json
{
  "car_id": id,
  "total_time": t
}
```

- Response payload if there aren't any available car
```json
{ }
```

- Response payload if the sending payload miss `car_id` or `total_time`
```json
{
    "name": "BAD_REQUEST",
    "statusCode": 400,
    "description": "Missing source or destination"
}
```

#### `POST /api/tick`

This API makes our service time stamp increase 1 time unit

- Response payload
```json
{
  "message": "The service time has increased"
}
```

#### `PUT /api/reset`

Reset data to initial status

- Response payload
```json
[
    {
        "id": 1,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    },
    {
        "id": 2,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    },
    {
        "id": 3,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    }
]
```

#### `GET /api/cars`

Get all information of cars

- Response payload
```json
[
    {
        "id": 1,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    },
    {
        "id": 2,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    },
    {
        "id": 3,
        "startCoordinate": {
            "x": 0,
            "y": 0
        },
        "destCoordinate": {
            "x": 0,
            "y": 0
        },
        "status": "AVAILABLE",
        "timeUnit": 0
    }
]
```

## Status Codes

My app returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 500 | `INTERNAL SERVER ERROR` |
