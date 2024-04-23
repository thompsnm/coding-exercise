import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import Campaign, { loader as campaignLoader } from './campaign';
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe('Campaign', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the ads from the API', async () => {
    fetchMock.mockResponse(JSON.stringify([
      {
        "id":1,
        "name":"Awesome Plastic Car - 6475",
        "booked_amount": "430706.6871532752",
        "actual_amount": "401966.50504006835",
        "adjustments": "1311.0731142230268",
        "createdAt":"2024-04-19T03:45:59.045Z",
        "updatedAt":"2024-04-19T03:45:59.045Z"
      }
    ]));

    const router = createMemoryRouter([
      {
        path: "campaign/:campaignId",
        element: <Campaign />,
        loader: campaignLoader,
      },
    ], {
      initialEntries: ["/campaign/1"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const rowCount = screen.getAllByRole("row");
    expect(rowCount.length).toEqual(2);

    const idCell = screen.getByRole("cell", {name: 1});
    expect(idCell).toBeInTheDocument();

    const nameCell = screen.getByText("Awesome Plastic Car - 6475");
    expect(nameCell).toBeInTheDocument();

    const bookedAmountCell = screen.getByText("430706.6871532752");
    expect(bookedAmountCell).toBeInTheDocument();

    const actualAmountCell = screen.getByText("401966.50504006835");
    expect(actualAmountCell).toBeInTheDocument();

    const adjustmentsCell = screen.getByText("1311.0731142230268");
    expect(adjustmentsCell).toBeInTheDocument();
  });

  it('renders an empty ads table if an empty data set is returned from the API', async () => {
    fetchMock.mockResponse(JSON.stringify([]));

    const router = createMemoryRouter([
      {
        path: "campaign/:campaignId",
        element: <Campaign />,
        loader: campaignLoader,
      },
    ], {
      initialEntries: ["/campaign/1"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const rowCount = screen.getAllByRole("row");
    expect(rowCount.length).toEqual(1);
  });
});