describe("Registration testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/registration");
  });

  it("should show registration form correctly", () => {
    cy.get("form").should("exist");
  });

  it("should register successfully", () => {
    cy.get("form").within(() => {
      cy.get('input[name="fullname"]').type("John Doe");
      cy.get('input[name="callname"]').type("John");
      cy.get('input[name="birthday"]').type("Jakarta, 01 Januari 2000");
      cy.get('input[name="parentmom"]').type("Jane Doe");
      cy.get('input[name="parentdad"]').type("John Doe");
      cy.get('textarea[name="address"]').type("123 Main St, Anytown, USA");
      cy.get('input[name="phone"]').type("085123456789");
      cy.get('input[name="info"]').type("Instagram");
    });

    cy.get("button[type='submit']").contains("Daftar").click();
    cy.get(".pdf-button a").should("have.length.at.least", 2).should("exist");
    cy.get(".pdf-button a").contains("Download Formulir").click();
  });
});
