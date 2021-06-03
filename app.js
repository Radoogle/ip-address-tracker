
var ip = "8.8.8.8";
var api_key = "at_8ImEfWwvJg9bMIiN39bWGslexvvsF";
  
$.getJSON("https://api.ipify.org?format=json",
    function(data) {
        ip = data.ip;
        $("#detailIp").html(ip);
        $(function () {
            $.ajax({
                url: "https://geo.ipify.org/api/v1",
                data: {apiKey: api_key, ipAddress: ip},
                success: function(data) {
                    // console.log(JSON.stringify(data,"",2));
                    const city = data.location.city; 
                    const country = data.location.country; 
                    const postalcode = data.location.postalcode || "no postal code";  
                    const timezone = data.location.timezone;
                    $("#detailLocation").html(`${city}, ${country}, ${postalcode}`);
                    $("#detailTimezone").html(`UTC ${timezone}`);
                    $("#detailIsp").html(data.isp);
                }
            });
        });
        
    });



