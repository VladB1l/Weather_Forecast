var header = document.querySelector('header');
var search = document.getElementById('search');
search.onclick = function () {

    var city;
    var input_city = document.querySelector(".input_city").value;
    city = input_city;
    // Newcity = document.createElement('h2');
    // Newcity.innerHTML = city;
    // document.body.prepend(Newcity);

    if (input_city != false) {


        //Запит погоди для Києва (id=703448) 2761367 Wien
        var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}`;
        //До запиту додається власний API Key
        requestURL = requestURL + '&appid=af986c073384bec4b982c5f1737ab040';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        //Відправка запиту
        request.send();
        request.onload = function ()
        //Ця функція виконується після отримання відповіді
        {
            var cityweather_json = request.response;
            showWeather(cityweather_json);
        }


        function showWeather(jsonObj)
        //Виведення даних щодо погоди
        {
            var d = new Date();
            //Доступ до даних отриманого JSONоб'єкта спирається на його ієрархічну структуру

            var section = document.createElement("section");
            section.style.backgroundImage = "url(./clouds.jpg)"
            document.body.firstElementChild.append(section);
            sections = document.querySelectorAll("section")


            if (sections.length > 1) {
                sections[0].remove();
            }

            var obj_length = Object.keys(jsonObj).length;
            console.log(jsonObj)
            console.log(obj_length)

            city = jsonObj.name
            var sHead = `${city} <br> Current date: ` + d.toDateString(d);
            sHead = sHead + "<br>Longitude: " + jsonObj.coord.lon + "<br>Latitude: " + jsonObj.coord.lat;
            var myArticle = document.createElement('article');
            var myH2 = document.createElement('h2');
            myH2.innerHTML = sHead;
            myArticle.appendChild(myH2);
            //Інформація про місто буде в заголовку секції
            section.appendChild(myArticle);
            if (jsonObj.weather[0].main == "Clear") {
                section.style.backgroundImage = "url(./sunny.jpg)"
            } else if (jsonObj.weather[0].main == "Clouds") {
                section.style.backgroundImage = "url(./clouds.jpg)"
            } else {
                section.style.backgroundImage = "url(./rain.avif)"
            }
            //Дані погоди будуть у звичайних рядках
            var myArticle = document.createElement('article');
            var myPara1 = document.createElement('p');
            myPara1.className = 'degree'
            var myPara2 = document.createElement('p');
            //Переводимо у градуси Цельсія
            var t1 = Math.round(jsonObj.main.temp - 273.16);
            var t2 = Math.round(jsonObj.main.feels_like - 273.16);
            myPara1.textContent = t1 + "°";
            myPara2.innerHTML = 'It feels like: ' + t2 + " degrees Celsius <br>" +
                "Wind: " + jsonObj.wind.speed + " m/s ";
            //Збираємо що вийшло, і документ відображається
            myArticle.appendChild(myPara1);
            myArticle.appendChild(myPara2);
            section.appendChild(myArticle);
        }
    }
    else{
        alert("Введіть назву міста, а потім натискайте на кнопку")
    }
}