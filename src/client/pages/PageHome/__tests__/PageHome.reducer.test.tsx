import PageHomeStub from './PageHome.stub.json';
import pageHomeReducer, {
  initialState,
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeError,
} from '../PageHome.reducer';

describe('PageHome Reducer', () => {
  it('should handle initial state', () => {
    expect(pageHomeReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle requesting correctly', () => {
    expect(pageHomeReducer(undefined, { type: fetchHomeRequest.type })).toEqual(
      {
        ...initialState,
        loading: true,
        error: false,
      }
    );
  });

  it('should handle success correctly', () => {
    expect(
      pageHomeReducer(undefined, {
        type: fetchHomeSuccess.type,
        payload: PageHomeStub,
      })
    ).toEqual({
      ...initialState,
      content: PageHomeStub.content,
      metadata: PageHomeStub.metadata,
      loading: false,
      error: false,
    });
  });

  it('should handle failure correctly', () => {
    expect(
      pageHomeReducer(undefined, {
        type: fetchHomeError.type,
        payload: PageHomeStub,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
