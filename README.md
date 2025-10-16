# MiniRemini
![Angular](https://img.shields.io/badge/Angular-20.3-red)
![NodeJs](https://img.shields.io/badge/NodeJs-22.19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-green)
![Python](https://img.shields.io/badge/Python-3.14-blue)

Mini-Remini is a web application for adding filters to the image. It was inspired by [Remini](https://app.remini.ai/).

A live version is available [right here](https://vikts.github.io/mini-remini/)

This project is currently in development and uses mocked BE responses. 

## Features
- Upload the image using file selection or drag and drop
- Process the image with mocked steps
- Choose the filters and apply them to the image
- View the filtered image in the before/after slider

## Upcoming features
- Create a simple Backend with Python + FastAPI:
  - POST /upload - convert image File to url
  - POST /applyFilters - apply filters to the image using Pillow library
- Integrate the open source AI model [GFPGAN](https://github.com/TencentARC/GFPGAN):
  - POST /enhance - enhance the image with the model
  - Add filters: "Restore old photo", "Increase the sharpness"
- Add download feature

## Frontend architecture
All the frontend files are placed inside /frontend folder.

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
  - All API calls are mocked and handled through ImageApiService
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
- [Python 3.10+](https://www.python.org/downloads/)

### Installation and launching

```bash
git clone https://github.com/VikTs/mini-remini.git
```
Terminal 1
```bash
cd mini-remini/frontend
npm install
npm run start
```

Terminal 2

- Windows
```bash
cd mini-remini/backend
python -m venv venv
./venv/Scripts/activate.bat
pip install -r requirements.txt
./app/start.bat
```

- Linux/MacOS
```bash
cd mini-remini/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Visit `http://localhost:4200/`. 
The app will automatically reload on changes.

### Building Frontend for production

```bash
ng build
```

The build will be located in the `dist/` directory. 

### Running Frontend unit tests

```bash
ng test
```

Runs unit tests via Karma and Jasmine

