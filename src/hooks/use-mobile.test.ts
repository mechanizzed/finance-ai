import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: width,
  });
};

const renderHookAndExpect = (width: number, isMobile: boolean) => {
  mockInnerWidth(width);
  mockMatchMedia(isMobile);
  const { result } = renderHook(() => useIsMobile());
  expect(result.current).toBe(isMobile);
};

describe("useIsMobile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("should return true for screens smaller than 768px", () => {
    renderHookAndExpect(767, true);
  });

  it("should return false for screens greater than or equal to 768px", () => {
    renderHookAndExpect(768, false);
  });

  it("should return false for very large screens", () => {
    renderHookAndExpect(1200, false);
  });

  it("should return true for very small screens", () => {
    renderHookAndExpect(320, true);
  });

  it("should return false for exactly 768px", () => {
    renderHookAndExpect(768, false);
  });

  it("should return true for 767px (lower limit)", () => {
    renderHookAndExpect(767, true);
  });

  it("should properly configure the matchMedia event listener", () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: "(max-width: 767px)",
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    mockInnerWidth(800);

    const { unmount } = renderHook(() => useIsMobile());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("should update state when screen size changes", () => {
    let currentWidth = 800;

    Object.defineProperty(window, "innerWidth", {
      get: () => currentWidth,
      configurable: true,
    });

    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: "(max-width: 767px)",
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    const changeCallback = mockAddEventListener.mock.calls.find(
      (call) => call[0] === "change",
    )?.[1];

    currentWidth = 600;

    act(() => {
      if (changeCallback && typeof changeCallback === "function") {
        changeCallback();
      }
    });

    expect(result.current).toBe(true);
  });

  it("should work correctly with the 768px breakpoint", () => {
    const MOBILE_BREAKPOINT = 768;

    mockInnerWidth(MOBILE_BREAKPOINT - 1);
    mockMatchMedia(true);

    const { result: resultBelow } = renderHook(() => useIsMobile());
    expect(resultBelow.current).toBe(true);

    mockInnerWidth(MOBILE_BREAKPOINT);
    mockMatchMedia(false);

    const { result: resultAt } = renderHook(() => useIsMobile());
    expect(resultAt.current).toBe(false);

    mockInnerWidth(MOBILE_BREAKPOINT + 1);
    mockMatchMedia(false);

    const { result: resultAbove } = renderHook(() => useIsMobile());
    expect(resultAbove.current).toBe(false);
  });
});
