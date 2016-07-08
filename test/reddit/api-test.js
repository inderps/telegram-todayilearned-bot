import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getRedditConnection } from './../../src/reddit/api';
import snoowrap from 'snoowrap';

describe('api', () => {
  it('should get connection of reddit api', () => {
    const eitherConnection = getRedditConnection.runIO();
    expect(eitherConnection.value instanceof snoowrap).to.eql(true);
  });
});
