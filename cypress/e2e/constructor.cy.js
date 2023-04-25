import auth from "../fixtures/auth.json";

describe("Burger constructor page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/react-burger");
  });

  it("Should show menu ingredient details", () => {
    cy.contains("Конструктор");
    cy.contains("Соберите бургер");
    cy.get("[class^=burger-ingredient_link]").first().as("ingredient");
    cy.get("@ingredient")
      .find("h3")
      .invoke("text")
      .then((namePage) => {
        cy.get("@ingredient").click();
        cy.get("[class^=modal_wrapper]").as("modal");
        cy.get("@modal").contains("Детали ингредиента");
        cy.get("@modal")
          .find("h3")
          .invoke("text")
          .should((nameModal) => {
            expect(namePage).to.eq(nameModal);
          });
      });
    cy.get("[class^=modal_control]").click();
    cy.get("[class^=modal_wrapper]").should("not.exist");
  });

  it("Should create authorized burger order", () => {
    cy.get("[class^=burger-ingredients_container] ul").as("menu");
    cy.get("@menu")
      .eq(0)
      .find("[class^=burger-ingredient_link]")
      .first()
      .as("bun");
    cy.get("@menu")
      .eq(1)
      .find("[class^=burger-ingredient_link]")
      .first()
      .as("ingredient");
    cy.get("[class^=burger-constructor_wrapper").first().as("order");
    cy.get("[class^=burger-constructor_total]").as("order-total");
    cy.get("[class^=burger-constructor_result] button").as("order-button");

    cy.get("@order-total").should("have.text", "0");

    cy.get("@bun").trigger("dragstart");
    cy.get("@order").trigger("drop");
    cy.get("@ingredient").trigger("dragstart");
    cy.get("@order").trigger("drop");
    cy.get("@order-button").click();

    cy.contains("Вход");
    cy.get("[name=email]").type(auth.email);
    cy.get("[name=password]").type(auth.password);
    cy.contains("button", "Войти").click();

    cy.get("@order-button").trigger("click");
    cy.get("[class^=order-details_container]", { timeout: 20000 }).contains(
      /\d+/
    );
    cy.get("[class^=modal_control]").click();

    cy.get("@order-total").should("have.text", "0");
  });
});
