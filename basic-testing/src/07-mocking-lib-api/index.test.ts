import axios, { AxiosInstance } from 'axios';
import { getDataFromApi, throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash/throttle', () => jest.fn((fn) => fn));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockData = { title: 'Test' };

    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: mockData }),
    };
    const createSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);

    await throttledGetDataFromApi('/posts/1');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts/1');
    createSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const mockData = { userId: 1, id: 1, title: 'Test' };
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockedAxiosInstance);

    const result = await getDataFromApi('/posts/1');

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/posts/1');
    expect(result).toEqual(mockData);
  });

  test('should return response data', async () => {
    const mockData = { title: 'Test' };

    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: mockData }),
    };
    const createSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);

    const result = await throttledGetDataFromApi('/posts/1');
    expect(result).toEqual({ title: 'Test' });
    createSpy.mockRestore();
  });
});
