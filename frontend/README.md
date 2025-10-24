# Frontend

All the frontend files are placed inside /frontend folder.

## Architecture

The project is built with Angular 20 and uses the modern architecture optimized for scalability and maintability. 
- State management
  - The app state is managed using [@ngrx/component-store](https://ngrx.io/guide/component-store)
- Standalone components
  - The app is implemented entirely using [Angular standalone components](https://v17.angular.io/guide/standalone-components)
  - Communication between components is handled via state management
- Routing structure:
  - ImageUploadComponent - displays file input and drag&drop upload area (appImageUpload directive)
  - ImageProcessingComponent - shows steps of enhancing image pipelines, including error state
  - ImageResultComponent - displays the enhanced image with before/after slider and filter controls. Route is reachable only if original and enhanced images are available, controlled by ImageGuard
- API integration
  - All API calls are handled through ImageApiService
- Internationalization
  - The app supports localization via [@ngx-translate](https://github.com/ngx-translate). The translation files are stored inside the public/locale folder
- Styling
  - Global styles are defined in src/styles.scss
  - The app uses [Angular Material](https://material.angular.dev/) for UI components
- Code quality
  - Eslint is configured for static code analysis
  - Unit testing is implemented using [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io)


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
ng build
```

The build will be located in the `dist/` directory. 

### Running unit tests

```bash
ng test
```

Runs unit tests via Karma and Jasmine

