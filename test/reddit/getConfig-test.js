import { describe, it } from 'mocha';
import { expect } from 'chai';
import getConfig from './../../src/reddit/getConfig';
import { Either } from 'ramda-fantasy';

describe('getConfig', () => {
  it('should get config for reddit api connection', () => {
    const config = getConfig.runIO();
    expect(Either.isRight(config)).to.eql(true);
  });
});
