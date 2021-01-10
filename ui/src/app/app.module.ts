import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ScheduleWizardModule } from './schedule-wizard/schedule-wizard.module';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ScheduleWizardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
