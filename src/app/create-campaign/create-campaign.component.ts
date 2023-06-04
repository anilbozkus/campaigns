import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})

export class CampaignComponent implements OnInit {
  campaignTitle!: string;
  descr!: string;
  campaignScore: number = 0;
  campaignDate!: string;
  showSuccessMessage!: boolean;
  campaignForm!: FormGroup;
  timer!: any

  constructor(private formBuilder: FormBuilder, private campaignService: CampaignService) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  initializeForm() {
    this.campaignForm = this.formBuilder.group({
      campaignTitle: ['', Validators.required],
      descr: ['', Validators.required],
      campaignScore: [0],
      campaignDate: [this.getCurrentDate()]
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveCampaign() {
    if (this.campaignForm.valid) {
      const campaignData = this.campaignForm.value;

      this.campaignService.saveCampaign(campaignData);

      this.showSuccessMessage = true;

      this.timer = setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } else {
      this.markFormGroupAsTouched(this.campaignForm);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
