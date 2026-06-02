# Frontend

## Architecture

- Angular is used for UI. 
- State management: [Signal Store](https://ngrx.io/guide/signals/signal-store)
- Internationalization: [@ngx-translate](https://github.com/ngx-translate) (inside the public/locale folder)
- Styling: [Angular Material](https://material.angular.dev/)
- Testing: [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io)

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

### Building for production

```bash
npm run build
```

The build will be located in the `dist/` directory. 

### Running unit tests

```bash
npm run test
```

## Deployment

```bash
npm run build
npm run deploy
```

**Important**: Images should be referenced in the format: "images/..."  or "../../....".