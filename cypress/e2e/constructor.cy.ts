import { NORMA_API } from "../../src/utils/burger-api";

describe("drags ingredients", () => {
    beforeEach(() => {
        cy.fillContentAndVisit();
    });


    it("should drag a bun", () => {
        cy.wait(500); // Give a moment for react-dnd's drag event listeners to setup
        cy.get("[data-test='bun']").contains("Краторная булка N-200i").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.wait(500); // Let react-dnd update its internal state (fixes Cannot call hover while not dragging.)
        cy.get("[data-test='bun-top']").contains("Краторная булка N-200i (верх)").should("exist");
        cy.get("[data-test='bun-bottom']").contains("Краторная булка N-200i (низ)").should("exist");

    })

    it("should drag a sauce", () => {
        cy.wait(500); // Give a moment for react-dnd's drag event listeners to setup
        cy.get("[data-test='sauce']").contains("Соус Spicy-X").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.get("[data-test='filling-container']").contains("Соус Spicy-X").should("exist");
        cy.wait(500); // Let react-dnd update its internal state (fixes Cannot call hover while not dragging.)
    })

    it("should drag a main", () => {
        cy.wait(500); // Give a moment for react-dnd's drag event listeners to setup
        cy.get("[data-test='main']").contains("Биокотлета из марсианской Магнолии").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.get("[data-test='filling-container']").contains("Биокотлета из марсианской Магнолии").should("exist");
        cy.wait(500); // Let react-dnd update its internal state (fixes Cannot call hover while not dragging.)
    })

})

describe("ingredients modal", () => {
    beforeEach(() => {
        cy.fillContentAndVisit();
    });

    it("should open modal", () => {
        cy.get("[data-test='main']").contains("Мини-салат Экзо-Плантаго").click();
        cy.get("[data-test='modal']").contains("Детали ингредиента").should("exist");
        cy.get("[data-test='modal']").contains("Мини-салат Экзо-Плантаго").should("exist");
    })

    it("should close modal on icon click", () => {
        cy.get("[data-test='main']").contains("Мини-салат Экзо-Плантаго").click();
        cy.get("[data-test='modal']").contains("Детали ингредиента").should("exist");

        cy.get("[data-test='modal-close']").click();
        cy.contains("Детали ингредиента").should("not.exist");
    })

    it("should close modal on overlay click", () => {
        cy.get("[data-test='main']").contains("Мини-салат Экзо-Плантаго").click();
        cy.get("[data-test='modal']").contains("Детали ингредиента").should("exist");
        cy.get("[data-test='modal-overlay']").click({ force: true });
        cy.contains("Детали ингредиента").should("not.exist");
    })
})

describe("order modal", () => {
    beforeEach(() => {
        cy.fillContentAndVisit();
        cy.intercept("GET", `${NORMA_API}auth/user`, {
            fixture: "user"
        });
        cy.intercept("POST", `${NORMA_API}orders`, {
            fixture: "order"
        }).as("postOrder");

    })

    it("should properly form order, open and close modal", () => {
        //перетаскиваем булочку
        cy.wait(500);
        cy.get("[data-test='bun']").contains("Краторная булка N-200i").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.wait(500);

        //перетаскиваем соус
        cy.wait(500);
        cy.get("[data-test='sauce']").contains("Соус Spicy-X").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.wait(500);

        //перетаскиваем начинку
        cy.wait(500); 
        cy.get("[data-test='main']").contains("Биокотлета из марсианской Магнолии").trigger("dragstart");
        cy.get("[data-test='constructor']").trigger("drop");
        cy.wait(500);

        //нажимаем на кнопку оформления заказа
        cy.get("[data-test='order-button']").click();

        //проверяем как сформировались атрибуты запроса
        cy.wait('@postOrder')
            .its("request.body")
            .should("deep.equal", {
                ingredients: [
                    "643d69a5c3f7b9001cfa093c",
                    "643d69a5c3f7b9001cfa0942",
                    "643d69a5c3f7b9001cfa0941",
                    "643d69a5c3f7b9001cfa093c"
                ]
            });
        
        //номер заказа соответствует моку
        cy.get("[data-test='order-number']").should("have.text", "007951");
        //закрытие модального окна
        cy.get("[data-test='modal-close']").click();
        cy.contains("[data-test='order-number']").should("not.exist");

    })
});