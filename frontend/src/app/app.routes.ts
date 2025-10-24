import { Routes } from '@angular/router';
import { ImageGuard } from './core/guards/image.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/components/image-upload/image-upload.component').then(m => m.ImageUploadComponent)
    },
    {
        path: 'processing',
        loadComponent: () => import('./features/components/image-processing/image-processing.component').then(m => m.ImageProcessingComponent)
    },
    {
        path: 'result',
        canActivate: [ImageGuard],
        loadComponent: () => import('./features/components/image-result/image-result.component').then(m => m.ImageResultComponent)
    },
];
