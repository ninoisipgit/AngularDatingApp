import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('membertTabs', {static : true}) memberTabs: TabsetComponent

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
        const selectedTab = params['tab'];
        this.memberTabs.tabs[selectedTab>0 ? selectedTab : 0].active = true;

    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
    console.log(this.galleryImages);

  }

  getImages() {
    const imageUrls = [];

    for (const photo of this.user.photos) {
        imageUrls.push({
            small: photo.url,
            medium: photo.url,
            big: photo.url
        })
    }


    // for (let i = 0; i < this.user.photos.length; i++) {
    //   imageUrls.push({
    //     small: this.user.photos[i].url,
    //     medium: this.user.photos[i].url,
    //     big: this.user.photos[i].url,
    //     description: this.user.photos[i].description
    //   });
    // }
    return imageUrls;
  }

  // loadUser(){

  //     this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //         this.user = user;
  //         console.log(user);

  //     },error => {
  //         this.alertify.error(error);
  //     }
  //     );
  // }

  selectTab(tabId: number) {
    // alert(tabId);
    this.memberTabs.tabs[3].active = true;
    // const tabGroup = this.memberTabs;
    // if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

    // const tabCount = tabGroup.tabs.length;
    // tabGroup.selectedIndex = (tabGroup.selectedIndex + 1) % tabCount;
  }


}
