import {FormControl} from '@angular/forms';

export class SeqNoFormControl extends FormControl {
    setValue(
        value: string | null,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean
        }): void {

        if (!value) {
            super.setValue('', {...options, emitModelToViewChange: true});
            return;
        }

        if (value.toString().length > 10) {
            super.setValue(this.value, {...options, emitModelToViewChange: true});
            return;
        }
        super.setValue(value, {...options, emitModelToViewChange: true});
    }
}