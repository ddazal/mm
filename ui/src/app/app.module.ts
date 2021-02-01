import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MeetingWizardModule } from './meeting-wizard/meeting-wizard.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MeetingRoomWallComponent } from './pages/meeting-room-wall/meeting-room-wall.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent, ScheduleComponent, MeetingRoomWallComponent],
  imports: [
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
