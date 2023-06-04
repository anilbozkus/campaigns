import { Injectable, OnInit } from '@angular/core';

export interface Campaign {
    id: string;
    campaignTitle: string;
    campaignDescr: string;
    campaignScore: number;
    campaignDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaigns: Campaign[] = [];

  constructor() {}


  saveCampaign(campaign: Campaign) {
    const campaigns = this.getCampaignsFromLocalStorage();

    campaigns.push(campaign);

    this.saveCampaignsToLocalStorage(campaigns);
  }

  getCampaigns(): Campaign[] {
    return this.getCampaignsFromLocalStorage();
  }

  updateCampaign(campaign: Campaign) {
    this.campaigns = this.getCampaigns();
    const index = this.campaigns.findIndex(c => c.id === campaign.id);
    if (index !== -1) {
      this.campaigns[index] = campaign;
      this.saveCampaignsToLocalStorage(this.campaigns);
    }
  }

  deleteCampaign(id: string) {
    this.campaigns = this.getCampaigns();
    const index = this.campaigns.findIndex(campaign => campaign.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
      this.saveCampaignsToLocalStorage(this.campaigns);
    }
  }
  private refreshCampaignList() {
    this.campaigns = this.getCampaigns();
  }

  public getCampaignsFromLocalStorage(): Campaign[] {
    const campaignsJSON = localStorage.getItem('campaigns');
    return campaignsJSON ? JSON.parse(campaignsJSON) : [];
  }

  public saveCampaignsToLocalStorage(campaigns: Campaign[]) {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }
}
