import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import Ad, { loader as ad } from './ad';
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe('Ad', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the ads from the API', async () => {
    fetchMock.mockResponse(JSON.stringify({
      "id": 1,
      "name": "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550",
      "campaign_id":1,
      "booked_amount": "430706.6871532752",
      "actual_amount": "401966.50504006835",
      "adjustments": "1311.0731142230268",
    }),
    {
      status: 200
    });

    const router = createMemoryRouter([
      {
        path: "ad/:campaignId",
        element: <Ad />,
        loader: ad,
      },
    ], {
      initialEntries: ["/ad/1"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const adIdCell = screen.getByText(/Ad ID: 1/);
    expect(adIdCell).toBeInTheDocument();

    const adNameCell = screen.getByText(/Ad Name: Satterfield-Turcotte : Multi-channelled next generation analyzer - e550/);
    expect(adNameCell).toBeInTheDocument();

    const campaignIdCell = screen.getByText(/Campaign ID: 1/);
    expect(campaignIdCell).toBeInTheDocument();

    const bookedAmountCell = screen.getByText(/Booked Amount: 430706.6871532752/);
    expect(bookedAmountCell).toBeInTheDocument();

    const actualAmountCell = screen.getByText(/Actual Amount: 401966.50504006835/);
    expect(actualAmountCell).toBeInTheDocument();

    const adjustmentsCell = screen.getByText(/Adjustments: 1311.0731142230268/);
    expect(adjustmentsCell).toBeInTheDocument();
  });

  it('renders a message if the details can not be fetched from the API', async () => {
    fetchMock.mockResponse(
      JSON.stringify({}),
      {
        status: 404
      }
    );

    const router = createMemoryRouter([
      {
        path: "ad/:campaignId",
        element: <Ad />,
        loader: ad,
      },
    ], {
      initialEntries: ["/ad/1"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const noDetailsMessage = screen.getByText("No details found for this ad!");
    expect(noDetailsMessage).toBeInTheDocument();
  });
});