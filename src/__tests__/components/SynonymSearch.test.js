import { React } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "../../services/api";
import SynonymSearch from "../../components/SynonymSearch";

jest.mock("../../services/api");

describe("SynonymSearch", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SynonymSearch component", () => {
    render(<SynonymSearch />);

    const input = screen.getByPlaceholderText(/Enter a word/i);
    const button = screen.getByRole("button", { name: /Search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("displays synonyms on successful API call", async () => {
    const mockSynonyms = ["happy", "joyful"];
    axios.post.mockResolvedValueOnce({ data: { synonyms: mockSynonyms } });

    render(<SynonymSearch />);

    const input = screen.getByPlaceholderText(/Enter a word/i);
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "cheerful" } });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Synonyms fetched successfully/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/happy, joyful/i)).toBeInTheDocument();
    });
  });

  test("displays error message on failed API call", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<SynonymSearch />);

    const input = screen.getByPlaceholderText(/Enter a word/i);
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "unknown" } });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch synonyms/i)).toBeInTheDocument();
    });
  });

  test("handles empty input gracefully", async () => {
    render(<SynonymSearch />);

    const button = screen.getByRole("button", { name: /Search/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(await screen.findByText(/Please enter a word/i)).toBeInTheDocument();
  });

  test("displays message when no synonyms found", async () => {
    axios.post.mockResolvedValueOnce({ data: { synonyms: [] } });

    render(<SynonymSearch />);

    const input = screen.getByPlaceholderText(/Enter a word/i);
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "cheerful" } });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/No synonyms found. Try adding some!/i)
      ).toBeInTheDocument();
    });
  });

  test("allows searching by pressing the Enter key", async () => {
    const mockSynonyms = ["happy", "joyful"];
    axios.post.mockResolvedValueOnce({ data: { synonyms: mockSynonyms } });

    render(<SynonymSearch />);

    const input = screen.getByPlaceholderText(/Enter a word/i);

    fireEvent.change(input, { target: { value: "cheerful" } });

    await act(async () => {
      fireEvent.keyUp(input, { key: "Enter", code: "Enter", charCode: 13 });
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Synonyms fetched successfully/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/happy, joyful/i)).toBeInTheDocument();
    });
  });
});
