$(document).ready(function () {
    function onclick() {
        console.log('fired');

        var city = $("#searchForm").val();
        getCities(city, processCities);

        if (city.length === 0) {
            console.log('Please search by: city');
            $('#myModal').modal('show')
                // && $('#select').val().hide(); tried many iterations of this to no avail

        } else {
            console.log(city);
        }
    }
    $("#searchFormForm").submit(function() {
        var value = $("#searchForm").val();
        if (value.length !== 0) {
            onclick();
        }
        return false;
    });
    $("#searchForm").keyup(function (key) {
        if (key === 13) {
            return;
        }
        var value = $("#searchForm").val();
        if (value.length === 0) {
            $("#submit").prop("disabled", true);
        } else {
            $("#submit").prop("disabled", false);
        }
    });

    $("#submit").on("click", onclick);

    var content;

    //queries results for city and calls the callback.
    function getCities(city, resultCallback) {
        var entry = $("#searchForm").val();
        $("#searchForm").val("");
        $("#submit").prop("disabled", true);
        $.ajax({
            headers: {
                "x-Zomato-API-Key": "29634845f26e2908bff359556e46203f"
            },
            url: "https://developers.zomato.com/api/v2.1/cities?q=" + entry,
            success: resultCallback
        });
    }
    //display selections for cities and setting up click functionality.
    function processCities(cityDatas) {
        $("#cities").empty();
        $("#restaurants").empty();
        for (let i = 0; i < cityDatas.location_suggestions.length; i++) {
            $("#cities").append("<input type='radio' id='city" + cityDatas.location_suggestions[i].name + "' name='city' value='" + i + "'>");
            $("#cities").append("<label for='city" + cityDatas.location_suggestions[i].name + "'>" + cityDatas.location_suggestions[i].name + "</label><br/>");
        }
        $("#cities").append('<button id="select"  class="btn btn-outline">Select</button>');
        $("#select").on("click", function () {
            var selectedCity = $("input:radio[name='city']:checked").val();
            displayCity(cityDatas.location_suggestions[selectedCity].id);
        });
    }

    //display restaurants in city and updating map
    function displayCity(cityID) {
        restaurantContents = {};
        $.ajax({
            headers: {
                "x-Zomato-API-Key": "29634845f26e2908bff359556e46203f"
            },
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=10&establishment_type=7&sort=rating&order=desc",
            success: function (searchDatas) {
                $("#results-table").css("display", "block");
                $("#restaurants").empty();

                var tBody = $("#targetTable");
                tBody.empty();
                for (let i = 0; i < searchDatas.restaurants.length; i++) {
                    var tRow = $("<tr>");
                    if (i % 2 === 0) {
                        tRow.attr('style', 'background-color: #426b999c')
                    } else {
                        tRow.attr('style', 'background-color: #ff8200a3')
                    }
                    var restaurant = searchDatas.restaurants[i].restaurant
                    var nameTd = $("<td>").text(restaurant.name);
                    var addressTd = $("<td>").text(restaurant.location.address);
                    var ratingTd = $("<td>").text(restaurant.user_rating.aggregate_rating);
                    // console.log(searchDatas.restaurants[i].restaurant);
                    // console.log("NAME:", restaurant.name)
                    // console.log("ADDRESS:", restaurant.location.address)
                    // console.log("RATING:", restaurant.user_rating.aggregate_rating)
                    tRow.append(ratingTd, nameTd, addressTd)
                    console.log(tRow)
                    tBody.append(tRow)
                    console.log(tBody)
                    var cont = `<p id="restaurant-${i}">${searchDatas.restaurants[i].restaurant.name} with Rating ${searchDatas.restaurants[i].restaurant.user_rating.aggregate_rating} <br/>${searchDatas.restaurants[i].restaurant.location.address} </p>`;
                    // $("#restaurants").append(cont);
                    restaurantContents[`restaurant-${i}`] = cont;
                }
                displayOnMap(searchDatas.restaurants);
                //adding name, location and rating into table 
            }
        });
    }

    function displayOnMap(restaurants) {
        console.log(restaurants);
        //finds centerpoint on map
        var lng = 0;
        var lat = 0;

        for (let i = 0; i < restaurants.length; ++i) {
            lng += parseFloat(restaurants[i].restaurant.location.longitude);
            lat += parseFloat(restaurants[i].restaurant.location.latitude);
        }

        lng = lng / restaurants.length;
        lat = lat / restaurants.length;
        // centerpoint on city
        var centerPoint = {
            lat: lat,
            lng: lng
        };
        // The map, centered at centerpoint
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 10,
                center: centerPoint
            });
        // The marker, positioned at city
        for (let i = 0; i < restaurants.length; i++) {
            var position = {
                lat: parseFloat(restaurants[i].restaurant.location.latitude),
                lng: parseFloat(restaurants[i].restaurant.location.longitude)

            };
            console.log("position", position);

            var marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: restaurants[i].restaurant.location.address,
            });


            var contentString = `<p id="restaurant-${i}">${restaurants[i].restaurant.name} <br> Rating: ${restaurants[i].restaurant.user_rating.aggregate_rating} <br/>${restaurants[i].restaurant.location.address} </p>`

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function (event) {
                console.log(event);
                content = document.getElementById(`restaurant-${i}`);
                if (!content) {
                    content = restaurantContents[`restaurant-${i}`];
                }
                infowindow.setContent(content);
                marker.setPosition(event.latLng);
                //infowindow.content = content;
                infowindow.open(map, marker);

            });
        }
    }

    var latestPopup

    function createPopupClass() {
        /**
         * A customized popup on the map.
         * @param {!google.maps.LatLng} position
         * @param {!Element} content The bubble div.
         * @constructor
         * @extends {google.maps.OverlayView}
         */
        function Popup(position, content) {
            this.position = position;

            content.classList.add('popup-bubble');

            // This zero-height div is positioned at the bottom of the bubble.
            var bubbleAnchor = document.createElement('div');
            bubbleAnchor.classList.add('popup-bubble-anchor');
            bubbleAnchor.appendChild(content);

            // This zero-height div is positioned at the bottom of the tip.
            this.containerDiv = document.createElement('div');
            this.containerDiv.classList.add('popup-container');
            this.containerDiv.appendChild(bubbleAnchor);

            // Optionally stop clicks, etc., from bubbling up to the map.
            google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
        // ES5 magic to extend google.maps.OverlayView.
        Popup.prototype = Object.create(google.maps.OverlayView.prototype);

        /** Called when the popup is added to the map. */
        Popup.prototype.onAdd = function () {
            this.getPanes().floatPane.appendChild(this.containerDiv);
        };

        /** Called when the popup is removed from the map. */
        Popup.prototype.onRemove = function () {
            if (this.containerDiv.parentElement) {
                this.containerDiv.parentElement.removeChild(this.containerDiv);
            }
        };

        /** Called each frame when the popup needs to draw itself. */
        Popup.prototype.draw = function () {
            var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

            // Hide the popup when it is far out of view.
            var display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

            if (display === 'block') {
                this.containerDiv.style.left = divPosition.x + 'px';
                this.containerDiv.style.top = divPosition.y + 'px';
            }
            if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
            }
        };

        return Popup;
    }
});