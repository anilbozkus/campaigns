// update-campaign.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Campaign {
  id: string;
  campaignTitle: string;
  campaignDescr: string;
  campaignScore: number;
  campaignDate: string;
}

@Component({
  selector: 'app-update-campaign',
  templateUrl: './update-campaign.component.html',
  styleUrls: ['./update-campaign.component.scss']
})
export class UpdateCampaignComponent {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Campaign,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      campaignTitle: [data.campaignTitle, Validators.required],
      campaignDescr: [data.campaignDescr, Validators.required],
      campaignScore: [data.campaignScore],
      campaignDate: [data.campaignDate]
    });
  }

  save(): void {
    if (this.updateForm.valid) {
      const updatedCampaign: Campaign = {
        id: this.data.id,
        campaignTitle: this.updateForm.value.campaignTitle,
        campaignDescr: this.updateForm.value.campaignDescr,
        campaignScore: this.updateForm.value.campaignScore,
        campaignDate: this.updateForm.value.campaignDate
      };
      this.dialogRef.close(updatedCampaign);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
