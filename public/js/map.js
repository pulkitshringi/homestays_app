// public/js/map.js

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: list.geometry.coordinates, // starting position [lng, lat]
	zoom: 9, // starting zoom
});
const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(list.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        `<h3>${list.title}</h3><p>${list.location}</p>`
    )
)
.addTo(map);


console.log(list.geometry.coordinates);