import { React } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "../../services/api";
import AddSynonym from "../../components/AddSynonym";

jest.mock("../../services/api");

describe("AddSynonym Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component", () => {
    render(<AddSynonym />);
    expect(screen.getByPlaceholderText(/Enter a word/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter synonym/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Synonym/i })
    ).toBeInTheDocument();
  });

  test("displays an error message when fields are empty and button is clicked", async () => {
    render(<AddSynonym />);

    fireEvent.click(screen.getByRole("button", { name: /Add Synonym/i }));

    expect(
      await screen.findByText(/Please enter both fields/i)
    ).toBeInTheDocument();
  });

  test("displays an error message when fields are empty and enter key is pressed", async () => {
    render(<AddSynonym />);

    const input = screen.getByPlaceholderText(/Enter a word/i);
    fireEvent.keyUp(input, { key: "Enter" });

    expect(
      await screen.findByText(/Please enter both fields/i)
    ).toBeInTheDocument();
  });

  test("successfully adds a synonym and resets fields", async () => {
    axios.post.mockResolvedValueOnce({
      data: { word: "happy", synonym: "joyful" },
    });

    render(<AddSynonym />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const button = screen.getByRole("button", { name: /Add Synonym/i });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(button);

    expect(
      await screen.findByText(/Synonym added successfully!/i)
    ).toBeInTheDocument();
    expect(wordInput.value).toBe("");
    expect(synonymInput.value).toBe("");
  });

  test("displays an error message when API call fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<AddSynonym />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const button = screen.getByRole("button", { name: /Add Synonym/i });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(button);

    expect(
      await screen.findByText(/Failed to add synonyms/i)
    ).toBeInTheDocument();
  });
});
