import PageAboutStub from './PageAbout.stub.json';
import pageAboutReducer, {
  initialState,
  fetchAboutRequest,
  fetchAboutSuccess,
  fetchAboutError,
} from '../PageAbout.reducer';

describe('PageAbout Reducer', () => {
  it('should handle initial state', () => {
    expect(pageAboutReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle requesting correctly', () => {
    expect(
      pageAboutReducer(undefined, { type: fetchAboutRequest.type })
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle success correctly', () => {
    expect(
      pageAboutReducer(undefined, {
        type: fetchAboutSuccess.type,
        payload: PageAboutStub,
      })
    ).toEqual({
      ...initialState,
      content: PageAboutStub.content,
      metadata: PageAboutStub.metadata,
      loading: false,
      error: false,
    });
  });

  it('should handle failure correctly', () => {
    expect(
      pageAboutReducer(undefined, {
        type: fetchAboutError.type,
        payload: PageAboutStub,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
