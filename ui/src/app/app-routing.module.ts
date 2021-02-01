import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingGuard } from './guards/meeting.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MeetingRoomWallComponent } from './pages/meeting-room-wall/meeting-room-wall.component';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'crear', component: ScheduleComponent },
  {
    path: 'reu/:id',
    component: MeetingRoomComponent,
    canActivate: [MeetingGuard]
  },
  {
    path: 'muro',
    component: MeetingRoomWallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
