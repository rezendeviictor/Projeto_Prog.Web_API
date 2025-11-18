import Pet from "../../models/pet.model";

describe('Pet model', () => {
    it('deveria criar uma instancia de pet', () => {
        const pet = new Pet();
        pet.nome = "Rex";
        pet.tutor = "Joao";
        pet.CPF_tutor = "12345678900";
        pet.tipo = "Cachorro";

        expect(pet.nome).toBe("Rex");
        expect(pet.tutor).toBe("Joao");
        expect(pet.id_pet).toBeUndefined();
    });
});