"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const I18nProvider_1 = __importDefault(require("./I18nProvider"));
const provider = new I18nProvider_1.default();
const getLanguage = () => provider.getLanguage();
const setLanguage = (locale) => provider.setLanguage(locale);
const translate = (id, replacements) => provider.translate(id, replacements);
const __ = (id, replacements) => provider.__(id, replacements);
exports.default = { getLanguage, setLanguage, translate, __ };
