"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ConfigProvider {
    constructor() {
        this.clientId = '';
        this.token = '';
        this.language = 'en';
        this.command = '!ttt';
        this.CONFIG_PATH = path_1.default.join(process.cwd(), 'config', 'config.json');
        this.initializeFromFile();
        this.initializeFromEnv();
        this.verifyValues();
    }
    initializeFromFile() {
        if (fs_1.default.existsSync(this.CONFIG_PATH)) {
            const savedConfig = require(this.CONFIG_PATH);
            Object.keys(savedConfig).forEach(field => {
                this[field] = savedConfig[field];
            });
        }
    }
    initializeFromEnv() {
        Object.keys(process.env)
            .filter(key => this[ConfigProvider.camelCase(key)] !== undefined)
            .forEach(key => {
            const camelCaseKey = ConfigProvider.camelCase(key);
            const value = process.env[key];
            let newValue;
            if (camelCaseKey === 'language')
                return;
            switch (typeof this[camelCaseKey]) {
                case 'string':
                case 'object':
                default:
                    newValue = value.toString();
                    break;
                case 'number':
                    newValue = parseFloat(value);
                    break;
                case 'boolean':
                    newValue = value.toLowerCase() === 'true';
                    break;
            }
            this[camelCaseKey] = newValue;
        });
    }
    verifyValues() {
        const emptyKey = Object.keys(this).find(key => this[key] === '');
        if (emptyKey) {
            throw new Error(`Config key ${emptyKey} must be defined`);
        }
    }
    static camelCase(str) {
        return str.toLowerCase().replace(/_([a-z])/g, g => {
            return g[1].toUpperCase();
        });
    }
}
exports.default = ConfigProvider;
