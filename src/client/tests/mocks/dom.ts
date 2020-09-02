import { JSDOM } from 'jsdom';

const dom: any = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
