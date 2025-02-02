// curl -X GET "http://dataservice.accuweather.com/forecasts/v1/daily/1day/258353?apikey=ySA0Wo71icFfOc5g7CvvsGbCRXDEg0H0&language=en-us"

// funcion para obtener el clima

function getWeather() {
    const cachedWeather = localStorage.getItem('weatherData');
    if (cachedWeather) {
        console.log('Using cached weather data:', JSON.parse(cachedWeather));
        // limpiar el cache cada 5 minutos
        // setTimeout(() => {
        //     localStorage.removeItem('weatherData');
        // }, 1000 * 60 * 5);
        return;
    }

    fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/258353?apikey=ySA0Wo71icFfOc5g7CvvsGbCRXDEg0H0&language=en-us")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('weatherData', JSON.stringify(data));
            console.log('Fetched new weather data:', data);
        })
        .catch(error => console.error(error));
}

function fillWeather() {
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));
    if (!weatherData) {
        console.error('No weather data available');
        return;
    }

    console.log('Filling weather data:', weatherData);
    const currentWeather = weatherData.Headline.Text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const currentTemperature = Math.round(weatherData.DailyForecasts[0].Temperature.Maximum.Value);
    const forecast = weatherData.DailyForecasts;

    const weatherSection = document.querySelector('#weather');
    weatherSection.innerHTML = `
        <h2>Weather</h2>
        <p>Current temperature: ${currentTemperature}°F</p>
        <p>Current weather: ${currentWeather}</p>
        <h3>5-day forecast</h3>
        <ul class="forecast">
            ${forecast.map(day => {
                const date = new Date(day.Date);
                const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                const maxTemp = Math.round(day.Temperature.Maximum.Value);
                const minTemp = Math.round(day.Temperature.Minimum.Value);
                const dayWeather = day.Day.IconPhrase.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                const nightWeather = day.Night.IconPhrase.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return `
                    <li>
                        <strong>${formattedDate}</strong>
                        <p>Day: ${dayWeather}</p>
                        <p>Night: ${nightWeather}</p>
                        <p>Max: ${maxTemp}°F</p>
                        <p>Min: ${minTemp}°F</p>
                    </li>
                `;
            }).join('')}
        </ul>
    `;

    console.log('Filled weather data:', weatherData);
}

function getMembershipLevel(level) {
    switch (level) {
      case 1:
        return "Member"
      case 2:
        return "Silver"
      case 3:
        return "Gold"
      default:
        return "Unknown"
    }
  }
  

// Fetch and display member data
async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      console.log("Members", members);
      fillSpotlight(members);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  }

function fillSpotlight(members) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    // Filter members to only include gold or silver members
    const filteredMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);

    // Randomly select two or three members
    const spotlightMembers = [];
    const numberOfSpotlights = Math.floor(Math.random() * 2) + 2; // 2 or 3
    while (spotlightMembers.length < numberOfSpotlights && filteredMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        spotlightMembers.push(filteredMembers.splice(randomIndex, 1)[0]);
    }

    console.log("Spotlight members", filteredMembers);

    spotlightMembers.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        if (member.image) {
            const img = document.createElement("img");
            img.src = `images/${member.image}`;
            img.alt = member.name;
            card.appendChild(img);
          }
      
          if (member.name) {
            const name = document.createElement("h3");
            name.textContent = member.name;
            card.appendChild(name);
          }
      
          if (member.address) {
            const address = document.createElement("p");
            address.textContent = member.address;
            card.appendChild(address);
          }
      
          if (member.phone) {
            const phone = document.createElement("p");
            phone.textContent = member.phone;
            card.appendChild(phone);
          }
      
          if (member.website) {
            const website = document.createElement("p");
            const link = document.createElement("a");
            link.href = member.website;
            link.target = "_blank";
            link.textContent = "Website";
            website.appendChild(link);
            card.appendChild(website);
          }
      
          if (member.membershipLevel) {
            const membershipLevel = document.createElement("p");
            membershipLevel.textContent = `Membership Level: ${getMembershipLevel(member.membershipLevel)}`;
            card.appendChild(membershipLevel);
          }
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    fillWeather();
    fetchMembers();
});
