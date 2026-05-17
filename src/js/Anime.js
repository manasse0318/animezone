"use strict";

export class Anime{
    constructor(data){
        this.id = data.mal_id;
        this.title = data.title;
        this.score = data.score;
        this.episodes = data.episodes;
        this.type = data.type;
        this.status = data.status;
        this.image = data.images.jpg.image_url;
        this.syopsis = data.synopsis;
    }
    get shortSynopsis(){
        if (!this.syopsis) return "No synopsis available";
        return this.syopsis.length > 120
            ? this.syopsis.slice(0, 120) + "..."
            : this.syopsis;
    }
}