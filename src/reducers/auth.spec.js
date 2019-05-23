import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  authenticate,
  authStart,
  authEnd,
  authError,
} from './auth';

jest.mock('axios');
const mockStore = configureStore([thunk]);

describe('TodoList Reducer', () => {
  let store;

  const expectedResult = {
    id: 1,
    name: 'Guglielmo Marconi',
  };

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch payload and auth end action', (done) => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: expectedResult }));

    store.dispatch(authenticate()).then(() => {
      const [firstAction, secondAction] = store.getActions();

      expect(firstAction).toEqual(authStart());
      expect(secondAction).toEqual(authEnd(expectedResult));

      done();
    });
  });

  it('should dispatch an auth error action on error', (done) => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('Random Error')));

    store.dispatch(authenticate()).then(() => {
      const [firstAction, secondAction] = store.getActions();

      expect(firstAction).toEqual(authStart());
      expect(secondAction).toEqual(authError());

      done();
    });
  });
});
