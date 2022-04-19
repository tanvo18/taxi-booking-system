import { Coordinate } from '../models/coordinate'

export const calculateTimeUnit = (source: Coordinate, destination: Coordinate) => {
  return Math.abs(destination.x - source.x) + Math.abs(destination.y - source.y)
}
