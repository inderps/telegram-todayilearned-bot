import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getRedditConnection, getSubreddit, getTILSubreddit } from './../../src/reddit/api';

function getClassNameOfMaybe(maybe) {
  return maybe.value.constructor.name;
}

describe('api', () => {
  it('should get connection of reddit api', () => {
    const eitherConnection = getRedditConnection.runIO();
    expect(getClassNameOfMaybe(eitherConnection)).to.eql('snoowrap');
  });

  it('should return subreddit', () => {
    const subreddit = getSubreddit('all').runIO();
    expect(getClassNameOfMaybe(subreddit)).to.eql('Subreddit');
  });

  it('should return getTILSubreddit', () => {
    const subreddit = getTILSubreddit.runIO();
    expect(getClassNameOfMaybe(subreddit)).to.eql('Subreddit');
  });
});
