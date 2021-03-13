import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MeetingWizardModule } from './meeting-wizard/meeting-wizard.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MeetingCheckinComponent } from './pages/meeting-checkin/meeting-checkin.component';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { MeetingCheckoutComponent } from './pages/meeting-checkout/meeting-checkout.component';
import { MeetingRoomInfoComponent } from './components/meeting-room-info/meeting-room-info.component';
import { ModalUpdateMeetingInfoComponent } from './components/modal-update-meeting-info/modal-update-meeting-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ScheduleComponent,
    MeetingCheckinComponent,
    MeetingRoomComponent,
    MeetingCheckoutComponent,
    MeetingRoomInfoComponent,
    ModalUpdateMeetingInfoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    MeetingWizardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
