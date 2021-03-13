import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StepDirective } from '../../directives/step.directive';
import { StepItem } from '../../models/step-item.model';
import { StepComponent } from '../../models/step-component.model';
import { StepService } from '../../services/step.service';
import { MeetingData } from '../../models/meeting-data.model';
import { WizardService } from '../../../services/wizard.service';
import { Router } from '@angular/router';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';

@Component({
  selector: 'app-meeting-wizard',
  templateUrl: './meeting-wizard.component.html',
})
export class MeetingWizardComponent implements OnInit {
  private steps: StepItem[];
  private currentRef: StepComponent;
  private wizardData: MeetingData;

  currentStepIndex = 0;
  loading = false;
  stepErrorMessage: string;

  @ViewChild(StepDirective, { static: true }) stepHost: StepDirective;

  constructor(
    private stepService: StepService,
    private wizardService: WizardService,
    private cfr: ComponentFactoryResolver,
    private authMeetingService: AuthMeetingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.steps = this.stepService.getSteps();
    this.renderComponent();
  }

  get totalSteps(): number {
    return this.steps.length;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex + 1 === this.steps.length;
  }

  goBack(): void {
    this.currentStepIndex--;
    this.renderComponent();
  }

  async goNext(): Promise<void> {
    const { isValid, data, error } = this.currentRef.submit();
    if (!isValid) {
      this.stepErrorMessage = error;
      return;
    }
    this.wizardService.updateData({ ...this.wizardData, ...data });

    if (this.isLastStep) {
      this.loading = true;
      const meetingData = this.wizardService.getData();
      const meeting = await this.wizardService.scheduleMeeting(meetingData);
      const options = await this.wizardService.addMeetingOptions(meeting.id, meetingData.options);
      const redirectUrl = '/reu/' + meeting.privateId
      this.authMeetingService.redirectUrl = redirectUrl
      this.authMeetingService.meetingAccessId = meeting.privateId
      this.authMeetingService.verifyAccessCode(meeting.accessCode)
      return
    }

    this.currentStepIndex++;
    this.renderComponent();
  }

  renderComponent(): void {
    const stepItem = this.steps[this.currentStepIndex];

    const componentFactory = this.cfr.resolveComponentFactory(
      stepItem.component
    );

    const viewContainerRef = this.stepHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<StepComponent>(
      componentFactory
    );
    // read and pass wizardData
    this.stepErrorMessage = '';
    this.wizardData = this.wizardService.getData();
    componentRef.instance.data = this.wizardData;
    this.currentRef = componentRef.instance;
  }
}
