import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), AsyncPipe, BrowserModule, CommonModule, ReactiveFormsModule]
};
