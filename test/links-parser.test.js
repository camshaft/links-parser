var should = require('should');
var parser = require('..');

describe('links-parser', function() {
  it('should parse a single link', function() {
    parser('<http://example.com/blog>; rel="invalidates"').should.eql({
      invalidates: 'http://example.com/blog'
    });
  });

  it('should parse multiple links', function() {
    parser('<http://example.com/blog>; rel="invalidates", <http://example.com/test>; rel="cannonical"').should.eql({
      invalidates: 'http://example.com/blog',
      cannonical: 'http://example.com/test'
    });
  });

  it('should parse multiple links with the same rel', function() {
    parser('<http://example.com/blog>; rel="invalidates", <http://example.com/blog/post/1>; rel="invalidates", <http://example.com/blog/post/2>; rel="invalidates"').should.eql({
      invalidates: [
        'http://example.com/blog',
        'http://example.com/blog/post/1',
        'http://example.com/blog/post/2'
      ]
    });
  });

  it('should parse a link with multiple rels', function() {
    parser('<http://example.com/blog>; rel="invalidates cannonical"').should.eql({
      invalidates: 'http://example.com/blog',
      cannonical: 'http://example.com/blog'
    });
  });

  it('should return all parameters with additional flag', function() {
    parser('<http://example.com/blog>; rel="invalidates"; title="foobar"', true).should.eql({
      invalidates: {
        uri: 'http://example.com/blog',
        rel: 'invalidates',
        title: 'foobar'
      }
    });
  });
});
