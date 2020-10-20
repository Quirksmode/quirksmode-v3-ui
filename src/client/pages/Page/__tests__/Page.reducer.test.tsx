import PageStub from './Page.stub.json';
import pageReducer, {
  initialState,
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageError,
} from '../Page.reducer';

describe('Page Reducer', () => {
  it('should handle initial state', () => {
    expect(pageReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle requesting correctly', () => {
    expect(pageReducer(undefined, { type: fetchPageRequest.type })).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle success correctly', () => {
    expect(
      pageReducer(undefined, {
        type: fetchPageSuccess.type,
        payload: PageStub,
      })
    ).toEqual({
      ...initialState,
      content: PageStub.content,
      metadata: PageStub.metadata,
      loading: false,
      error: false,
    });
  });

  it('should handle failure correctly', () => {
    expect(
      pageReducer(undefined, {
        type: fetchPageError.type,
        payload: PageStub,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
