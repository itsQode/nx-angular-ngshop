import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';

import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
    imports: [CommonModule, ButtonModule, GalleriaModule, RouterModule.forChild(routes)],
    declarations: [BannerComponent, GalleryComponent, ContactComponent],
    exports: [BannerComponent, GalleryComponent]
})
export class UiModule {}
