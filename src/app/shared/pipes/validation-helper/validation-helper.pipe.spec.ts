import { ValidationHelper } from './validation-helper.pipe';

describe('ValidationHelper', () => {
  it('create an instance', () => {
    const pipe = new ValidationHelper();
    expect(pipe).toBeTruthy();
  });
});
