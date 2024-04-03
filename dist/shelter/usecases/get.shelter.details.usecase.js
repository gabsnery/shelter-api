"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_shelter_details_usecase_output_1 = require("./dtos/get.shelter.details.usecase.output");
class GetShelterDetailsUseCase {
    run(input) {
        return Promise.resolve(new get_shelter_details_usecase_output_1.default({
            shelterName: 'casadosdog',
            shelterWhatsapp: '15998550238',
            shelterEmail: 'casadosdog@gmail.com',
            shelterPhone: '15998550238',
            createAt: new Date(),
            updateAt: new Date()
        }));
    }
}
exports.default = GetShelterDetailsUseCase;
//# sourceMappingURL=get.shelter.details.usecase.js.map