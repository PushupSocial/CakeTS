describe('Storage', function() {
    var Storage = CakeTS.Utils.Storage;

    beforeEach(function(){
        window.localStorage.clear();
    });

    describe('NativeEnabled function', function(){
        it('should return false when non existent', function() {
            var noStorage;

            expect(Storage.CheckLocalStorage(null)).toBe(false);
            expect(Storage.CheckLocalStorage({})).toBe(false);
            expect(Storage.CheckLocalStorage(noStorage)).toBe(false);
            expect(Storage.CheckLocalStorage("")).toBe(false);
        });

        it('should return false when existent but not fully functional', function() {
            var localStorageGet = {
                    setItem: function() {  },
                    getItem: function() { throw new Error(); },
                    removeItem: function() {  }
                },
                localStorageSet = {
                    setItem: function() { throw new Error(); },
                    getItem: function() {  },
                    removeItem: function() {  }
                },
                localStorageRemove = {
                    setItem: function() {  },
                    getItem: function() {  },
                    removeItem: function() { throw new Error(); }
                };

            expect(Storage.CheckLocalStorage(localStorageGet)).toBe(false);
            expect(Storage.CheckLocalStorage(localStorageSet)).toBe(false);
            expect(Storage.CheckLocalStorage(localStorageRemove)).toBe(false);
        });
        it('should return true when existent and fully functional', function() {
            expect(Storage.CheckLocalStorage(window.localStorage)).toBe(true);
        });
    });

    describe('Get function', function() {
        var key = 'fooget', val = 'barget';
        window.localStorage.setItem(key, JSON.stringify(val));

        expect(Storage.Get(key)).toBe(val);
    });

    describe('Set function', function() {

        var key = 'fooset', val = 'barset';
        Storage.Set(key, val);

        expect(JSON.parse(window.localStorage.getItem(key))).toBe(val);
    });

    describe('Iterate function', function() {
        var data = [];

        beforeEach(function(){
            window.localStorage.clear();

            data = [
                {key: 'foo1', val: 'bar1'},
                {key: 'foo2', val: 'bar2'},
                {key: 'foo3', val: 'bar3'},
                {key: 'foo4', val: 'bar4'},
                {key: 'foo5', val: 'bar5'},
                {key: 'foo6', val: 'bar6'}
            ];

            for(var i = 0; i < data.length; i++) {
                window.localStorage.setItem(data[i].key, JSON.stringify(data[i].val));
            }

        });

        function getData(key) {
            return JSON.parse(window.localStorage.getItem(key))
        }

        it('should iterate over local storage calling the worker', function() {
            var worker = jasmine.createSpy('worker');

            Storage.Iterate(worker);

            expect(worker.callCount).toBe(6);
        });

        it('should change the value of the local store key', function() {
            var value = 'foobar';

            function worker() { return JSON.stringify(value); }

            Storage.Iterate(worker);

            expect(getData('foo1')).toBe(value);
            expect(getData('foo2')).toBe(value);
            expect(getData('foo3')).toBe(value);
            expect(getData('foo4')).toBe(value);
            expect(getData('foo5')).toBe(value);
            expect(getData('foo6')).toBe(value);
        });

        if('should remove the local store key if falsy is returned', function () {
            function worker(value) {
                var undef;

                switch (JSON.parse(value)) {
                    case 'bar1':
                        return 0;
                    case 'bar2':
                        return false;
                    case 'bar3':
                        return "";
                    case 'bar4':
                        return undef;
                    case 'bar5':
                        return null;
                    case 'bar6':
                        return NaN;
                }
            }
            Storage.Iterate(worker);

            expect(getData('foo1')).toBe(null);
            expect(getData('foo2')).toBe(null);
            expect(getData('foo3')).toBe(null);
            expect(getData('foo4')).toBe(null);
            expect(getData('foo5')).toBe(null);
            expect(getData('foo6')).toBe(null);
        });
    });
});