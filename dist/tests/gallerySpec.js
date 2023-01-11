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
const supertest = require("supertest");
const index_1 = require("../index");
const request = supertest(index_1.default);
describe('Test gallery responses', () => {
    it('gets the gallery endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/gallery');
        expect(response.status).toBe(200);
    }));
    it('gets the gallery image with invalid query endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/gallery/images');
        expect(response.status).toBe(200);
    }));
    it('gets the gallery image with valid query endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/gallery/images?filename=icelandwaterfall.jpg&width=1920&height=1273');
        expect(response.status).toBe(200);
    }));
});
