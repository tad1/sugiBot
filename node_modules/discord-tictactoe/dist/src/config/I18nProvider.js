"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class I18nProvider {
    constructor() {
        const localesPath = path_1.default.join(__dirname, '..', '..', '..', 'config', 'locales');
        const files = fs_1.default.readdirSync(localesPath);
        i18n_1.default.configure({
            locales: files.map(file => path_1.default.basename(file, '.json')),
            defaultLocale: 'en',
            directory: localesPath,
            objectNotation: true,
            updateFiles: false
        });
    }
    setLanguage(locale) {
        i18n_1.default.setLocale(locale);
    }
    __(id, replacements) {
        return this.translate(id, replacements);
    }
    getLanguage() {
        return i18n_1.default.getLocale();
    }
    translate(id, replacements) {
        return i18n_1.default.__mf(id, replacements);
    }
}
exports.default = I18nProvider;
