
import axios from "axios"

// Här hämtar jag DOM-elementen genom att använda querySelector och getElementById.
const mp3Player = document.querySelector('.mp3-player');
const audioPlayer = document.querySelector('audio');
const modal = document.getElementById("linkModal");
const btn = document.getElementById("addLinkButton");
const span = document.getElementsByClassName("close")[0];
let channels = []; // Array för att lagra kanaldata
let currentChannelIndex = 0; // Index för nuvarande vald kanal

// Här definierar jag en funktion som uppdaterar klockan och datumet varje sekund och kör den med ett intervall.
function updateClockAndDate() {
  // Här skapar jag en ny Date-objekt och formaterar datum och tid.
  const now = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const date = now.toLocaleDateString('sv-SE', dateOptions);
  const time = now.toLocaleTimeString('sv-SE', timeOptions);

  // Här uppdaterar jag HTML-elementet med aktuell tid och datum.
  document.getElementById('clock').innerHTML = `
      <div class="time">${time}</div>
      <div class="date">${date}</div>
  `;
}

// Här kör jag updateClockAndDate-funktionen varje sekund med setInterval och även en gång direkt när sidan laddas.
setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// Här lägger jag till eventlyssnare för att göra rubriken redigerbar och sparar den i localStorage när den ändras.
document.getElementById('title').addEventListener('click', function() {
  this.contentEditable = true;
});
document.getElementById('title').addEventListener('blur', function() {
  localStorage.setItem('dashboardTitle', this.textContent);
  this.contentEditable = false;
});

// Här laddar jag den sparade rubriken när sidan laddas.
document.addEventListener('DOMContentLoaded', function() {
  const savedTitle = localStorage.getItem('dashboardTitle');
  if (savedTitle) {
    document.getElementById('title').textContent = savedTitle;
  }
});

// Här lägger jag till eventlyssnare för att öppna och stänga en modal (pop-up) när en knapp klickas.
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Här lägger jag till en eventlyssnare för att hantera formuläret för att lägga till länkar.
document.getElementById('linkForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const linkName = document.getElementById('linkName').value;
  const linkURL = document.getElementById('linkURL').value;
  if (linkName && linkURL) {
    addLink(linkName, linkURL);
    modal.style.display = "none";
    document.getElementById('linkForm').reset(); // Rensar formuläret
  }
});

// Här definierar jag en funktion för att formatera URL om den inte börjar med "http://" eller "https://".
function formatUrl(url) {
  if (!url.match(/^https?:\/\//i)) {
    url = "http://" + url;
  }
  return url;
}

// Här definierar jag en funktion för att lägga till en länk i listan med länkar.
function addLink(name, url) {
  const formattedUrl = formatUrl(url);
  const list = document.getElementById('linksList');
  const li = document.createElement('li');
  const faviconURL = `https://www.google.com/s2/favicons?sz=32&domain_url=${formattedUrl}`; // Skapar en URL för att hämta en favicon (webbplatsikon) från Google's favicon-tjänst.
  li.innerHTML = `<img src="${faviconURL}" alt="Favicon" />
                <a href="${formattedUrl}" target="_blank">${name}</a>
                <button class="remove-link">-</button>`;
  list.appendChild(li);
  saveLinks();
}

// Här definierar jag en funktion för att spara länkarna i localStorage.
function saveLinks() {
  const links = [];
  document.querySelectorAll('#linksList li').forEach(li => {
    const link = li.querySelector('a');
    links.push({ name: link.textContent, url: link.getAttribute('href') });
  });
  localStorage.setItem('snabblankar', JSON.stringify(links));
}

// Här definierar jag en funktion för att ta bort en länk från listan och sparar ändringarna.
function removeLink(linkElement) {
  linkElement.parentNode.remove();
  saveLinks();
}

// Denna funktion laddar sparade länkar från localStorage och lägger till dem på webbsidan.
function loadLinks() {
  // Hämtar länkdata från localStorage med nyckeln 'snabblankar' och konverterar den från en JSON-sträng till ett JavaScript-objekt.
  const links = JSON.parse(localStorage.getItem('snabblankar'));

  // Loopar igenom varje länk i den hämtade länklistan.
  links.forEach(link => {
    // För varje länk anropas addLink-funktionen med länkens namn och URL som argument.
    // Detta kommer att lägga till länken i listan på webbsidan.
    addLink(link.name, link.url);
  });
}

// Här återställer jag länkarna när sidan laddas.
document.addEventListener('DOMContentLoaded', loadLinks);


// Här använder jag event delegation för att hantera klick på "ta bort"-knappar i länklistan.
document.getElementById('linksList').addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('remove-link')) {
    removeLink(e.target);
  }
});

// Här hanterar jag anteckningar och sparar dem i localStorage.
const notes = document.getElementById('notes');
notes.addEventListener('input', function() {
  localStorage.setItem('notes', this.value);
});

// Här laddar jag sparade anteckningar när sidan laddas.
const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
  notes.value = savedNotes;
}

// Här definierar jag en API-nyckel för att hämta väderdata från Weatherapi.com
const apiKey = "0941b5613d4d44fcba9223717241101";

// Här definierar jag en funktion för att hämta väderdata för den stad man skriver in.
function getWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  
  // Skapar och returnerar en Promise som hämtar väderdata från en URL.
  return new Promise((resolve, reject) => {
     // Använder Axios för att göra en HTTP GET-förfrågan till den specificerade URL:en.
    axios.get(url)
      .then(response => {
        // Om förfrågan lyckas, löser jag löftet med den hämtade data som ett resultat.
        resolve(response.data);
      })
      .catch(error => {
          // Om det uppstår ett fel under förfrågan, avvisar jag löftet med ett felmeddelande.
        reject("Fel vid hämtning av väderdata: " + error);
      });
  });
}

// Här definierar jag en funktion för att uppdatera väderwidgeten med hämtad väderdata.
function updateWeatherWidget(data) {
  const weatherDiv = document.getElementById('weather');
  let widgetContent = `<h2 class="weatherTitle">Väder i ${data.location.name}</h2>`;

  for (let i = 0; i < data.forecast.forecastday.length; i++) {
    const forecast = data.forecast.forecastday[i];
    const date = new Date(forecast.date);
    // Använder toLocaleDateString för att få veckodagens namn på svenska och med stora bokstäver.
    const weekDay = date.toLocaleDateString('sv-SE', { weekday: 'long' }).toUpperCase();

    widgetContent += `
      <div class="weatherDiv">
        <h3>${weekDay}</h3>
        <p>Max temperatur: ${forecast.day.maxtemp_c} °C</p>
        <p>Min temperatur: ${forecast.day.mintemp_c} °C</p>
        <p>Vind: ${forecast.day.maxwind_kph} km/h</p>
        <img src="${forecast.day.condition.icon}" alt="${forecast.day.condition.text}">
      </div>`;
  }

  weatherDiv.innerHTML = widgetContent;
}

// Här laddar jag väderdata när sidan laddas och om det finns en senast använd stad i localStorage.
document.addEventListener('DOMContentLoaded', () => {
  const latestCity = localStorage.getItem('latestCity');
  if (latestCity) {
    getWeatherData(latestCity)
      .then(data => {
        updateWeatherWidget(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
});

// Här lägger jag till en eventlyssnare för att hämta väderdata när användaren trycker Enter efter att ha angett en stad.
document.getElementById('city-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    // Hämtar värdet och med metoden trim() tar jag bort eventuella onödiga mellanslag (whitespace).
    const city = this.value.trim();
    if (city) {
      localStorage.setItem('latestCity', city);
      getWeatherData(city)
        .then(data => {
          updateWeatherWidget(data);
          this.value = "";
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('Var god ange en stad.');
    }
  }
});

// Här hämtar jag kanaldata från en SR radio med hjälp av Axios.
axios.get('http://api.sr.se/api/v2/channels?format=json&size=100')
  .then(response => {
    channels = response.data.channels;
    console.log(channels)
    updatePlayer(currentChannelIndex);
  })
  .catch(error => {
    console.error('Ett fel inträffade:', error);
  });

// Här lägger jag till eventlyssnare för att hantera kontrollknappar för kanalbyte och för att stoppa radion.
document.querySelector('.prev-btn').addEventListener('click', prevChannel);
document.querySelector('.next-btn').addEventListener('click', nextChannel);
document.querySelector('.play-btn').addEventListener('click', togglePlay);

// Här definierar jag en funktion för att uppdatera spelaren med aktuell kanal.
function updatePlayer(channelIndex) {
  const channel = channels[channelIndex];
  const trackInfo = document.querySelector('.track-info');

  // Uppdaterar bilden och bakgrundsfärgen som följer med i anropet för spelaren.
  const player = document.querySelector('.mp3-player');
  player.style.backgroundImage = `url(${channel.image})`;
  player.style.backgroundColor = `#${channel.color}`;
  player.style.backgroundSize = '90%';

  trackInfo.innerHTML = `<h4>${channel.name}</h4><p>Live</p>`;
  
  audioPlayer.src = channel.liveaudio.url;
  audioPlayer.play();
}

// Här definierar jag funktionen för att byta kanal bakåt.
function prevChannel() {
  if (currentChannelIndex > 0) {
    currentChannelIndex--;
  } else {
    currentChannelIndex = channels.length - 1;
  }
  updatePlayer(currentChannelIndex);
}
// Här definierar jag funktionen för att byta kanal framåt.
function nextChannel() {
  if (currentChannelIndex < channels.length - 1) {
    currentChannelIndex++;
  } else {
    currentChannelIndex = 0; 
  }
  updatePlayer(currentChannelIndex);
}

// Här definierar jag en funktion för att byta mellan uppspelning och paus.
function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    document.querySelector('.play-btn i').classList.remove('fa-play');
    document.querySelector('.play-btn i').classList.add('fa-pause');
    mp3Player.classList.add('rotate-background');
  } else {
    audioPlayer.pause();
    document.querySelector('.play-btn i').classList.remove('fa-pause');
    document.querySelector('.play-btn i').classList.add('fa-play');
    mp3Player.classList.remove('rotate-background'); 
  }
}

// Här lägger jag till en eventlyssnare för att ändra bakgrundsbild med hjälp av Unsplash API.
document.getElementById('changeBackground').addEventListener('click', function() {
  const searchTerm = document.getElementById('search-term').value;

  const apiKey = 'sOglukxA3l2gjCMAEN33IVJWkF5W02NBb4tzAl8Jbyk'; // Min API-nyckel från Unsplash.com
  let url = `https://api.unsplash.com/photos/random?client_id=${apiKey}`; // Url:en från Unsplash.com

 // Om det finns ett giltigt sökord, lägger det till i API-förfrågan och sparar det i localStorage.
if (searchTerm) {
  // Lägger till det kodade sökordet som en parameter i API-förfrågan.
  url += `&query=${encodeURIComponent(searchTerm)}`;

  // Sparar även sökordet i localStorage för att komma ihåg det för framtida användning.
  localStorage.setItem("searchTerm", searchTerm);
} else {
  // Om inget sökord har angetts, tar bort eventuell tidigare sparad sökinformation från localStorage.
  localStorage.removeItem("searchTerm");
}


  // Använder Axios för att göra API-förfrågan.
  axios.get(url)
    .then(response => {
      const imageUrl = response.data.urls.regular;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem("backgroundImage", imageUrl);
    })
    .catch(error => {
      console.error('Fel vid hämtning av bild från Unsplash', error);
    });
});

// Denna kod körs när sidan är fullständigt laddad ('DOMContentLoaded').
// Den hämtar och återställer den sparade bakgrundsbilden och söktermen från localStorage om de finns.
// Om en sparad bakgrundsbild finns, tillämpas den på <body> elementet som bakgrundsbild.
// Om en sparad sökterm finns, fylls inmatningsfältet med den sparade söktermen.
document.addEventListener('DOMContentLoaded', () => {
  const savedImage = localStorage.getItem('backgroundImage');
  const savedSearchTerm = localStorage.getItem('searchTerm');

  if (savedImage) {
    document.body.style.backgroundImage = `url('${savedImage}')`;
  }
  
  if (savedSearchTerm) {
    document.getElementById('search-term').value = savedSearchTerm;
  }
});
