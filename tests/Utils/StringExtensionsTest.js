describe('String extensions', function() {
    var StringExtensions = CakeTS.Utils.StringExtensions;

    describe('GetNameVariants function', function() {
        var name = 'FooBar';

        it('should return the given name', function() {
            expect(StringExtensions.GetNameVariants(name)[0]).toBe(name);
        });

        it('should return the name camel-cased', function() {
            expect(StringExtensions.GetNameVariants(name)[1]).toBe('fooBar');
        });

        it('should return the name lower-cased', function() {
            expect(StringExtensions.GetNameVariants(name)[2]).toBe('foobar');
        });

        it('should return the name with underscores', function() {
            expect(StringExtensions.GetNameVariants(name)[3]).toBe('Foo_Bar');
        });

        it('should return the name with underscores and lower-cased', function() {
            expect(StringExtensions.GetNameVariants(name)[4]).toBe('foo_bar');
        });

        it('should return the name with dashes', function() {
            expect(StringExtensions.GetNameVariants(name)[5]).toBe('Foo-Bar');
        });

        it('should return the name with dashes and lower-cased', function() {
            expect(StringExtensions.GetNameVariants(name)[6]).toBe('foo-bar');
        });

        it('should return the name with an underscored prefix', function() {
            expect(StringExtensions.GetNameVariants(name)[7]).toBe('_FooBar');
        });

        it('should return the name camel-cased with an underscored prefix', function() {
            expect(StringExtensions.GetNameVariants(name)[8]).toBe('_fooBar');
        });
    });
});