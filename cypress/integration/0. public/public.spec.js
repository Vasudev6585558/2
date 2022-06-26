/// <reference types="cypress" />

describe("Testing Public Module...", () => {
  before(() => {
    cy.logout();
  });
  beforeEach(() => {
    cy.fixture("routes").as("routes");
  });

  it("Displays the news, institution and learners tabs", () => {
    cy.get("@routes").then((routes) => {
      cy.visit(routes.HOME_ROUTE.route);
      cy.get("[data-cy=parent-container]").contains("News");
      cy.get("[data-cy=parent-container]").contains("Institutions");
      cy.get("[data-cy=parent-container]").contains("Learners");
    });
  });

  it("has login button", () => {
    cy.get("@routes").then((routes) => {
      cy.visit(routes.HOME_ROUTE.route);
      cy.get("[data-cy=login-button]").contains("Login");
    });
  });

  it("Displays institution profile properly", () => {
    cy.get("@routes").then((routes) => {
      cy.fixture("existing-records").then((existing) => {
        cy.visit(
          routes.INSTITUTION_PROFILE_ROUTE.route +
            "/" +
            existing.institution.code
        );
        cy.get("[data-cy=institution-name]").contains(
          existing.institution.name
        );
      });
    });
  });
  it("Displays member profile properly", () => {
    cy.get("@routes").then((routes) => {
      cy.fixture("existing-records").then((existing) => {
        cy.visit(
          routes.MEMBER_PROFILE_ROUTE.route + "/" + existing.admin.username
        );
        cy.get("[data-cy=member-name]").contains(existing.admin.name);
      });
    });
  });
  it("Displays privacy page properly", () => {
    cy.get("@routes").then((routes) => {
      cy.visit(routes.PRIVACY_ROUTE.route);
      cy.get("[data-cy=page-title]").contains("Privacy Policy");
    });
  });
  it("Displays terms and conditions page properly", () => {
    cy.get("@routes").then((routes) => {
      cy.visit(routes.TERMS_CONDITIONS_ROUTE.route);
      cy.get("[data-cy=page-title]").contains("Terms and Conditions");
    });
  });
  it("Displays copyright text on home page", () => {
    cy.get("@routes").then((routes) => {
      cy.visit(routes.HOME_ROUTE.route);
      const currentYear = new Date().getFullYear();
      cy.get(".footer").contains(
        `Copyright © ${currentYear} Shuddhi Vidhya Initiative, Shuddhi Trust, All Rights Reserved`
      );
    });
  });
});
