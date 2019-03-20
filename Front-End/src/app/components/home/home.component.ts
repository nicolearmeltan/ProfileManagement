import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: Profile[];
  page: Number;
  pageCount: Number;
  total: Number;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getProfiles()
  }

  getProfiles(): void{
    this.profileService.getProfiles()
    .subscribe((res: Profile[]) => { 
      this.profiles = res["data"], 
      this.page = res["page"], 
      this.pageCount= res["pageCount"],
      this.total = res["total"];
      console.log(this.total)
    });

  }

}
