import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';

const app = initializeApp({
  apiKey: "AIzaSyDG7a4Y0v3Bv1nVlGM-TnzN8sbsVhW8jj4",
authDomain: "hasura-5b183.firebaseapp.com",
projectId: "hasura-5b183",
storageBucket: "hasura-5b183.appspot.com",
messagingSenderId: "612478359134",
appId: "1:612478359134:web:6e5c525094a68ab47f06cf"
})

const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
  // No popupRedirectResolver defined
});
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), graphqlProvider,
    provideFirebaseApp(() =>
      app,
    ),
    provideAuth(() => auth),
  ]
};
