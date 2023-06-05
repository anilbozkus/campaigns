import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignService } from 'src/app/create-campaign/campaign.service';
import { UpdateCampaignComponent } from '../update-campaign/update-campaign.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Campaign {
  id: string;
  campaignTitle: string;
  campaignDescr: string;
  campaignScore: number;
  campaignDate: string;
}

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.scss']
})
export class CampaignItemComponent implements OnInit {

  @Input() campaign!: Campaign;
  @Output() campaignDeleted = new EventEmitter<string>();

  constructor(
    private campaignService: CampaignService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit() {
  }

  openUpdateCampaignModal(campaign: Campaign): void {
    const dialogRef = this.dialog.open(UpdateCampaignComponent, {
      width: '400px',
      data: campaign
    });

    dialogRef.afterClosed().subscribe(updatedCampaign => {
      if (updatedCampaign) {
        this.updateSelectedCampaign(updatedCampaign);
      }
    });
  }

  private updateSelectedCampaign(updatedCampaign: Campaign): void {
    this.campaignService.updateCampaign(updatedCampaign);
    this.campaign = updatedCampaign;

    this.snackBar.open('Campaign successfully updated', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['custom-success-bar']
    });
  }

  increaseScore() {
    this.campaign.campaignScore++;
    this.updateLocalStorage();
  }

  decreaseScore() {
    if(this.campaign.campaignScore > 0){
      this.campaign.campaignScore--;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    this.campaignService.updateCampaign(this.campaign);
  }

  updateCampaign() {

  }

  deleteCampaign() {
    this.campaignService.deleteCampaign(this.campaign.id);
    this.campaignDeleted.emit(this.campaign.id); 
  }
}
