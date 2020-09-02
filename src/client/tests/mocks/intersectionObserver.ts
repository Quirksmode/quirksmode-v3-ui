const intersectionObserverMock = () => ({
  observe: () => null as () => void,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);
