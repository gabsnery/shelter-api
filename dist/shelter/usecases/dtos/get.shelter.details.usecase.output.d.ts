export default class getShelterDetailsUseCaseOutput {
    shelterName: string;
    shelterWhatsapp: string;
    shelterEmail: string;
    shelterPhone: string;
    createAt: Date;
    updateAt: Date;
    constructor(data: Partial<getShelterDetailsUseCaseOutput>);
}
