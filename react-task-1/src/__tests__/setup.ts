/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';

global.fetch = vi.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});
