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
## API Endpoints
### 1. `POST /closest`
#### Request Parameters
- **Required Fields**:
  - `lat` (number): Latitude of the point.
  - `lng` (number): Longitude of the point.
- **Optional Field**:
  - `count` (number): The maximum number of closest routes.

#### Example Request
```json
{
  "lat": 48.1756,
  "lng": 11.5716,
  "count": 5
}
```
### 2. `POST /area`

#### Request Parameters
- **Required Fields**:
  - `lat1` (number): Latitude of the first corner of the bounding box.
  - `lng1` (number): Longitude of the first corner of the bounding box.
  - `lat2` (number): Latitude of the opposite corner of the bounding box.
  - `lng2` (number): Longitude of the opposite corner of the bounding box.

#### Example Request
```json
{
  "lat1": 48.1756,
  "lng1": 11.5716,
  "lat2": 48.2123,
  "lng2": 11.6346
}
```


## Approach
My approach to these 2 tasks was to parse and handle the data without the use of preexisting libraries that use geoJson data.
Only libraries used are the ones pertaining data validation, server and api routing. 
In the first task I went in with 2 presumptions:
1. Distance from coordinate to polygonal point was the distance from coordinate to average lat and long of all polygonal coordinates.
2. The distance is a straight line from point a to point b (as the crows fly formula).


In the second task I went in with 1 presumtion:
1. If any polygonal coordinate is within the bounds of the 2 diagonal coordinates it counts as the point being in said bounds.
