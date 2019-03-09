import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { OrganizerNamePipe } from './organizer-name/organizer-name';
@NgModule({
  declarations: [ThumbnailPipe,
    OrganizerNamePipe],
  imports: [],
  exports: [ThumbnailPipe,
    OrganizerNamePipe]
})
export class PipesModule {}
