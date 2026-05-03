import React from "react";
import { render } from "@testing-library/react-native";

import { RepositoryListContainer } from "../RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "end",
          startCursor: "start",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "url",
            },
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "url",
            },
          },
        ],
      };

      const { getByText, getAllByText } = render(
        <RepositoryListContainer repositories={repositories} />,
      );

      // First repository
      expect(getByText("jaredpalmer/formik")).toBeTruthy();
      expect(getByText("Build forms in React, without the tears")).toBeTruthy();
      expect(getByText("TypeScript")).toBeTruthy();

      // Second repository
      expect(getByText("async-library/react-async")).toBeTruthy();
      expect(
        getByText("Flexible promise-based React data loader"),
      ).toBeTruthy();
      expect(getByText("JavaScript")).toBeTruthy();

      // Formatted numbers
      expect(getByText("1.6k")).toBeTruthy(); // forksCount
      expect(getByText("21.9k")).toBeTruthy(); // stars
      expect(getByText("88")).toBeTruthy();

      // Review count should be "3" for both repositories
      const reviewCounts = getAllByText("3");
      expect(reviewCounts).toHaveLength(2);
    });
  });
});
