
var ip = "8.8.8.8";
var api_key = "at_8ImEfWwvJg9bMIiN39bWGslexvvsF";
var mymap;
var marker;
  
mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFkdWRlIiwiYSI6ImNrcGlscmV3ZzAzYzIyb3FydnM2aWhnZXgifQ.sgMKaTmLXLIGab7mQFRULQ'
}).addTo(mymap);

function getLocation(ipAddress) {
    $("#inputIp").val(ipAddress);
    $("#detailIp").html(ipAddress);
    
    // using ipify
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {apiKey: api_key, ipAddress: ipAddress},
        success: function(data) {
           console.log(JSON.stringify(data,"",2));
            const city = data.location.city; 
            const country = data.location.country; 
            const postalCode = data.location.postalCode || "no postal code";
            const timezone = data.location.timezone;
            $("#detailLocation").html(`${city}, ${country}, ${postalCode}`);
            $("#detailTimezone").html(`UTC ${timezone}`);
            $("#detailIsp").html(data.isp);
            const lat = data.location.lat;
            const lng = data.location.lng;
            mymap.setView([lat, lng], 13);
            marker = L.marker([lat, lng]).addTo(mymap);
        }
    });

    // using ip-api
    // const url = `http://ip-api.com/json/${ipAddress}?`;
    // $.ajax({
    //     url: url,
    //     success: function(data) {
    //     //    console.log(JSON.stringify(data,"",2));
    //     //    console.log(ipAddress);
    //         const city = data.city; 
    //         const country = data.country; 
    //         const postalCode = data.zip || "no postal code";
    //         const timezone = data.timezone;
    //         $("#detailLocation").html(`${city}, ${country}, ${postalCode}`);
    //         $("#detailTimezone").html(`${timezone}`);
    //         $("#detailIsp").html(data.isp);
    //         const lat = data.lat;
    //         const lon = data.lon;
    //         mymap.setView([lat, lon], 13);
    //         marker = L.marker([lat, lon]).addTo(mymap);
    //     }
    // });

    // using Geolocation API  ---->>>>>  https://w3c.github.io/geolocation-api/
    // only works for current location, but it the most precise location!!!!
    // const url = `http://ip-api.com/json/${ipAddress}?`;
    // $.ajax({
    //     url: url,
    //     success: function(data) {
    //     //    console.log(JSON.stringify(data,"",2));
    //         const city = data.city; 
    //         const country = data.country; 
    //         const postalCode = data.zip || "no postal code";
    //         const timezone = data.timezone;
    //         $("#detailLocation").html(`${city}, ${country}, ${postalCode}`);
    //         $("#detailTimezone").html(`${timezone}`);
    //         $("#detailIsp").html(data.isp);
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const { latitude, longitude } = position.coords;
    //             // console.log(position);
    //             mymap.setView([latitude, longitude], 13);
    //             marker = L.marker([latitude, longitude]).addTo(mymap);
    //           });
    //     }
    // });
}

document.getElementById("submit").addEventListener('click', 
    function(e) { 
        e.preventDefault();
        const inputIp = $("#inputIp").val();
        // ip validation with regex
        const regex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
        if (regex.test(inputIp)) {
            // console.log("getting location for IP: ", inputIp);
            getLocation(inputIp);
        } else {
            alert("Invalid IP address! Please correct and retry!");
        }
    });

$.getJSON("https://api.ipify.org?format=json",
function(data) {
    ip = data.ip;
    getLocation(ip);
});




