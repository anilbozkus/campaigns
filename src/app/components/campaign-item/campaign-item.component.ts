import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignService } from 'src/app/create-campaign/campaign.service';

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

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
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
