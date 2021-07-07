const fs = require('fs');
const axios = require('axios');


class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapitalized() {
        
        this.history = this.history.map(location => {
            return location.split(' ')
                               .map(place => {
                                   let firstLetter = place[0].toUpperCase();
                                   return place.replace(/[a-z]/i, firstLetter);   
                                })
                                .join(' ');
        });

        return this.history;
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY || '',
            'units': 'metric'
        }
    }

    async city(place = '') {

        // HTTP Request
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            
            return resp.data.features.map(place => ({

                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
                
            }));
            
            
        } catch (error) {
            return [];
        }


    }

    async cityWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            });

            const resp = await instance.get();

            return {
                desc: resp.data.weather[0].description,
                temp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    addToHistory(place = '') {

        if (this.history.includes(place.toLowerCase)) {
            return;
        }

        this.history = this.history.splice(0, 5);

        this.history.unshift(place.toLowerCase());    

        // Save in DB
        this.saveDB();
        
    }

    saveDB() {
        const payload = {
            history: this.history
        }
        
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {

        if (!fs.existsSync(this.dbPath)) {
            return null;
        }
        
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.history = [...data.history]
    }

}


module.exports = Searches;