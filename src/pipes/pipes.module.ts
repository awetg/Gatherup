import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CommentsPipe } from './comments/comments';
import { ExcerptPipe } from './excerpt/excerpt';
import { UserInfoPipe } from './user-info/user-info';
import { UserDbPipe } from './user-db/user-db';
import { ItemFilterPipe } from './item-filter/item-filter';
import { FavoriteFilterPipe } from './favorite-filter/favorite-filter';

@NgModule({
  declarations: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe,
    ItemFilterPipe,
    FavoriteFilterPipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    ExcerptPipe,
    CommentsPipe,
    UserInfoPipe,
    UserDbPipe,
    ItemFilterPipe,
    FavoriteFilterPipe
  ]
})
export class PipesModule {}
