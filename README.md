# geojson-intquesh
## Installation
```
npm install
npm run start
```
Requires node version:
```
node --version v18.20.5
```
## Approach
My approach to these 2 tasks was to parse and handle the data without the use of preexisting libraries that use geoJson data.
Only libraries used are the ones pertaining data validation, server and api routing. 
In the first task I went in with 2 presumptions:
1. Distance from coordinate to polygonal point was the distance from coordinate to average lat and long of all polygonal coordinates.
2. The distance is a straight line from point a to point b (as the crows fly formula).


In the second task I went in with 1 presumtion:
1. If any polygonal coordinate is within the bounds of the 2 diagonal coordinates it counts as the point being in said bounds.
