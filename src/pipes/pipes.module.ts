import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';
import { UserInfoPipe } from './user-info/user-info';
import { UserDbPipe } from './user-db/user-db';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe
  ]
})
export class PipesModule {}
