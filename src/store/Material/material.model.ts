import { MaterialTableRow } from '../../model/material.model';

export interface MaterialState {
  readonly materialItemDetail: MaterialTableRow | null;
}
