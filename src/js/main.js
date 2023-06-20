"use-strict";

//Holt alle Daten aus der API
async function api(){
    try{
        const url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,languages,maps,population,flags,area';
        const response = await fetch(url);
        const data = await response.json();
        hole_daten(data);
    } catch(error){alert("Server Problems. Please try later!")}
}

/**
 * 
 * @param {Daten aus der API} data 
 * @returns gibt das HTML-TAG zurück mit den jeweiligen Land Daten
 */
function html_generieren_info(data){
    const html_generieren_info =
    ` 
    <div class="bild">
        <h1>${data.name.common}</h1>
        <img src="${data.flags.png}" alt="${data.flags.alt}" title="Flag of ${data.name.common}">
    </div>

    <ul>
        <li><strong>Capital:    ${data.capital.join(', ')}</strong></li>
        <li><strong>Continent:  ${data.region}</strong></li>
        <li><strong>Population: <span class="zahl">${data.population}</span></strong></li>
        <li><strong>Area: <span class="zahl">${data.area}</span> km²</strong></li>
        <li><strong>Languages:  ${Object.values(data.languages).join(', ')}</strong></li>
        <li><strong>Google-Map: <a href="${data.maps.googleMaps}" target="_blank">Click-here</a></strong></li>
    </ul>
    `;

    return html_generieren_info;
}

function daten_ausgeben(data){
    document.querySelector(".county-info > ul").remove();
    document.querySelector(".county-info > .bild").remove();
    document.querySelector(".county-info").insertAdjacentHTML("afterbegin", html_generieren_info(data));
}

/**
 * 
 * @param {API Daten} api_liste 
 * aus ein eingabeformular input holen und Land ausgeben lassen
 */
function hole_daten(api_liste){
    document.querySelector(".form > #eingabeform").addEventListener("submit", (data)=>{
        data.preventDefault();
        
        let condition = false;

        for(let i = 0; i < api_liste.length; i++){
            if((api_liste[i].name.common).toLowerCase() === (data.target.elements.County_input.value).toLowerCase()){
                daten_ausgeben(api_liste[i]);
                condition = true;
            }
        }

        if(!condition){alert("Not Found. Make sure you write your Country in English.")};
        data.target.reset();
    })
}

api();