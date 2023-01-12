"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("../utilities/get");
const gallery_1 = require("../routes/gallery");
describe('utilitie get file test', () => {
    it('should be true if the directory exist ', () => {
        const data = (0, get_1.getDir)(gallery_1.assets.images());
        expect(data).toBeTruthy();
    });
    it('should get files name in the directory', () => {
        const data = (0, get_1.getDir)(gallery_1.assets.images());
        expect(data).toEqual([
            { path: '/assets/images/encenadaport.jpg' },
            { path: '/assets/images/fjord.jpg' },
            { path: '/assets/images/icelandwaterfall.jpg' },
            { path: '/assets/images/palmtunnel.jpg' },
            { path: '/assets/images/santamonica.jpg' },
            { path: '/assets/images/unnamed.png' }
        ]);
    });
    it('should be true if the file exist', () => {
        const data = (0, get_1.getFile)(gallery_1.assets.source);
        expect(data).toBeTruthy();
    });
});
