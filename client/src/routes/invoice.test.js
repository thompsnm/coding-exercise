import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import Invoice, { loader as invoiceLoader } from './invoice';
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe('Invoice', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the ads from the API', async () => {
    fetchMock.mockResponse(JSON.stringify({
      "campaignId":1,
      "bookedAmount": "430706.6871532752",
      "actualAmount": "401966.50504006835",
      "adjustments": "1311.0731142230268",
    }),
    {
      status: 200
    });

    const router = createMemoryRouter([
      {
        path: "campaign/:campaignId/invoice",
        element: <Invoice />,
        loader: invoiceLoader,
      },
    ], {
      initialEntries: ["/campaign/1/invoice"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const bookedAmountCell = screen.getByText(/430706.6871532752/);
    expect(bookedAmountCell).toBeInTheDocument();

    const actualAmountCell = screen.getByText(/401966.50504006835/);
    expect(actualAmountCell).toBeInTheDocument();

    const adjustmentsCell = screen.getByText(/1311.0731142230268/);
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
        path: "campaign/:campaignId/invoice",
        element: <Invoice />,
        loader: invoiceLoader,
      },
    ], {
      initialEntries: ["/campaign/1/invoice"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const noDetailsMessage = screen.getByText("No details found for this invoice!");
    expect(noDetailsMessage).toBeInTheDocument();
  });
});