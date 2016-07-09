import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getRedditConnection, tilForToday } from './../../src/reddit/api';

function getClassNameOfMaybe(maybe) {
  return maybe.value.constructor.name;
}

describe('api', () => {
  it('should get connection of reddit api', () => {
    const eitherConnection = getRedditConnection.runIO();
    expect(getClassNameOfMaybe(eitherConnection)).to.eql('snoowrap');
  });

  it('should return posts for today of til subreddit', (done) => {
    const postsFuture = tilForToday.runIO().value;
    postsFuture.fork(() => {}, data => {
      expect(data.size).to.not.eql(0);
      done();
    });
  });
});
