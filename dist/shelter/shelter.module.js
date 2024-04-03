"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShelterModule = void 0;
const common_1 = require("@nestjs/common");
const shelter_controller_1 = require("./shelter.controller");
const shelter_tokens_1 = require("./shelter.tokens");
const get_shelter_details_usecase_1 = require("./usecases/get.shelter.details.usecase");
let ShelterModule = class ShelterModule {
};
exports.ShelterModule = ShelterModule;
exports.ShelterModule = ShelterModule = __decorate([
    (0, common_1.Module)({
        controllers: [shelter_controller_1.ShelterController],
        providers: [
            {
                provide: shelter_tokens_1.default.getShelterDetailsUseCase,
                useClass: get_shelter_details_usecase_1.default
            }
        ]
    })
], ShelterModule);
//# sourceMappingURL=shelter.module.js.map