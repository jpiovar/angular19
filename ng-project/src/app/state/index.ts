import { RecordsState } from './records/records.models';

export interface AppState {
  readonly router: any;
  readonly records: RecordsState;
}
