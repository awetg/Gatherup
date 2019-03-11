import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe
  ]
})
export class PipesModule {}
