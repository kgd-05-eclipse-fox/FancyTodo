const jikanjs  = require('jikanjs'); // Uses per default the API version 3

jikanjs.settings.version = 2; // changes the API version to 2
jikanjs.settings.setBaseURL('https://api.jikan.moe/v2'); // sets the API Base URL
jikanjs.settings.setBaseURL('https://api.jikan.moe/v2', 2); // sets also the api version

class AnimeController{

    static async getDataAnime(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static getdata(req, res, next){
        jikanjs.loadAnime(19815, 'episodes')
        .then((response) => {
            response.episodes.forEach(element => {
                console.log(`${element.episode_id}: ${element.title} - ${element.title_romanji} - ${element.title_japanese}`);
            })
        }).catch((err) => {
            console.error(err); // in case a error happens
        });
    }
}

module.exports = AnimeController