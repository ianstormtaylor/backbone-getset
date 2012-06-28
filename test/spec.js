/*global Backbone, _, sinon, suite, beforeEach, test, expect */

(function () {

    var View = Backbone.View.extend({
        setTwo : function (value) {
            return ('' + value).toUpperCase();
        }
    });
    Backbone.mixin.getset.call(View);

    suite('backbone-getset');
    beforeEach(function () {
        this.view = new View({
            one : '123',
            two : 'acd'
        });
    });

    test('should be able to get an option', function () {
        expect(this.view.options.one).to.equal('123');
        expect(this.view.get('one')).to.equal('123');
    });

    test('should be able to set an option', function () {
        expect(this.view.get('one')).to.equal('123');
        this.view.set('one', '345');
        expect(this.view.get('one')).to.equal('345');
    });

    test('should be able to has an option', function () {
        expect(this.view.has('one')).to.be.true;
        expect(this.view.has('three')).to.be.false;
    });

    test('should run store through set initially', function () {
        expect(this.view.options.two).to.equal('ACD');
        expect(this.view.get('two')).to.equal('ACD');
    });

    test('should run setters through custom functions', function () {
        this.view.set('two', 'asd');
        expect(this.view.get('two')).to.equal('ASD');
    });

}());