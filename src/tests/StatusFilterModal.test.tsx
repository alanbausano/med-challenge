import { render, screen, fireEvent } from "@testing-library/react";
import { useClientStore } from "../store/clientStore";
import { vi } from "vitest";
import StatusFilterModal from "../components/StatusFilter";

vi.mock("../store/clientStore");

describe("StatusFilterModal", () => {
  const mockOnClose = vi.fn();
  const mockSetSelectedStatus = vi.fn();

  beforeEach(() => {
    vi.mocked(useClientStore).mockReturnValue({
      selectedStatus: "",
      setSelectedStatus: mockSetSelectedStatus,
    });
  });

  it("renders the modal when open is true", () => {
    render(<StatusFilterModal open={true} onClose={mockOnClose} />);
    expect(screen.getByText("Medical Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("does not render the modal when open is false", () => {
    render(<StatusFilterModal open={false} onClose={mockOnClose} />);
    expect(screen.queryByText("Medical Status")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(<StatusFilterModal open={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("updates the selected status and calls onClose when a status is selected", () => {
    render(<StatusFilterModal open={true} onClose={mockOnClose} />);
    const select = screen.getByLabelText("Status");
    fireEvent.change(select, { target: { value: "Active" } });
    expect(mockSetSelectedStatus).toHaveBeenCalledWith("Active");
    expect(mockOnClose).toHaveBeenCalled();
  });
});
