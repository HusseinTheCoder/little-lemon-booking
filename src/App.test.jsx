
import {
    render,
    screen,
    fireEvent,
    cleanup,
} from "@testing-library/react";

import { afterEach, describe, it, expect } from "vitest";
import App from "./App";

afterEach(() => {
    cleanup();
});

describe("Little Lemon booking form", () => {
    it("renders the reservation form", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", { name: /reserve your table/i })
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/full name/i)
        ).toBeInTheDocument();
    });

    it("shows an error when the name is empty", () => {
        render(<App />);

        fireEvent.change(screen.getByLabelText(/choose date/i), {
            target: { value: "2026-10-23" },
        });

        fireEvent.change(screen.getByLabelText(/choose time/i), {
            target: { value: "18:00" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /confirm reservation/i })
        );

        expect(screen.getByRole("alert")).toHaveTextContent(
            /please enter your name/i
        );
    });

    it("shows a confirmation for valid booking details", () => {
        render(<App />);

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "Test Guest" },
        });

        fireEvent.change(screen.getByLabelText(/choose date/i), {
            target: { value: "2026-10-23" },
        });

        fireEvent.change(screen.getByLabelText(/choose time/i), {
            target: { value: "18:00" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /confirm reservation/i })
        );

        expect(
            screen.getByText(/reservation request confirmed/i)
        ).toBeInTheDocument();
    });
});
