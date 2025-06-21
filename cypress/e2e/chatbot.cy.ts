describe("Chatbot testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // testing chatbot appearance
  it("should show chatbot correctly", () => {
    cy.get(".chatbot__button").should("exist").click();
    cy.get(".chat-container").should("exist");
  });

  // testing chatbot functionality
  it("should show chatbot correctly", () => {
    cy.get(".chatbot__button").should("exist").click();
    cy.get(".chatbot__input").type("Halo! Bisa bantu saya mengetahui informasi terkait bimbel AHE?").should("have.value", "Halo! Bisa bantu saya mengetahui informasi terkait bimbel AHE?");
    cy.get(".chatbot__send-button").click();
    cy.get(".message-user").should("exist").contains("Halo! Bisa bantu saya mengetahui informasi terkait bimbel AHE?");
    cy.intercept("POST", "/api/chat").as("getChatbotMessage").wait("@getChatbotMessage");
    cy.get(".message-assistant").should("exist").should("have.length.at.least", 2);
  });
});
