import { Injectable } from '@angular/core';

export interface Campaign {
    campaignTitle: string;
    campaignDescr: string;
    campaignScore: string;
    campaignDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor() { }

  saveCampaign(campaign: Campaign) {
    const campaigns = this.getCampaignsFromLocalStorage();

    campaigns.push(campaign);

    this.saveCampaignsToLocalStorage(campaigns);
  }

  getCampaigns(): Campaign[] {
    return this.getCampaignsFromLocalStorage();
  }

  private getCampaignsFromLocalStorage(): Campaign[] {
    const campaignsJSON = localStorage.getItem('campaigns');
    return campaignsJSON ? JSON.parse(campaignsJSON) : [];
  }

  private saveCampaignsToLocalStorage(campaigns: Campaign[]) {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }
}
