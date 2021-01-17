import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MeetingWizardModule } from './meeting-wizard/meeting-wizard.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent, ScheduleComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MeetingWizardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
