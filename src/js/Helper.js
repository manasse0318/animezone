"use strict";

export class Helper{
    static truncateText(text, maxLength = 100){
        if (!text) return "";
        return text.length > maxlength ? text.slice(0, maxLength) + "..." : text;
    }
    static formatScore(score){
        return score ?? "N/a";
    }
}