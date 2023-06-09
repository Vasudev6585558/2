import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';

import {
  CreateUpdateInstitutionAction,
  GetInstitutionAction,
} from 'src/app/modules/dashboard/modules/admin/modules/institution/state/institutions/institution.actions';
import { InstitutionState } from 'src/app/modules/dashboard/modules/admin/modules/institution/state/institutions/institution.state';
import { Observable } from 'rxjs';
import { emptyInstitutionFormRecord } from 'src/app/modules/dashboard/modules/admin/modules/institution/state/institutions/institution.model';
import { Institution } from 'src/app/shared/common/models';
import { UploadService } from 'src/app/shared/api/upload.service';
import { ToggleLoadingScreen } from 'src/app/shared/state/loading/loading.actions';
import { ShowNotificationAction } from 'src/app/shared/state/notifications/notification.actions';
import { sanitizeUsername } from 'src/app/shared/common/functions';
@Component({
  selector: 'app-add-edit-institution',
  templateUrl: './add-edit-institution.component.html',
  styleUrls: [
    './add-edit-institution.component.scss',
    './../../../../../../../../shared/common/shared-styles.css',
  ],
})
export class AddEditInstitutionComponent implements OnInit {
  formSubmitting: boolean = false;
  params: object = {};
  @Select(InstitutionState.getInstitutionFormRecord)
  institutionFormRecord$: Observable<Institution>;
  institutionFormRecord: Institution = emptyInstitutionFormRecord;
  @Select(InstitutionState.formSubmitting)
  formSubmitting$: Observable<boolean>;
  institutionForm: FormGroup;
  logoFile = null;
  previewPath = null;

  constructor(
    private location: Location,
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {
    this.institutionForm = this.setupInstitutionFormGroup();
    this.institutionFormRecord$.subscribe((val) => {
      this.institutionFormRecord = val;
      this.institutionForm = this.setupInstitutionFormGroup(
        this.institutionFormRecord
      );
    });
  }

  setupInstitutionFormGroup = (
    institutionFormRecord: Institution = emptyInstitutionFormRecord
  ): FormGroup => {
    this.logoFile = null;
    this.previewPath = null;
    const formGroup = this.fb.group({
      id: [institutionFormRecord.id],
      name: [institutionFormRecord.name, Validators.required],
      code: [institutionFormRecord.code, Validators.required],
      location: [institutionFormRecord.location, Validators.required],
      city: [institutionFormRecord.city, Validators.required],
      website: [institutionFormRecord.website],
      phone: [institutionFormRecord.phone],
      logo: [institutionFormRecord.logo],
      bio: [institutionFormRecord.bio],
    });
    this.previewPath = formGroup.get('logo').value;
    return formGroup;
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      const id = params['id'];
      if (id) {
        this.store.dispatch(new GetInstitutionAction({ id }));
      }
    });
  }

  sanitizeCode(event) {
    return sanitizeUsername(event);
  }

  onLogoChange(event) {
    if (event.target.files.length > 0) {
      this.logoFile = event.target.files[0];
      const fileValid = this.logoFile.type.startsWith('image/');
      if (fileValid) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewPath = reader.result as string;
        };
        reader.readAsDataURL(this.logoFile);
      } else {
        event.target.value = null;
        this.store.dispatch(
          new ShowNotificationAction({
            message: 'Please upload only images',
            action: 'error',
          })
        );
      }
    } else {
      this.logoFile = null;
      this.previewPath = this.institutionForm.get('logo').value;
    }
  }

  goBack() {
    this.location.back();
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
  }

  submitForm(form: FormGroup, formDirective: FormGroupDirective) {
    if (this.logoFile) {
      this.store.dispatch(
        new ToggleLoadingScreen({
          showLoadingScreen: true,
          message: 'Uploading file',
        })
      );
      const formData = new FormData();
      formData.append('file', this.logoFile);
      this.uploadService.upload(formData).subscribe(
        (res) => {
          const url = res.secure_url;
          form.get('logo').setValue(url);
          this.store.dispatch(
            new CreateUpdateInstitutionAction({ form, formDirective })
          );
          this.store.dispatch(
            new ToggleLoadingScreen({ showLoadingScreen: false, message: '' })
          );
        },
        (err) => {
          this.store.dispatch(
            new ToggleLoadingScreen({ showLoadingScreen: false, message: '' })
          );
          this.store.dispatch(
            new ShowNotificationAction({
              message: 'Unable to upload file. Reset and try again',
              action: 'error',
            })
          );
          return;
        }
      );
    } else {
      this.store.dispatch(
        new CreateUpdateInstitutionAction({ form, formDirective })
      );
    }
  }
}
