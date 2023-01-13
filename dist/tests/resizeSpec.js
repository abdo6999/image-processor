"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resize_1 = require("../utilities/resize");
const fs = require("fs");
const gallery_1 = require("../routes/gallery");
describe('utilitie resize file test', () => {
    it('should be true if the resize work as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)('encenadaport.jpg', 500, 600);
        expect(fs.existsSync(gallery_1.assets.thumb('encenadaport.jpg', 500, 600))).toBeTruthy();
    }));
});
