"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const underscore_1 = __importDefault(require("underscore"));
exports.default = (sp) => ({
    getList: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const res = yield sp[resource].find(Object.assign({}, params.filter), {
            limit: (_a = params.pagination) === null || _a === void 0 ? void 0 : _a.perPage,
            offset: ((((_b = params === null || params === void 0 ? void 0 : params.pagination) === null || _b === void 0 ? void 0 : _b.page) || 0) - 1) *
                (((_c = params === null || params === void 0 ? void 0 : params.pagination) === null || _c === void 0 ? void 0 : _c.perPage) || 0),
        });
        return {
            data: res.data,
            total: res.total,
        };
    }),
    getOne: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].findOne({
            id: params.id,
        });
        return {
            data: res,
        };
    }),
    getMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].find({
            id: { $in: params.ids },
        });
        return {
            data: res.data,
        };
    }),
    getManyReference: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].find(Object.assign({}, params.filter));
        return {
            data: res.data,
            total: res.total,
        };
    }),
    update: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedFileds = underscore_1.default.pick(params.data, (value, key) => !underscore_1.default.isEqual(value, params.previousData[key]));
        const res = yield sp[resource].patch({ id: params.id }, Object.assign({}, updatedFileds), {
            returnUpdatedEntities: true,
        });
        return {
            data: (res === null || res === void 0 ? void 0 : res.updated) ? res.updated[0] : {},
        };
    }),
    updateMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        yield sp[resource].patchIn(params.ids, Object.assign({}, params.data));
        return {
            data: params.ids,
        };
    }),
    create: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].create(Object.assign({}, params.data));
        return {
            data: res,
        };
    }),
    delete: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].deleteOne({
            id: params.id,
        }, {
            returnUpdatedEntities: true,
        });
        return {
            data: res.deleted ? res.deleted[0] : {},
        };
    }),
    deleteMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        yield sp[resource].deleteIn(params.ids);
        return {
            data: params.ids,
        };
    }),
});
//# sourceMappingURL=index.js.map