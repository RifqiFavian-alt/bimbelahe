describe("Landing page testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // testing navbar
  it("should show navbar link content correctly", () => {
    const links = ["Beranda", "Tentang", "Kuesioner", "Ulasan", "Kontak"];
    cy.get("nav").within(() => {
      links.forEach((text) => {
        cy.contains(text).should("exist");
      });
    });
  });

  // testing hero section
  it("should show hero section correctly", () => {
    cy.get(".hero .hero__text button")
      .should("have.length", 2)
      .then((buttons) => {
        expect(buttons[0]).to.contain.text("Mulai Belajar");
        expect(buttons[1]).to.contain.text("Hubungi Kami");
      });
  });

  // testing program section
  it("should show program section correctly", () => {
    cy.get(".card__program .card__program__card .card")
      .should("have.length.at.least", 3)
      .then((cards) => {
        expect(cards[0]).to.contain.text("Ala Sekolah");
        expect(cards[1]).to.contain.text("Prisma");
        expect(cards[2]).to.contain.text("Brainy");
      });
  });

  // testing galeri section
  it("should show galeri section correctly", () => {
    cy.get(".galeri img").should("have.length.at.least", 7);
  });

  // testing other section
  it("should show other section correctly", () => {
    cy.get(".other button").should("exist").should("contain.text", "Diskusikan");
  });

  // testing carousel section
  it("should get carousel data correctly", () => {
    cy.intercept("GET", "/api/questionnaires/read?isFeatured=true").as("getCarousel");
    cy.wait("@getCarousel");
    cy.get(".embla__slide").should("have.length.at.least", 1);
  });

  // testing footer section
  it("should show footer section correctly", () => {
    cy.get(".footer__container").should("exist");
  });
});
