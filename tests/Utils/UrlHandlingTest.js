describe('UrlHandling', function() {
    var UrlHandling = CakeTS.Utils.UrlHandling;

    describe('ParseUrl given a valid url', function() {
        var url = 'ftp://foo.bar:81/subdir';

        it('should return the url\'s protocol', function() {
            expect(UrlHandling.ParseUrl(url).protocol).toBe('ftp:');
        });

        it('should return the url\'s domain', function() {
            expect(UrlHandling.ParseUrl(url).domain).toBe('foo.bar');
        });

        it('should return the url\'s port', function() {
            expect(UrlHandling.ParseUrl(url).port).toBe(81);
        });
    });
});