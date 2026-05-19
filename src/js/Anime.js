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
        this.synopsis = data.synopsis;
        this.genres = data.genres ??[];
    }
    get shortSynopsis(){
        if (!this.synopsis) return "No synopsis available";
        return this.synopsis.length > 120
            ? this.synopsis.slice(0, 120) + "..."
            : this.synopsis;
    }
}