import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { OrganizerNamePipe } from './organizer-name/organizer-name';
import { CommentsPipe } from './comments/comments';
@NgModule({
  declarations: [ThumbnailPipe,
    OrganizerNamePipe,
    CommentsPipe],
  imports: [],
  exports: [ThumbnailPipe,
    OrganizerNamePipe,
    CommentsPipe]
})
export class PipesModule {}
