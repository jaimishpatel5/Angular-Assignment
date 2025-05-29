import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// ✅ ESM-compatible dynamic context for specs
const context = (import.meta as any).webpackContext('./', {
  recursive: true,
  regExp: /\.spec\.ts$/,
});
context.keys().forEach(context);
