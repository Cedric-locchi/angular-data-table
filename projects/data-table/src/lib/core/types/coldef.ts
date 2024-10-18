import {BaseListItemComponent} from '../base-component/base-list-item/base-list-item.component';
import {Type} from '@angular/core';

export type colDef = {
  headerName: string;
  field: string;
  isVisible?: boolean;
  isBold?: boolean;
  isDate?: boolean;
  isState?: boolean;
  template?: Type<BaseListItemComponent>;
  isEllipsis?: boolean;
};
