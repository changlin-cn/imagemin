'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chooseImagemin = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var chooseImagemin = exports.chooseImagemin = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(option) {
        var defaultOption, r, files, result, i, f, _r;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        defaultOption = {
                            quality: .7,
                            width: void 0,
                            height: void 0,
                            url: void 0
                        };

                        if ((0, _changlinUtil.isObject)(option)) {
                            (0, _changlinUtil.extend)(defaultOption, option);
                        }

                        if (!(0, _changlinUtil.isString)(defaultOption.url)) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 5;
                        return toDataURL(defaultOption.url, defaultOption);

                    case 5:
                        r = _context.sent;
                        return _context.abrupt('return', [{
                            result: r,
                            name: Date.now(),
                            type: /image\/[a-z]+/.exec(r)[0]
                        }]);

                    case 9:
                        _context.next = 11;
                        return chooseImage();

                    case 11:
                        files = _context.sent;
                        result = [];
                        i = 0;

                    case 14:
                        if (!(i < files.length)) {
                            _context.next = 25;
                            break;
                        }

                        _context.next = 17;
                        return readFileAsDataURL(files[i]);

                    case 17:
                        f = _context.sent;
                        _context.next = 20;
                        return toDataURL(f, (0, _changlinUtil.extend)({ type: files[i].type }, defaultOption));

                    case 20:
                        _r = _context.sent;

                        result.push({
                            result: _r,
                            name: files[i].name,
                            type: files[i].type
                        });

                    case 22:
                        i++;
                        _context.next = 14;
                        break;

                    case 25:
                        return _context.abrupt('return', result);

                    case 26:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function chooseImagemin(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _changlinUtil = require('changlin-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function chooseImage() {
    return new _promise2.default(function (resolve, reject) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', 'multiple');
        input.setAttribute('accept', 'image/png,image/jpeg,image/gif,image/jpg');
        input.addEventListener('change', function () {
            var files = [].concat((0, _toConsumableArray3.default)(this.files));
            files = files.filter(function (f) {
                return (/\.(jpg|jpeg|gif|png)$/i.test(f.name)
                );
            });
            resolve(files);
        }, false);
        input.click();
    });
}

function readFileAsDataURL(file) {
    return new _promise2.default(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(this.result);
        };
        reader.onerror = function (e) {
            reject(e);
        };
        reader.readAsDataURL(file);
    });
}

function toDataURL(path, option) {
    return new _promise2.default(function (resolve, reject) {
        var img = new Image();

        img.onload = function () {
            var w = img.width,
                h = img.height,
                scale = w / h;
            w = option.width || w;
            h = option.height || w / scale;
            var quality = option.quality || 0.7; // 默认图片质量为0.7
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var anw = document.createAttribute("width"),
                anh = document.createAttribute("height");
            anw.nodeValue = w;
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL(option.type, quality));
        };
        img.onerror = function (e) {
            reject(e);
        };
        img.src = path;
    });
}