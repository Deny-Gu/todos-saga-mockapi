import { all } from 'redux-saga/effects';
import { todosSagaWatcher } from '@/features/todos/todos-saga';

export function* rootSaga() {
  yield all([todosSagaWatcher()]);
}
