import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
const baseUrl = 'http://127.0.0.1:8080/api'
chai.use(chaiHttp)

describe('Test controller', () => {
  describe('Get cars', () => {
    it('should get all information of the cars', async () => {
      const res = await chai.request(baseUrl).get('/cars')
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('array')
      expect(res.body).to.have.lengthOf(3)
    })
  })

  describe('Book cars', () => {
    const location = {
      'source': {
        'x': 1,
        'y': 0
      },
      'destination': {
        'x': 1,
        'y': 1
      }
    }
    beforeEach(async () => {
      await chai.request(baseUrl).put('/reset')
    })

    it('should return car_id and total_time when book a car', async () => {
      const res = await chai.request(baseUrl).post('/book').send(location)
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.a.property('car_id')
      expect(res.body).to.have.a.property('total_time')
    })

    it('should return a car with smallest car_id when there are many cars which has the same location', async () => {
      const res = await chai.request(baseUrl).post('/book').send(location)
      expect(res).to.have.status(200)
      expect(res.body.car_id).to.equal(1)
    })

    it('should return a positive number of total_time', async () => {
      const res = await chai.request(baseUrl).post('/book').send(location)
      expect(res).to.have.status(200)
      expect(res.body.total_time).to.above(0)
    })

    it('should not return the same car when it was booked before', async () => {
      await chai.request(baseUrl).post('/book').send(location)
      const res = await chai.request(baseUrl).post('/book').send(location)
      expect(res).to.have.status(200)
      expect(res.body.car_id).not.to.equal(1)
    })

    it('should get status 400 if the sending data miss source or destination', async () => {
      const res = await chai.request(baseUrl).post('/book').send({
        'source': {
          'x': 1,
          'y': 0
        }
      })

      expect(res).to.have.status(400)
    })

    it('should return an empty object if all of 3 cars are booked', async () => {
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).post('/book').send(location)

      const res = await chai.request(baseUrl).post('/book').send(location)

      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.be.empty
    })

    it('should return correct car_id and total_time', async () => {
      const res1 = await chai.request(baseUrl).post('/book').send({
        'source': {
          'x': 1,
          'y': 0
        },
        'destination': {
          'x': 1,
          'y': 1
        }
      })
      const res2 = await chai.request(baseUrl).post('/book').send({
        'source': {
          'x': 1,
          'y': 1
        },
        'destination': {
          'x': 5,
          'y': 5
        }
      })
      const res3 = await chai.request(baseUrl).post('/book').send({
        'source': {
          'x': -1,
          'y': 1
        },
        'destination': {
          'x': 5,
          'y': 10
        }
      })

      expect(res1.body).to.deep.equal({
        'car_id': 1,
        'total_time': 2
      })
      expect(res2.body).to.deep.equal({
        'car_id': 2,
        'total_time': 10
      })
      expect(res3.body).to.deep.equal({
        'car_id': 3,
        'total_time': 17
      })
    })
  })

  describe('System tick', () => {
    const location = {
      'source': {
        'x': 1,
        'y': 0
      },
      'destination': {
        'x': 1,
        'y': 1
      }
    }

    beforeEach(async () => {
      await chai.request(baseUrl).put('/reset')
    })

    it('The time unit of car should be decreased', async () => {
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).post('/tick')
      await chai.request(baseUrl).post('/tick')
      const res = await chai.request(baseUrl).get('/cars')
      const car = res.body[0]

      expect(res).to.have.status(200)
      expect(car.timeUnit).to.be.equal(0)
    })
  })

  describe('Reset data', () => {
    const location = {
      'source': {
        'x': 1,
        'y': 0
      },
      'destination': {
        'x': 1,
        'y': 1
      }
    }

    beforeEach(async () => {
      await chai.request(baseUrl).put('/reset')
    })

    it('The time unit of car should be decreased', async () => {
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).post('/book').send(location)
      await chai.request(baseUrl).put('/reset')
      const res = await chai.request(baseUrl).get('/cars')
      const car = res.body[0]

      expect(res).to.have.status(200)
      expect(car.timeUnit).to.be.equal(0)
      expect(car.status).to.be.equal('AVAILABLE')
    })
  })
})
