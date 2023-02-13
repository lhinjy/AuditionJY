/* eslint-disable cypress/no-unnecessary-waiting */
import React from "react";
import TypingGame from "./TypingGame";

describe("<TypingGame />", () => {
    context("Increase resolution", () => {
        beforeEach(() => {
            cy.viewport(1080, 900);
            cy.mount(<TypingGame />);
        });
        it("User starts game", () => {
            cy.get("[data-cy=character]").click({ multiple: true });
            cy.get("[data-cy=character]").type("w");
            cy.wait(1000);
            cy.get("[data-cy=counter").should("have.text", "14");
        });

        it("User passes stage 1", () => {
            cy.get("[data-cy=character]").click({ multiple: true });
            cy.get("[data-cy=character]").type("w");
            cy.get("[data-cy=character]").type("a");
            cy.get("[data-cy=character]").type("s");
            cy.get("[data-cy=character]").type("d");
            cy.get("[data-cy=score").should("have.text", "1");
        });

        it("User time out", () => {
            cy.get("[data-cy=character]").click({ multiple: true });
            cy.get("[data-cy=character]").type("w");
            cy.wait(16000);
            cy.get("[data-cy=counter").should("have.text", "0");
            cy.get("[data-cy=score").should("have.text", "0");
        });

        it("User restart the game", () => {
            cy.get("[data-cy=reset]").should("have.text", "Restart Game");
            cy.get("[data-cy=reset]").click();
            cy.get("[data-cy=counter]").should("have.text", "15");
            cy.get("[data-cy=score]").should("have.text", "0");
        });
    });
});
