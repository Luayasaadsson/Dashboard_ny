# Dashboard Applikation README

## Översikt
Denna dashboard-applikation erbjuder flera användbara funktioner, inklusive klockslag och datum, anpassbar rubrik, länkhantering, väderinformation, snabba anteckningar och möjlighet att byta bakgrundsbild.

## Installation
1. Klona detta projekt till din dator med `git clone https://github.com/Luayasaadsson/Dashboard`.
2. Navigera till projektmappen med `cd Dashboard`.
3. För att komma åt projektet `npm run dev` och klistra in `http://localhost:5173/` i din webbläsare.
4. Öppna `index.html` i din webbläsare för att använda dashboarden.

## Konfiguration

- **Väderwidget**:
För att konfigurera väderwidgeten behöver du en API-nyckel från Weatherapi.com. Registrera dig och få en API-nyckel från deras webbplats. När du har API-nyckeln, ersätt apiKey i JavaScript-koden med din egen API-nyckel:
const apiKey = "DIN_VÄDER_API_NYCKEL_HÄR";

- **Bakgrundsbild**:
För att använda funktionen för att ändra bakgrundsbilden med hjälp av Unsplash API, måste du ha en API-nyckel från Unsplash. Registrera dig på Unsplash för att få en API-nyckel. Ersätt apiKey i JavaScript-koden med din Unsplash API-nyckel:
const apiKey = 'DIN_UNSPLASH_API_NYCKEL_HÄR';

## Översikt över olika delar

![Bild på mockup som följde med i uppgiften](./Dashboard/images/mockup.png)

### Klockslag och Datum

- **Klockan**: Denna dashboard-applikation visar aktuellt klockslag och datum i realtid. Klockslaget uppdateras varje sekund och visas med timmar och minuter.

- **Datum:** Datumet visas med dag, månad och år. Klockan och datumet är synliga längst upp på dashboarden.

### Anpassad Rubrik
- Klicka på rubriken för att göra den redigerbar.
- Ändra rubriken och spara ändringarna genom att klicka var som helst i sidan. Rubriken sparas direkt och kan anpassas efter ditt behov.

### Väder i Närtid
- Ange din önskade stad i input-fältet och tryck på Enter för att hämta väderinformation från den staden.
- Om ingen stad anges, kommer applikationen be dig att mata in en stad för att hämta väderinformationen för just den staden.

### Länkhantering
Dashboard-applikationen erbjuder användare en praktisk länkhanteringsfunktion för att enkelt komma åt sina favoritwebbsidor.

#### Ta Bort Länkar
- För att ta bort en befintlig länk, klicka på den lilla runda "ta bort"-knappen. Länken kommer att tas bort från listan.

#### Lägga Till Nya Länkar
- För att lägga till en ny länk, klicka på "Lägg till Länk"-knappen. En modal kommer att öppnas.
- Ange länkens namn och URL i respektive fält i modalen.
- Klicka på "Lägg till länk" för att lägga till länken i din lista med snabblänkar.
- Modalen kommer att stängas, och den nya länken kommer att visas på din dashboard.

### Byt Bakgrundsbild
- Ange ett sökord för att hitta en slumpmässig bild från Unsplash API. Klicka på "Slumpa ny bakgrund" knappen för att uppdatera bakgrundsbilden. Användare kan även trycka direkt på "Slumpa ny bakgrund" knappen för att ändra bakgrundsbilden utan att behöva ange ett specifikt sökord. 

## Resonemang
Denna dashboard-applikation utvecklades för att erbjuda användarna en användbar och anpassbar arbetsyta. Här är några överväganden:

- **Lokal lagring:** Jag använder `localStorage` för att spara rubriken, länkarna, väderpreferenser och snabba anteckningar lokalt på användarens enhet.
- **API-användning:** För att hämta väderdata och bakgrundsbilder använder jag externa API:er (Weatherapi.com och Unsplash API).
- **Användarvänlighet:** Användare kan enkelt redigera rubriken, hantera länkar, skriva anteckningar och ändra bakgrundsbild med några klick.

## Bonus: Radiosektion
Denna applikation innehåller även en radiosektion som ger användaren möjlighet att lyssna på radiokanaler från SR (Sveriges Radio).

- **Radiokanalbyte:** Användaren kan byta mellan radiokanaler genom att klicka på knapparna "Föregående" och "Nästa". Nuvarande kanalinformation och bilden uppdateras i realtid.
- **Spelarstyrning:** Användaren kan pausa och återuppta uppspelningen genom att klicka på play/pause-knappen.

## Mitt resultat
![Bild på mitt resultat](./Dashboard/images/Resultat.png)
