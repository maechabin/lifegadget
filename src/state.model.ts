import { RootState } from './root/rootState';
import { IndexState } from './index/indexState';
import { ArchiveState } from './archive/archiveState';
import { RouterState } from 'connected-react-router';

/** Stateモデル */
export interface State {
  root: RootState;
  index: IndexState;
  archive: ArchiveState;
  router: RouterState;
}
