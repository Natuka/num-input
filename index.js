"use strict";
Component({
    externalClasses: [
        'ext-class-input',
        'ext-class-increase',
        'ext-class-decrease',
    ],
    properties: {
        value: {
            type: Number,
            observer: function (val) {
                this.setData({
                    num: val,
                });
            },
        },
        disabled: {
            type: Boolean,
            observer: function (val) {
                this.setData({
                    disabled: val,
                });
            },
        },
        step: {
            type: Number,
            value: 1,
            observer: function (val) {
                this.setData({
                    step: val,
                });
            },
        },
        max: {
            type: Number,
            value: 999,
            observer: function (val) {
                this.setData({
                    max: val,
                });
            },
        },
        min: {
            type: Number,
            value: -999,
            observer: function (val) {
                this.setData({
                    min: val,
                });
            },
        },
        size: {
            type: String,
            value: 'm',
        },
    },
    data: {
        num: 0,
        step: 1,
    },
    methods: {
        onDecrease: function () {
            if (this.data.disabled) {
                return;
            }
            if (this.data.min > this.data.value - this.data.step) {
                return;
            }
            var num = this.data.value - this.data.step;
            this.syncValue(num);
        },
        onIncrease: function () {
            if (this.data.disabled) {
                return;
            }

            if (this.data.max < this.data.value - this.data.step) {
                return;
            }
            var num = this.data.value + this.data.step;
            this.syncValue(num);
        },
        onInput: function (e) {
            var value = e.detail.value;
            // 最小值
            if (this.data.min > value) {
                this.setData({
                    num: this.data.value,
                });
                return;
            }

            // 最大值
            if (this.data.max < value) {
                this.setData({
                    num: this.data.value,
                });
                return;
            }

            this.syncValue(value);
        },
        syncValue: function (num) {
            this.setData({
                num: num,
            });
            this.triggerEvent('input', { value: num });
        },
    },
});
