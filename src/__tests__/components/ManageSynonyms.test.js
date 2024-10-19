import { React } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "../../services/api";
import ManageSynonyms from "../../components/ManageSynonyms";

jest.mock("../../services/api");

describe("ManageSynonyms Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component", () => {
    render(<ManageSynonyms />);
    expect(screen.getByPlaceholderText(/Enter a word/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter synonym/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Synonym/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete Synonym/i })
    ).toBeInTheDocument();
  });

  test("displays an error message when fields are empty and add button is clicked", async () => {
    render(<ManageSynonyms />);

    fireEvent.click(screen.getByRole("button", { name: /Add Synonym/i }));

    expect(
      await screen.findByText(/Please enter both fields/i)
    ).toBeInTheDocument();
  });

  test("displays an error message when fields are empty and delete button is clicked", async () => {
    render(<ManageSynonyms />);

    fireEvent.click(screen.getByRole("button", { name: /Delete Synonym/i }));

    expect(
      await screen.findByText(/Please enter both fields/i)
    ).toBeInTheDocument();
  });

  test("successfully adds a synonym and resets fields", async () => {
    axios.post.mockResolvedValueOnce({
      data: { word: "happy", synonym: "joyful" },
    });

    render(<ManageSynonyms />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const addButton = screen.getByRole("button", { name: /Add Synonym/i });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(addButton);

    expect(
      await screen.findByText(
        /Synonym "joyful" added successfully for "happy"!/i
      )
    ).toBeInTheDocument();
    expect(wordInput.value).toBe("");
    expect(synonymInput.value).toBe("");
  });

  test("successfully deletes a synonym and resets fields", async () => {
    axios.post.mockResolvedValueOnce({
      data: { word: "happy", synonym: "joyful" },
    });

    render(<ManageSynonyms />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const deleteButton = screen.getByRole("button", {
      name: /Delete Synonym/i,
    });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(deleteButton);

    expect(
      await screen.findByText(
        /Synonym "joyful" deleted successfully from "happy"!/i
      )
    ).toBeInTheDocument();
    expect(wordInput.value).toBe("");
    expect(synonymInput.value).toBe("");
  });

  test("displays an error message when add API call fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<ManageSynonyms />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const addButton = screen.getByRole("button", { name: /Add Synonym/i });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(addButton);

    expect(
      await screen.findByText(/Failed to add synonym/i)
    ).toBeInTheDocument();
  });

  test("displays an error message when delete API call fails", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Network Error"));

    render(<ManageSynonyms />);

    const wordInput = screen.getByPlaceholderText(/Enter a word/i);
    const synonymInput = screen.getByPlaceholderText(/Enter synonym/i);
    const deleteButton = screen.getByRole("button", {
      name: /Delete Synonym/i,
    });

    fireEvent.change(wordInput, { target: { value: "happy" } });
    fireEvent.change(synonymInput, { target: { value: "joyful" } });

    fireEvent.click(deleteButton);

    expect(
      await screen.findByText(/Failed to delete synonym/i)
    ).toBeInTheDocument();
  });
});
