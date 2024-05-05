// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapToken;
const coordinates = listing.geometry.coordinates;
const map = new mapboxgl.Map({
  container: "map", // container ID
  projection: "globe",
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  center: coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

map.on("style.load", () => {
  map.setFog({});
});
const title = listing.title;
const marker = new mapboxgl.Marker({ color: "#fe424d" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${title}</h4> <p>Exact location will be provided after booking....</p>`
    )
  ) // add popup
  .addTo(map);
