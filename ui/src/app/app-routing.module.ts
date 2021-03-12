import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingGuard } from './guards/meeting.guard';
import { MeetingCheckoutComponent } from './pages/meeting-checkout/meeting-checkout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MeetingCheckinComponent } from './pages/meeting-checkin/meeting-checkin.component';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'crear', component: ScheduleComponent },
  {
    path: 'reu/checkin',
    component: MeetingCheckinComponent
  },
  {
    path: 'reu/checkout',
    component: MeetingCheckoutComponent
  },
  {
    path: 'reu/:id',
    component: MeetingRoomComponent,
    canActivate: [MeetingGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
