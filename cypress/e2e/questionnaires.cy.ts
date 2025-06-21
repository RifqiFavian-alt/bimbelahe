describe("Questionnaires testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/questionnaires");
  });

  it("fill questionnaires until finish", () => {
    cy.get(".questionnaires__form-input-user input").should("have.length.at.least", 2).should("exist");
    cy.get(".questionnaires__form-input-user input[name='name']").type("John Doe").should("have.value", "John Doe");
    cy.get(".questionnaires__form-input-user input[name='email']").type("jdoe@me.com").should("have.value", "jdoe@me.com");
    cy.get(".questionnaires__form-input-user__submit").contains("Mulai").click();

    for (let i = 0; i < 4; i++) {
      cy.get(".questionnaires__container").should("exist");
      cy.get("label").contains("Sangat Baik").should("exist").click();
      cy.wait(1000);
      cy.get(".questionnaires__navigation button").contains("Selanjutnya").click();
      cy.wait(1000);
    }
    cy.get("textarea").should("exist").type("Kami sangat menyukai bimbel AHE");
    cy.get(".questionnaires__navigation button").contains("Selesai").click();

    cy.get("p").contains("Terima kasih telah membantu kami menjadi lebih baik untuk Anda. Bersama kita ciptakan pengalaman belajar yang luar biasa!").should("exist");
    cy.get(".questionnaires__form-input-user__submit").contains("Kembali").click();
  });
});
