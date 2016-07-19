import { describe, it } from 'mocha';
import { expect } from 'chai';
import { map } from 'ramda';
import { getRedditConnection, fetchRandomPost } from './../../src/reddit/api';

function getClassNameOfMaybe(maybe) {
  return maybe.value.constructor.name;
}

describe('api', () => {
  it('should get connection of reddit api', () => {
    const eitherConnection = getRedditConnection.runIO();
    expect(getClassNameOfMaybe(eitherConnection)).to.eql('snoowrap');
  });

  it('should return posts for today of til subreddit', (done) => {
    map(map(postFuture => {
      postFuture.fork(() => {}, post => {
        expect(post).to.not.eql('');
        done();
      });
    }), fetchRandomPost).runIO();
  });
});
