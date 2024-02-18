import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CreateTicketModel } from '../create-ticket-model';
import { TicketServiceService } from '../../core/services/ticket-service.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, IIdNamePairModel, CommonResponse } from '../../core';
import { HttpClient } from '@angular/common/http';
import { AttachedFiles } from '../ticket-attachment-model';
import { TicketTypes } from './enums/ticket-types.enum';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { TicketTypeFile } from './enums/ticket-type-file.enum';
import { SeqNoFormControl } from './form-controll/seq-no-form-control';
import { IDFormControl } from './form-controll/idform-control';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  ticketData: CreateTicketModel = new CreateTicketModel();
  isEnglish: boolean;
  currentlang: string;
  types: IIdNamePairModel[];
  type: IIdNamePairModel = new IIdNamePairModel();
  ticketId:string;
  uploadFilesBro : any[] = [];
  attachedFiles :string [] = [];
  clicked = false;

  newTicketForm: FormGroup = new FormGroup({});
  maxFilesTypeIds = [10, 11, 12];
  allowedFileTypes = ['pdf', 'xls', 'xlsb', 'xlsm', 'jpeg', 'png', 'gif', 'jpg', 'psd'];

  constructor(private _ticketService: TicketServiceService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private httpService: HttpClient) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.ticketData.language = (this.isEnglish) ? 'en' : 'ar';
    this.currentlang = (this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en') ? 'en' : 'ar';
    this.getTicketTypes();
  }

  getTicketTypes() {
    this._ticketService.getTicketType(this.currentlang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.types = [];
      this.types = data.data;
      this.currentlang === 'en' ? this.types.unshift({id: 0, name: 'all'}) : this.types.unshift({id: 0, name: 'الكل'});
      this.type = this.types[0];
      this.newTicketForm = new FormGroup({ ticketType: new FormControl(null, Validators.required) });
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  TicketTypeChanged(event) {
    this.type = event.value;
    this.ticketData.ticketTypeId = this.type.id;
    this.ticketData.userNotes = '';
    this.ticketData.nin = '';
    this.initForm();
  }
  
  addNewAttachment(type: any): void {
    const currentIndex = (this.newTicketForm.get("attachments") as FormArray).length;
    if (currentIndex > 0) {
      const lastAttachment = (this.newTicketForm.get('attachments')['controls'][currentIndex - 1]).value;
      if (!lastAttachment) {
        this._toastrService.error(this.isEnglish ? "Please add the last attachment before adding a new one" : "الرجاء إضافة آخر مرفق قبل إضافة مرفق جديد");
        return;
      }
    }

    if (type == 2 && (this.newTicketForm.get("attachments") as FormArray).length >= 1 && (this.newTicketForm.get("attachments") as FormArray).length < 3) {
      return (this.newTicketForm.get("attachments") as FormArray).push(new FormControl(""));
    }
    else if ((type == 3 || type == 4 || type == 6 || type == 9) && (this.newTicketForm.get("attachments") as FormArray).length < 2) {
      return (this.newTicketForm.get("attachments") as FormArray).push(new FormControl(""));
    }
    else if (!(type == 2 || type == 3 || type == 4 || type == 6 || type == 9)) {
      return (this.newTicketForm.get("attachments") as FormArray).push(new FormControl("", Validators.required));
    }
  }

  onRemoveAttachment(index: number): void {
    return (this.newTicketForm.get("attachments") as FormArray).removeAt(index);
  }

  onFileChanged(index: number, event) {
    const file = event.target.files[0];
    const extension = file.type.split("/").pop();
    const formControl = (this.newTicketForm.get("attachments") as FormArray).at(index);
    if (!this.allowedFileTypes.includes(extension)) {
      formControl.setErrors({ notAllowed: true });
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = () => {
      if (fileReader.DONE) {
        var attFile = new AttachedFiles();
        attFile.extension = extension;
        attFile.file = btoa(fileReader.result.toString());
        attFile.ticketTypeFileNameId = this.handleTicketFileTypeId(index);
        this.ticketData.attachedFiles[index] = attFile;
      }
    };
  }

  Createticket(){
    this.clicked = true;
    if(this.newTicketForm.value.ticketType <= 0) {
      this._toastrService.error(this.isEnglish ? "Please choose the type of ticket and enter the data" : "الرجاء اختيار نوع التذكرة وإدخال البيانات");
      this.clicked = false;
      return;
    }

    if (this.newTicketForm.valid) {
      this.ticketData.userPhone = this.newTicketForm.value.userPhone;
      this.ticketData.nin = this.newTicketForm.value.nationalId;
      this.ticketData.sequenceOrCustomCardNumber = this.newTicketForm.value.sequenceCustomerNo;
      this.ticketData.userNotes = this.newTicketForm.value.notes;
      this._ticketService.createTicket(this.ticketData).subscribe(data => {
          if (data.data.ErrorCode === 1) {
            this.ticketData.userNotes = '';
            this.ticketData.userPhone = '';
            this.ticketData.sequenceOrCustomCardNumber = '';
            this.ticketData.nin = '';
            this.type = this.types.find((c) => c.id === 0);
            this.ticketData.ticketTypeId = 0;
            this.ticketData.attachedFiles = [];
            this.ticketId = "#"+ data.data.TicketId.toString();
            this._toastrService.success(data.data.ErrorDescription);
          } else {
            this._toastrService.error(data.data.ErrorDescription);
          }

          this.clicked = false;
        }, (error: any) => {
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.description, item.code);
              this.clicked = false;
            });
          }
        });
    }
    else {
      this.clicked = false;
    }
  }

  private initForm() {
    switch (this.type.id) {
      case TicketTypes.LinkWithNajm:
      case TicketTypes.CouldnotPrintPolicy:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]), 
          attachments: new FormArray([])
        });
        break;

      case TicketTypes.ChangePolicyData:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          notes: new FormControl('', Validators.required),
          attachments: new FormArray([new FormControl('', Validators.required)])
        });
        break;

      case TicketTypes.PolicyGeneration:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          notes: new FormControl('', Validators.required),
          attachments: new FormArray([])
        });
        break;

      case TicketTypes.Percentage:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          notes: new FormControl('', Validators.required),
          attachments: new FormArray([])
        });
        break;

      case TicketTypes.NationalAddress:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          nationalId: new IDFormControl('', [Validators.required, Validators.minLength(10)]),
          notes: new FormControl('', Validators.required),
          attachments: new FormArray([])
        });
        break;

      case TicketTypes.Others:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          notes: new FormControl('', Validators.required),
          attachments: new FormArray([])
        });
        break;

      case TicketTypes.UpdateCustomToSequence:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          attachments: new FormArray([new FormControl('', Validators.required)])
        });
        break;

      case TicketTypes.ProofIDAndIBANAndEmail:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          nationalId: new IDFormControl('', [Validators.required, Validators.minLength(10)]),
          attachments: new FormArray([
            new FormControl('', Validators.required),
            new FormControl('', Validators.required),
            new FormControl('', Validators.required)])
        });
        break;

      case TicketTypes.ReachMaximumPolicyIssuance:
        this.newTicketForm = new FormGroup({
          ticketType: new FormControl(this.type.id, Validators.required),
          userPhone: new FormControl('', [ Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
          sequenceCustomerNo: new SeqNoFormControl('', [ Validators.required, Validators.minLength(10)]),
          nationalId: new IDFormControl('', [Validators.required, Validators.minLength(10)]),
          attachments: new FormArray([new FormControl('', Validators.required)])
        });
        break;
    }
  }

  private handleTicketFileTypeId(index: number) {
    let ticketFileTypeId = TicketTypeFile.Attachment;

    switch (this.type.id) {
      case TicketTypes.UpdateCustomToSequence:
        ticketFileTypeId = TicketTypeFile.VehicleRegistration;
        break;

      case TicketTypes.ProofIDAndIBANAndEmail:
        ticketFileTypeId = index === 0 ? TicketTypeFile.PhoneNumber
          : index === 1 ? TicketTypeFile.IBANCertificate
            : TicketTypeFile.Email;
        break;

      case TicketTypes.ReachMaximumPolicyIssuance:
        ticketFileTypeId = TicketTypeFile.ProofofOwnershipTransfer;
        break;
    }

    return ticketFileTypeId;
  }

}