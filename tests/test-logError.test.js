const logError = require('../src/utils/logError');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: jest.fn(),
}));

describe('logError', () => {
  const MOCK_DATE = '2023-10-27T10:00:00.000Z';
  const MOCK_ERROR_MESSAGE = 'Test Error';
  const MOCK_ERROR_STACK = 'Error: Test Error\n    at <anonymous>:1:1';
  const MOCK_LOG_DIR = 'D:\\Projects\\NPMpackage\\error-cure\\logs';
  const MOCK_LOG_PATH = 'D:\\Projects\\NPMpackage\\error-cure\\logs\\error.log';

  let consoleErrorSpy;

  beforeAll(() => {
    // Mock Date.now() to return a fixed value
    const mockDate = new Date(MOCK_DATE);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  beforeEach(() => {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockClear();
    fs.appendFile.mockClear();
    path.join.mockClear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock path.join calls
    path.join
      .mockReturnValueOnce(MOCK_LOG_DIR) // For logDir
      .mockReturnValueOnce(MOCK_LOG_PATH); // For logPath
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create log directory if it does not exist', () => {
    const error = new Error(MOCK_ERROR_MESSAGE);
    error.stack = MOCK_ERROR_STACK;

    logError(error);

    expect(fs.existsSync).toHaveBeenCalledWith(MOCK_LOG_DIR);
    expect(fs.mkdirSync).toHaveBeenCalledWith(MOCK_LOG_DIR, { recursive: true });
  });

  test('should not create log directory if it already exists', () => {
    fs.existsSync.mockReturnValue(true);
    const error = new Error(MOCK_ERROR_MESSAGE);
    error.stack = MOCK_ERROR_STACK;

    logError(error);

    expect(fs.existsSync).toHaveBeenCalledWith(MOCK_LOG_DIR);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  test('should append error message to log file', () => {
    const error = new Error(MOCK_ERROR_MESSAGE);
    error.stack = MOCK_ERROR_STACK;

    logError(error);

    const expectedLogMessage = `[${MOCK_DATE}] ${MOCK_ERROR_STACK}\n`;
    expect(fs.appendFile).toHaveBeenCalledWith(
      MOCK_LOG_PATH,
      expectedLogMessage,
      expect.any(Function)
    );
  });

  test('should log error to console', () => {
    const error = new Error(MOCK_ERROR_MESSAGE);
    error.stack = MOCK_ERROR_STACK;

    logError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });

  test('should handle error without stack property', () => {
    const error = { message: MOCK_ERROR_MESSAGE }; // Simulate an error object without a stack

    logError(error);

    const expectedLogMessage = `[${MOCK_DATE}] ${MOCK_ERROR_MESSAGE}\n`;
    expect(fs.appendFile).toHaveBeenCalledWith(
      MOCK_LOG_PATH,
      expectedLogMessage,
      expect.any(Function)
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});