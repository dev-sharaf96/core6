import * as FileSaver from 'file-saver';

import { CommonResponse, LocalizationService } from '../core';
import { Component, OnInit } from '@angular/core';
import { OfferDeleteModel, OfferModel } from './offer-model';

import { OfferService } from './../core/services/offer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})

export class OfferListComponent implements OnInit {
  Offers: OfferModel[];
  model = new OfferModel();
  OffersCount;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  eventHolder;
  emptyStringValue = 'ــــــــــــــــــ';
  clicked = false;
  openPpUp = false;
  actionName = 'add';
  codeErrorDiv = false;
  codeErrorDivMessage = '';

  constructor(
    private _OfferService: OfferService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.initializeOffers();
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._OfferService.getOffersWithFilter(pageIndex, pageInSize).subscribe((data: CommonResponse<OfferModel[]>) => {
      if (data.data.length > 0) {
        this.Offers = data.data;
       
        for (var i = 0; i < this.Offers.length; i++) {
          this.Offers[i].oldImage = "data:image/png;base64," + this.Offers[i].image;
        }
      } else {
        this.Offers = [];
      }
      this.OffersCount = data.totalCount;
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  // exportCsv() {
  //   if (!this.loading) {
  //     this.loading = true;
  //     this._OfferService.getOffersAsExcel().subscribe((data) => {
  //       if (data.data) {
  //         FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
  //           'requests-Log.xlsx');
  //       }
  //       this.loading = false;
  //     }, (error: any) => {
  //       this.loading = false;
  //       if (error.errors) {
  //         error.errors.forEach(item => {
  //           this._toastrService.error(item.code, item.description);
  //         });
  //       }
  //     });
  //   }
  // }


  handleReUploadFileInput(e, files) {
  
    if (files[0] != null) {
      const ext = files[0].name.split('.').pop();
      if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
        this.clicked = false;
        //this.showReUploadPolicyFileValidation = false;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
            this.model.newImage = "data:image/png;base64," + btoa(fileReader.result.toString());
          }
        };
      } else {
        this.clicked = true;
        //this.showReUploadPolicyFileValidation = true;
        // this.reUploadPolicyFileValidationTextToAdd = (this.isEn) ? 'Please Upload pdf file only'
        //                                                          : 'فقط pdf من فضلك حمل ملف بصيغة';
      }
    } else {
      this.model.newImage = null;
    }
  }



  showOfferPopup(action, offer: any) {
    this.codeErrorDiv = false;
    this.codeErrorDivMessage = '';
    this.actionName = action;
    if (action === 'edit') {
      this.loading = true;
      this.isEdit = true;
      if (offer !=null ) {
        this.model = offer;
        this.openPpUp = true;
      } else {
        this.openPpUp = false;
      }
    }
    else {
      this.isEdit = false;
      this.openPpUp = true;
      this.model = new OfferModel();
    }
    this.loading = false;
  }

  closePoupUp() {
    this.openPpUp = false;
    this.clicked = false;
  }

  initializeOffers() {
    this.loading = true;
    this.Offers = [];
    this.OffersCount = 0;
    this._OfferService.getOffersWithFilter(0, 10).subscribe((data: CommonResponse<OfferModel[]>) => {
      if (data.data.length > 0) {
        this.Offers = data.data;
        for (var i = 0; i < this.Offers.length; i++) {
          this.Offers[i].oldImage = "data:image/png;base64," + this.Offers[i].image;
        }
      } else {
        this.Offers = [];
      }
      this.OffersCount = data.totalCount;
      this.loading = false;
    });
  }

  AddOrUpdateOffer() {

    this.clicked = true;
    if (this.actionName === 'add') {
      if (this.model.newImage != null) {
        this.model.image = this.model.newImage.replace("data:image/png;base64,", "");
      }
      this._OfferService.addOffer(this.model).subscribe(data => {
        if (data.data.id > 0) {
          this.initializeOffers();
          this._toastrService.success("success");
        } else {
          this._toastrService.error("failed");
        }
        this.openPpUp = false;
        this.clicked = false;
        this.codeErrorDiv = false;
        this.codeErrorDivMessage = '';
        this.model = new OfferModel();
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    } else {
      if (this.model.newImage != null) {
        this.model.image = this.model.newImage.replace("data:image/png;base64,", "");
      }
      this._OfferService.editOffer(this.model).subscribe(data => {
        if (data.data.id > 1) {
          this.initializeOffers();
          this._toastrService.success("success");
        } else {
          this._toastrService.error("failed");
        }
        this.openPpUp = false;
        this.clicked = false;
        this.codeErrorDiv = false;
        this.codeErrorDivMessage = '';
        this.model = new OfferModel();
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }

  load: boolean;
  handleChange(e, id) { 
    this.load = true;
    var model = new OfferDeleteModel();
    model.id = id;
    if (e.checked == true)
      model.isDeleted = false;
    else
      model.isDeleted = true;
    this._OfferService.changeOfferStatus(model).subscribe((data) => {
      if (data.data.isDeleted == model.isDeleted) {
        this._toastrService.success("success");
      }
      else {
        this._toastrService.error("failed");
      }
      this.load = false;
    },
      (error) => {
        this.load = false;
      });
  }


}
