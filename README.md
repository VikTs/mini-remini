# MiniRemini

![Angular](https://img.shields.io/badge/Angular-21.2-red)
![NodeJs](https://img.shields.io/badge/NodeJs-24.12-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-green)
![Python](https://img.shields.io/badge/Python-3.10-blue)

Mini-Remini is a web application for enhancing the image. It was inspired by [Remini](https://app.remini.ai/).

## Features
- Upload the image using file selection or drag and drop
- Apply filters to the image:
  - Photo restoration using [GFPGAN](https://github.com/TencentARC/GFPGAN) AI model
  - Face beauty using [Insightface](https://www.insightface.ai/) and [OpenCV](https://pypi.org/project/opencv-python/)
  - Color correction
- View the filtered image in the before/after slider
- Download the enhanced image

## Project structure

This project consists of two parts:
- [Frontend (Angular)](./frontend/README.md) - UI for uploading, processing and displaying the image
- [Backend (Python)](./backend/README.md) - API server that handles image enhancement using AI

## Getting started

```bash
git clone https://github.com/VikTs/mini-remini.git
```
For detailed setup instructions:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## Live demo
The live demo is available here: https://vikts.github.io/mini-remini/

> **Note**: The online demo may currently be unavailable.
> 
> The backend is hosted on **Render (free tier)** which provides limited resources.
> Since the app performs **AI-based image processing**, some requests may take a long time to complete or timeout.
> For the best results and functionality it`s recommended to **run the project locally**