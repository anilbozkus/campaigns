import { Component, OnInit, HostListener  } from '@angular/core';
import { CampaignService } from '../create-campaign/campaign.service';

export interface Campaign {
  id: string;
  campaignTitle: string;
  campaignDescr: string;
  campaignScore: number;
  campaignDate: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaigns!: Campaign[];
  screenWidth!: number;

  largeScreenSize = 760;
  mediumScreenSize = 435;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }
  
  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.campaigns = this.campaignService.getCampaignsFromLocalStorage();
  }

  handleCampaignDeleted(campaignId: string) {
    this.campaigns = this.campaigns.filter(campaign => campaign.id !== campaignId);
  }
  
  isScreenSizeLarge(): boolean {
    return this.screenWidth >= this.largeScreenSize;
  }

  isScreenSizeSmall(): boolean {
    return this.screenWidth < this.mediumScreenSize;
  }

}
