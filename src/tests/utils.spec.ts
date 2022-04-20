import { expect } from 'chai'
import { calculateTimeUnit } from '../utils/utils'

describe('Test util service', () => {
  const location = {
    'source': {
      'x': 0,
      'y': 0
    },
    'destination': {
      'x': 2,
      'y': 2
    }
  }

  it('should return correct time unit', async () => {
    const result = calculateTimeUnit(location.source, location.destination)

    expect(result).to.equal(4)
  })
})

