import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { OrganizerNamePipe } from './organizer-name/organizer-name';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    OrganizerNamePipe,
    CommentsPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    OrganizerNamePipe,
    CommentsPipe
  ]
})
export class PipesModule {}
