async function findPointsInRange(data,lng1, lat1, lng2, lat2) {
  let lngs = [lng1, lng2];
  let lats = [lat1, lat2];
  let points = [];
  data.map((point) => {
    point.pointsOnRoutes.map((point) => {
      let flag = false;
      point.point.region.geometry.coordinates[0].some((polygonDots) => {
        if (
          polygonDots[0] >= Math.min(...lngs) &&
          polygonDots[0] <= Math.max(...lngs) &&
          polygonDots[1] >= Math.min(...lats) &&
          polygonDots[1] <= Math.max(...lats)
        ) {
          flag = true;
          return true;
        }
      });
      if (flag === true) points.push(point);
    });
  });
  return points;
}
module.exports = {
    findPointsInRange
}
