import React from "react";
import LeaderBoard from "./Leaderboard";

describe("<LeaderBoard />", () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    context("Increase resolution", () => {
        beforeEach(() => {
            cy.mount(<LeaderBoard />);
        });
    });
    context("GET /scores", () => {
        it("fetch leaderboard score", () => {
            cy.request({
                method: "GET",
                url: apiUrl + "/rest/v1/scores",
                headers: { apiKey: apiKey },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).length.to.be.greaterThan(1);
            });
        });
    });
    context("POST /scores", () => {
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
