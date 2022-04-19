# taxi-booking-system

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

- Response payload

```json
{
  "car_id": id,
  "total_time": t
}
```

#### `POST /api/tick`

This API makes our service time stamp increase 1 time unit

#### `PUT /api/reset`

Reset data to initial status

#### `GET /api/cars`

Get all information of cars
