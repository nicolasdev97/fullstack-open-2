import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import SignInContainer from "../SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit with correct arguments", async () => {
      const mockSubmit = jest.fn();

      const { getByTestId } = render(<SignInContainer onSubmit={mockSubmit} />);

      const usernameInput = getByTestId("usernameField");
      const passwordInput = getByTestId("passwordField");
      const submitButton = getByTestId("submitButton");

      await act(async () => {
        fireEvent.changeText(usernameInput, "kalle");
      });

      await act(async () => {
        fireEvent.changeText(passwordInput, "password");
      });

      await act(async () => {
        fireEvent.press(submitButton);
      });

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
