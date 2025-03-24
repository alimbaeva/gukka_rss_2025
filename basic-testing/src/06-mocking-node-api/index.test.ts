import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { readFile, writeFile } from 'fs/promises';
// import { existsSync } from 'fs';
import { jest } from '@jest/globals';
import * as path from 'path';

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs', () => ({
    existsSync: jest.fn(),
  }));

  test('should call join with pathToFile', async () => {
    const mockPath = 'test.txt';
    const mockFullPath = '/mock/full/path/test.txt';
    const joinSpy = jest.spyOn(path, 'join').mockReturnValue(mockFullPath);
    await readFileAsynchronously(mockPath);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, mockPath);
    expect(joinSpy).toHaveBeenCalledTimes(1);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'notFile.txt';
    const fullPath = `__dirname/${pathToFile}`;
    const result = await readFileAsynchronously(pathToFile);
    const result2 = await readFileAsynchronously(fullPath);
    expect(result).toBeNull();
    expect(result2).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'existingFile.txt';
    const mockFullPath = `/mock/full/path/${mockPath}`;
    const mockContentToWrite = 'File content if file exists';

    jest.spyOn(path, 'join').mockReturnValue(mockFullPath);

    writeFile(mockFullPath, mockContentToWrite);
    jest
      .spyOn(await import('fs/promises'), 'readFile')
      .mockResolvedValue(mockContentToWrite);

    await expect(writeFile).toHaveBeenCalledWith(
      mockFullPath,
      mockContentToWrite,
    );

    const result = await readFile(mockFullPath);
    expect(result).toBe(mockContentToWrite);
    expect(readFile).toHaveBeenCalledWith(mockFullPath);
  });
});
