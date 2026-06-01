# Frontend

## Architecture

- Angular is used for UI. 
- State management
  - The app state is managed using [Signal Store](https://ngrx.io/guide/signals/signal-store)
- Standalone components
  - The app is implemented entirely using [Angular standalone components](https://v17.angular.io/guide/standalone-components)
- Internationalization
  - The app supports localization via [@ngx-translate](https://github.com/ngx-translate). The translation files are stored inside the public/locale folder
- Styling
  - Global styles are defined in src/styles.scss
  - The app uses [Angular Material](https://material.angular.dev/) for UI components
- Code quality
  - Eslint is configured for static code analysis
  - Testing is implemented using [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io)


## Getting started

### Prerequisites

- [NodeJs 22+](https://nodejs.org)
- [Angular CLI 17+](https://angular.dev/tools/cli)

### Instalation and launching

```bash
cd mini-remini/frontend
npm install
npm run start
```


Visit `http://localhost:4200/`. 
The app will automatically reload on changes.

### Building for production

```bash
npm run build
```

The build will be located in the `dist/` directory. 

### Running unit tests

```bash
npm run test
```

Runs unit tests via Karma and Jasmine

## Deployment

```bash
npm run build
npm run deploy
```

**Important**: Images should be referenced in the format: "images/..."  or "../../....".