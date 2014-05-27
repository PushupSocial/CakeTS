describe('TSEvent', function() {
    var TSEvent = CakeTS.Core.Events.TSEvent;

    describe('Fire method', function() {
        it('should fire every attached handler', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2'),
                myFunc3 = jasmine.createSpy('myFunc3');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            myEvent.Attach(myFunc3);

            myEvent.Fire();

            expect(myFunc1.callCount).toBe(1);
            expect(myFunc2.callCount).toBe(1);
            expect(myFunc3.callCount).toBe(1);
        });

        it('should fire handlers with first argument being the sender', function() {
            var myCtx = {key: 'val'},
                myEvent = new TSEvent(myCtx),
                myFunc = jasmine.createSpy('myFunc'),
                myUndef;

            myEvent.Attach(myFunc);
            myEvent.Fire();

            expect(myFunc).toHaveBeenCalledWith(myCtx, myUndef);
        });

        it('should fire handlers with the data as the second argument', function() {
            var myCtx = {key: 'val'},
                myEvent = new TSEvent(myCtx),
                myFunc = jasmine.createSpy('myFunc');

            myEvent.Attach(myFunc);
            myEvent.Fire('foobar');

            expect(myFunc).toHaveBeenCalledWith(myCtx, 'foobar');
        });
    });

    describe('Attach method', function() {
        it('should add the provided hanlder to the list of attached handlers', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2'),
                myFunc3 = jasmine.createSpy('myFunc3');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            myEvent.Attach(myFunc3);

            expect(myEvent.NumHandlers()).toBe(3);
        });

        it('should only add the provided handler if the handler is not already attached', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            // Attempt to attach a duplicate handler
            myEvent.Attach(myFunc1);

            expect(myEvent.NumHandlers()).toBe(2);
        });

        it('should allow a context to be specified when called', function() {
            var myCtx = {incCounter: 0},
                myEvent = new TSEvent(myCtx),
                myObj = {
                    'func1': function() {
                        this.incCounter++;
                    },
                    'func2': function() {
                        this.incCounter++;
                    },
                    'func3': function() {
                        this.incCounter++;
                    }
                };
            myEvent.Attach(myObj.func1, myCtx);
            myEvent.Attach(myObj.func2, myCtx);
            myEvent.Attach(myObj.func3, myCtx);

            myEvent.Fire();

            expect(myCtx.incCounter).toBe(3);
        });
    });

    describe('Remove method', function() {
        it('should remove the provided handler from the attached handlers', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2'),
                myFunc3 = jasmine.createSpy('myFunc3');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            myEvent.Attach(myFunc3);

            myEvent.Remove(myFunc2);

            expect(myEvent.NumHandlers()).toBe(2);
        });

        it('should prevent the provided hanlder from being called', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2'),
                myFunc3 = jasmine.createSpy('myFunc3');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            myEvent.Attach(myFunc3);

            myEvent.Remove(myFunc2);

            myEvent.Fire();

            expect(myFunc2).not.toHaveBeenCalled();
        });

        it('should do nothing if the handler is not attached already', function() {
            var myEvent = new TSEvent(this),
                myFunc1 = jasmine.createSpy('myFunc1'),
                myFunc2 = jasmine.createSpy('myFunc2'),
                myFunc3 = jasmine.createSpy('myFunc3');

            myEvent.Attach(myFunc1);
            myEvent.Attach(myFunc2);
            myEvent.Attach(myFunc3);

            myEvent.Remove(myFunc2);
            myEvent.Remove(myFunc2);

            myEvent.Fire();

            expect(myEvent.NumHandlers()).toBe(2);
            expect(myFunc2).not.toHaveBeenCalled();
        });
    });
});