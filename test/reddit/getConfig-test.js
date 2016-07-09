import { describe, it } from 'mocha';
import { expect } from 'chai';
import getConfig from './../../src/reddit/getConfig';
import { Maybe } from 'ramda-fantasy';

describe('getConfig', () => {
  it('should get config for reddit api connection', () => {
    const config = getConfig.runIO();
    expect(Maybe.isJust(config)).to.eql(true);
  });
});
