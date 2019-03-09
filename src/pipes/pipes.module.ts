import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { ExcerptPipe } from './excerpt/excerpt';
@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe
  ]
})
export class PipesModule {}
