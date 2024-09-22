/**
 * Calculate the position of a point on a circle given the height of the circle, the number of points on the circle, and the current point.
 * @param height {number} The height of the circle.
 * @param pointCount {number} The number of points on the circle.
 * @param currentPoint {number} The current point.
 * @returns object {x: number, y: number} The x and y coordinates of the point.
 */
export function circlePointPosition(height: number, pointCount: number, currentPoint: number) {
  const angle = (currentPoint / pointCount) * (2 * Math.PI)
  const radius = height / 2
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  }
}
