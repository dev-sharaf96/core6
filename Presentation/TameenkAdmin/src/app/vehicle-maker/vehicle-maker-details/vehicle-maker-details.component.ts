import { Component, OnInit, Input } from '@angular/core';
import { VehicleMakerModel } from '../vehicle-maker-model';
import { VehicleMakerModels } from '../vehicle-maker-models';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, LocalizationService } from '../../core';
import { VehicleMakerService } from '../../core/services/vehicle-maker.service';
import { VehicleMakerFilter } from '../vehicle-maker-filter';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-vehicle-maker-details',
  templateUrl: './vehicle-maker-details.component.html',
  styleUrls: ['./vehicle-maker-details.component.css']
})
export class VehicleMakerDetailsComponent implements OnInit {
  maker: VehicleMakerModel = new VehicleMakerModel();
  makerCode;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  eventHolder;
  makerModels: VehicleMakerModels[];
  makerModelsCount;
  emptyStringValue = 'ــــــــــــــــــ';
  clicked = false;
  makerModel: VehicleMakerModels = new VehicleMakerModels();
  openPpUp = false;
  actionName = 'add';
  codeErrorDiv = false;
  makerCodeErrorDiv = false;
  codeErrorDivMessage = '';
  modelFilter: VehicleMakerFilter = new VehicleMakerFilter();

  constructor(private _vehicleService: VehicleMakerService,
              private _localizationService: LocalizationService,
              private route: ActivatedRoute,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.makerCode = this.route.snapshot.paramMap.get('makerCode');
    this._vehicleService.getVehicleMakerDetails(this.makerCode).subscribe(data => {
      this.maker = data.data;
    });
    //this.initializeMakerModels();
  }

  MakerModelsLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._vehicleService.getMakerModels(this.makerCode, pageIndex, pageInSize).subscribe((data: CommonResponse<VehicleMakerModels[]>) => {
          this.makerModels = data.data;
          this.makerModelsCount = data.totalCount;
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  modelfilterClick() {
    this.loading = true;
    const event = this.eventHolder;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._vehicleService.getMakerModelsWithFilter(this.modelFilter.makerCode, this.makerCode, this.modelFilter.makerDescription,
                                                    pageIndex, pageInSize)
    .subscribe((data: CommonResponse<VehicleMakerModels[]>) => {
          if (data.data.length > 0) {
            this.makerModels = data.data;
          } else {
            this.makerModels = [];
          }
          this.makerModelsCount = data.totalCount;
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

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this._vehicleService.getVehicleMakerModelsExcel(this.modelFilter.makerCode, this.makerCode, this.modelFilter.makerDescription).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'requests-Log.xlsx');
        }
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
  }

  showMakerModelPopup(action, code?: number) {
    this.codeErrorDiv = false;
    this.codeErrorDivMessage = '';
    this.makerModel = new VehicleMakerModels();
    this.actionName = action;
    if (action === 'edit') {
      this.loading = true;
      this.isEdit = true;
      this._vehicleService.getVehicleMakerModelDetails(code, this.makerCode).subscribe(data => {
        if (data.data) {
          this.makerModel = data.data;
          this.openPpUp = true;
        } else {
          this.openPpUp = false;
        }
      });
    } else {
      this.isEdit = false;
      this.makerModel.makerCode = this.makerCode;
      this.openPpUp = true;
    }
    this.loading = false;
  }

  closeMakerModelModal() {
    this.openPpUp = false;
    this.clicked = false;
  }

   initializeMakerModels() {
    this.makerModels = [];
    this.makerModelsCount = 0;
    this._vehicleService.getMakerModels(this.makerCode, 0, 10).subscribe((newdata: CommonResponse<VehicleMakerModels[]>) => {
      if (newdata.data.length > 0) {
        this.makerModels = newdata.data;
      } else {
        this.makerModels = [];
      }
      this.makerModelsCount = newdata.totalCount;
      this.loading = false;
    });
  }

  AddOrUpdateMakerModel() {
    this.clicked = true;

    if (this.actionName === 'add') {
      this._vehicleService.checkMakerModeCode(this.makerModel).subscribe(checkdata => {
        if (checkdata.data === true) {
          this.codeErrorDivMessage = (this.isEnglish) ? 'Code exist for another model' : 'هذا الرمز موجود لنموذج آخر';
          this.codeErrorDiv = true;
          this.clicked = false;
        } else {
          this._vehicleService.addOrupdateMakerModel(this.makerModel, `action=${this.actionName}`).subscribe(data => {
            if (data.data.ErrorCode === 1) {
              this.initializeMakerModels();
              this._toastrService.success(data.data.ErrorDescription);
            } else {
              this._toastrService.error(data.data.ErrorDescription);
            }
            this.openPpUp = false;
            this.clicked = false;
            this.codeErrorDiv = false;
            this.codeErrorDivMessage = '';
            this.makerModel = new VehicleMakerModels();
            this.makerModel.makerCode = this.makerCode;
          }, (error: any) => {
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.description, item.code);
              });
            }
          });
        }
      });
    } else {
      this._vehicleService.addOrupdateMakerModel(this.makerModel, `action=${this.actionName}`).subscribe(data => {
        if (data.data.ErrorCode === 1) {
          this.initializeMakerModels();
          this._toastrService.success(data.data.ErrorDescription);
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
        this.openPpUp = false;
        this.clicked = false;
        this.codeErrorDiv = false;
        this.codeErrorDivMessage = '';
        this.makerModel = new VehicleMakerModels();
        this.makerModel.makerCode = this.makerCode;
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
