import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilderExtended } from './components/my-form/FormBuilderExtended';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ComponentErrorMapper } from './components/controls/component-error-mapper';

import {} from '@angular/material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideAnimationsAsync(),

    provideAnimations(),

    provideNoopAnimations(),

    provideNativeDateAdapter(),

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: FormBuilderExtended, useClass: FormBuilderExtended },
    { provide: UntypedFormBuilder, useClass: FormBuilderExtended },
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'noop' },
    { provide: ComponentErrorMapper, useClass: ComponentErrorMapper }
  ]
};
