
var shoppingList = ["Carrots", "Peas", "Potato"]
recipeNames = []
co2Data = []

// fetches data from the api based on what recipes the user can make
function fetchData() {
    var queryURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + shoppingList + "&app_id=2e4c3f7b&app_key=9937b42f06b25b17a8890d5216e8728a";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 1; i < 14; i++) {
                recipeNames.push(data.hits[i].recipe.label)
                co2Data.push(Math.round(data.hits[i].recipe.totalCO2Emissions));
            }
            console.log(recipeNames, co2Data)
            // chart
            function createChart() {
                const ctx = document.getElementById('myChart');

                const pieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: recipeNames,
                        datasets: [{
                            data: co2Data,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                            }
                        }
                    },
                });
            }
            createChart()
        })
}

// Changes the chart's location when resized
window.onresize = window.onload = function() {
    if ($(window).width() < 800) {
        $('#co2Chart').appendTo($('#chartArea'))
    } else {
        $('#co2Chart').appendTo($('#rightContent'))
    }
}
