import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';
import { UserInfoPipe } from './user-info/user-info';
import { UserDbPipe } from './user-db/user-db';
import { EventFilterPipe } from './event-filter/event-filter';
import { ItemFilterPipe } from './item-filter/item-filter';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe,
    EventFilterPipe,
    ItemFilterPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe,
    EventFilterPipe,
    ItemFilterPipe
  ]
})
export class PipesModule {}
