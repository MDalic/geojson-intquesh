function averageCoordLocation(polygonCoordinates) {
  let averageLat = 0;
  let averageLong = 0;
  polygonCoordinates.map((element) => {
    averageLong += element[0];
    averageLat += element[1];
  });
  averageLat = averageLat / polygonCoordinates.length;
  averageLong = averageLong / polygonCoordinates.length;
  return [averageLong, averageLat];
}

function calcCrow(lat1, lon1, lat2, lon2) {
  const toRad = (value)=>{
    return (value * Math.PI) / 180;
  }
  var R = 6371;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
function routePoints(lng, lat, route) {
  let closestDistance = undefined;
  route.point.region.geometry.coordinates.map((coordOfInterest) => {
    let averagePoint = averageCoordLocation(coordOfInterest);
    let distance = calcCrow(
      lat,
      lng,
      averagePoint[1],
      averagePoint[0]
    );
    if (distance === undefined) {
      return undefined;
    }
    if (closestDistance === undefined || closestDistance > distance) {
      closestDistance = distance;
    }
  });
  return [route, closestDistance];
}
function addRouteToList(route, closestPointDistance, routeList, count) {
  const sortFunction = (a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  }
  if (Object.keys(routeList).length < count) {
    routeList.push({ route: route, distance: closestPointDistance });
    routeList.sort(sortFunction);
    return routeList;
  }
  let furthestRoute = routeList[Object.keys(routeList).length - 1].distance;
  if (furthestRoute < closestPointDistance) {
    return routeList;
  }
  routeList.pop();
  routeList.push({ route: route, distance: closestPointDistance });
  routeList.sort(sortFunction);
  return routeList;
}
async function findNearestRoutes(data,lng, lat, count = 10) {
  let nearestRoutes = [];
  data.map((route) => {
    let closestPointDistance = undefined;
    route.pointsOnRoutes.map((polygonPoints) => {
      let routePointsData = routePoints(lng, lat, polygonPoints);
      if (routePointsData != undefined) {
        if (closestPointDistance === undefined || closestPointDistance > routePointsData[1]) {
          closestPointDistance = routePointsData[1];
        }
      }
    });
    if (closestPointDistance !== undefined) {
      nearestRoutes = addRouteToList(
        route,
        closestPointDistance,
        nearestRoutes,
        count
      );
    }
  });
  return nearestRoutes;
}
module.exports = {
    findNearestRoutes
}