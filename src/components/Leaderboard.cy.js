import React from "react";
import LeaderBoard from "./Leaderboard";

describe("<LeaderBoard />", () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    context("Leaderboard testing", () => {
        beforeEach(() => {
            cy.mount(<LeaderBoard />);
        });
        it("fetch leaderboard score", () => {
            cy.request({
                method: "GET",
                url: apiUrl + "/rest/v1/scores",
                headers: { apiKey: apiKey },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).length.to.be.greaterThan(1);
            });
            cy.get("[data-cy=leaderBoard]").should("have.length", 1);
        });
        it("Update leaderboard score", () => {
            cy.request({
                method: "POST",
                url: apiUrl + "/rest/v1/scores",
                headers: { apiKey: apiKey },
                body: { name: "test", highScore: "3" },
            }).then((response) => {
                expect(response.status).to.eq(201);
            });
        });
    });
});
