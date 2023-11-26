import { MaterialTableRow } from '../../model/material.model';

export interface MaterialState {
  readonly itemCount: number;
  readonly selectedMaterialItem: MaterialTableRow | null;
}
