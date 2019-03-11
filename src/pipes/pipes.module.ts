import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';
import { UserInfoPipe } from './user-info/user-info';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe
  ]
})
export class PipesModule {}
