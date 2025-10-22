# MiniRemini ![v2.0.0](https://img.shields.io/badge/v2.0.0-gray)

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![NodeJs](https://img.shields.io/badge/NodeJs-22.19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-green)
![Python](https://img.shields.io/badge/Python-3.10-blue)

Mini-Remini is a web application for enhancing the image. It was inspired by [Remini](https://app.remini.ai/).

A live version for v1 is available [right here](https://vikts.github.io/mini-remini/)

## Features
- Upload the image using file selection or drag and drop
- Process the image with [GFPGAN](https://github.com/TencentARC/GFPGAN)
- Choose the filters and apply them to the image
- View the filtered image in the before/after slider
- Download the enhanced image

## Upcoming features
### Next version
- Update filters:
  - Add the filters for GFPGAN model: upscale, arch, bg_upsampler
  - Handle color filters on BE
- Deploy BE and AI model:
  - Deploy BE to Render
  - Upload AI model to Hugging Face Hub

### Later versions
- Image caching:
  - Get image from the cache if it wasn't found
- Use websockets for processing the image:
  - BE return the statuses
- Store the image on BE:
  - Use image id for the requests
- Zooming the image with canvas
- Create own AI model based on GFPGAN

## Project structure

This project consists of two parts:
- [Frontend (Angular)](./frontend/README.md) - UI for uploading, processing and displaying the image
- [Backend (Python)](./backend/README.md) - API server that handles image enhancement using GFPGAN

## Getting started

```bash
git clone https://github.com/VikTs/mini-remini.git
```
For detailed setup instructions:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)