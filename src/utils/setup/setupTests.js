import React from 'react';
import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountWrap, shallowWrap } from 'utils';

jest.spyOn(React, 'lazy');

configure({ adapter: new Adapter() });

/*
THE BELOW ARE ACCESSIBLE AND PREDEFINED FOR ALL *.TEST.JS FILES
WARNING: Due to the below being accessible to the global DOM,
         all *.test.js files will have custom rules for ESLint.
         Otherwise, ESLint will throw errors that the functions/
         modules are undefined because they are not explictly
         imported! See "overrides" in ".eslintrc" for more
         information.
*/
const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
global.shallow = shallowWrap;
global.mount = mountWrap;
// global.React = React;
global.BrowserRouter = require('react-router-dom').BrowserRouter;
global.Route = require('react-router-dom').Route;
global.Switch = require('react-router-dom').Switch;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
