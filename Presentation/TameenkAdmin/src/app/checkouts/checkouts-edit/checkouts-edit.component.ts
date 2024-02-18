import { Component, OnInit } from '@angular/core';
import { CheckoutsService } from '../../core/services/checkouts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutsModel } from '../checkouts-model';
import { LocalizationService } from '../../core';
import { ImageModel } from '../image';

@Component({
  selector: 'app-checkouts-edit',
  templateUrl: './checkouts-edit.component.html',
  styleUrls: ['./checkouts-edit.component.css']
})
export class CheckoutsEditComponent implements OnInit {
  checkoutsModel: CheckoutsModel = new CheckoutsModel();

  isEnglish: boolean;
  showImageFront = false;
  imageFrontToUpload = '';
  showImageBack = false;
  imageBackToUpload = '';
  showImageBody = false;
  imageBodyToUpload = '';
  showImageRight = false;
  imageRightToUpload = '';
  showImageLeft = false;
  imageLeftToUpload = '';

  oldEmail;
  editEmail: boolean;


  constructor(private _checkoutsService: CheckoutsService,
    private _router: Router,
    private route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode == 'en' ? true : false;
    const referenceId = this.route.snapshot.paramMap.get('referenceId');
    this._checkoutsService.getCheckoutDetails(referenceId).subscribe(checkout => {
      this.checkoutsModel = checkout.data;
      if (this.checkoutsModel.imageFront == null) {
        this.checkoutsModel.imageFront = new ImageModel();
      }
      if (this.checkoutsModel.imageBack == null) {
        this.checkoutsModel.imageBack = new ImageModel();
      }
      if (this.checkoutsModel.imageBody == null) {
        this.checkoutsModel.imageBody = new ImageModel();
      }
      if (this.checkoutsModel.imageRight == null) {
        this.checkoutsModel.imageRight = new ImageModel();
      }
      if (this.checkoutsModel.imageLeft == null) {
        this.checkoutsModel.imageLeft = new ImageModel();
      }
 
      this.oldEmail = this.checkoutsModel.email;
      this.editEmail = (this.checkoutsModel && this.checkoutsModel.policyStatus && this.checkoutsModel.policyStatus.id != 4) ? true : false;
      console.log('ngOnInit --> this.editEmail');
      console.log(this.editEmail);
    }, (error) => error);
  }

  handleFileInput(e, imageId, files) {
    if (files[0] != null) {
      if (imageId === 'front') {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
            this.checkoutsModel.imageFront.newImageData = btoa(fileReader.result.toString());
            this.imageFrontToUpload = btoa(fileReader.result.toString());
          }
        };
        this.showImageFront = true;
      } else if (imageId === 'back') {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
            this.checkoutsModel.imageBack.newImageData = btoa(fileReader.result.toString());
           this.imageBackToUpload = btoa(fileReader.result.toString());
          }
        };
        this.showImageBack = true;
      } else if (imageId === 'body') {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
         if (fileReader.DONE) {
            this.checkoutsModel.imageBody.newImageData = btoa(fileReader.result.toString());
            this.imageBodyToUpload = btoa(fileReader.result.toString());
          }
        };
        this.showImageBody = true;
      } else if (imageId === 'right') {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
            this.checkoutsModel.imageRight.newImageData = btoa(fileReader.result.toString());
            this.imageRightToUpload = btoa(fileReader.result.toString());
         }
        };
        this.showImageRight = true;
      } else if (imageId === 'left') {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
            this.checkoutsModel.imageLeft.newImageData = btoa(fileReader.result.toString());
            this.imageLeftToUpload = btoa(fileReader.result.toString());
          }
        };
        this.showImageLeft = true;
      }
    }
  }

  ClearImage(imageId) {
    if (imageId === 'front') {
      this.showImageFront = false;
      this.imageFrontToUpload = null;
      this.checkoutsModel.imageFront.newImageData = null;
    } else if (imageId === 'back') {
      this.showImageBack = false;
      this.imageBackToUpload = null;
      this.checkoutsModel.imageBack.newImageData = null;
    } else if (imageId === 'body') {
      this.showImageBody = false;
      this.imageBodyToUpload = null;
      this.checkoutsModel.imageBody.newImageData = null;
    } else if (imageId === 'right') {
      this.showImageRight = false;
      this.imageRightToUpload = null;
      this.checkoutsModel.imageRight.newImageData = null;
    } else if (imageId === 'left') {
      this.showImageLeft = false;
      this.imageLeftToUpload = null;
      this.checkoutsModel.imageLeft.newImageData = null;
    }
  }

  AtLeastOneImage() {
    if (this.checkoutsModel.imageFront.newImageData || this.checkoutsModel.imageBack.newImageData ||
        this.checkoutsModel.imageBody.newImageData || this.checkoutsModel.imageRight.newImageData ||
        this.checkoutsModel.imageLeft.newImageData) {
      return true;
    } else {
      return false;
    }
  }

  OnSubmit() {
    const isValid = this.AtLeastOneImage();
    if (isValid === false) {
      const errorMessageEn = 'Please upload at least one image';
      const errorMessageAr = 'برجاء تحميل صورة واحدة علي الأقل';
      this._toastrService.error(this.isEnglish ? errorMessageEn : errorMessageAr);
      return;
    }

    this._checkoutsService.uploadCheckOutImages(this.checkoutsModel).subscribe(data => {
      if (data.data.errorCode === 1) {
        this._toastrService.success(data.data.errorDescription);
        this.checkoutsModel = new CheckoutsModel();
        const referenceId = this.route.snapshot.paramMap.get('referenceId');
        this._checkoutsService.getCheckoutDetails(referenceId).subscribe(checkout => {
          this.checkoutsModel = checkout.data;
        }, (error) => error);
      } else {
        this._toastrService.error(data.data.errorDescription);
      }
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
    });
  }

  UpdateEmail() {
    let pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let validEmail = pattern.test(this.checkoutsModel.email);

    if(this.oldEmail === this.checkoutsModel.email) {
      this._toastrService.info('Please change email first');
    } else if(!this.checkoutsModel.email) {
      this._toastrService.error('Email is empty, please enter one first');
    } else if(!validEmail) {
      this._toastrService.error('Please enter valid email');
    } else {
      this._checkoutsService.UpdateCheckoutEmail(this.checkoutsModel).subscribe(data => {
        if (data.data.errorCode === 1) {
          this._toastrService.success(data.data.errorDescription);
          this.checkoutsModel = new CheckoutsModel();
          const referenceId = this.route.snapshot.paramMap.get('referenceId');
          this._checkoutsService.getCheckoutDetails(referenceId).subscribe(checkout => {
            this.checkoutsModel = checkout.data;
          }, (error) => error);
        } else {
          this._toastrService.error(data.data.errorDescription);
        }
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }

}
