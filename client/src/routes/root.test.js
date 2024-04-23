import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import Root, { loader as rootLoader } from './root';
import {
  BrowserRouter,
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe('Root', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the campaigns from the API', async () => {
    fetchMock.mockResponse(JSON.stringify([
      {
        "id":1,
        "name":"Satterfield-Turcotte : Multi-channelled next generation analyzer - e550",
        "createdAt":"2024-04-19T03:45:59.045Z",
        "updatedAt":"2024-04-19T03:45:59.045Z"
      }
    ]),
      {
        status: 200
      }
    );

    const router = createMemoryRouter([
      {
        path: "/",
        element: <Root />,
        loader: rootLoader,
      },
    ], {
      initialEntries: ["/"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const rowCount = screen.getAllByRole("row");
    expect(rowCount.length).toEqual(2);

    const idCell = screen.getByRole("cell", {name: 1});
    expect(idCell).toBeInTheDocument();

    const nameCell = screen.getByText("Satterfield-Turcotte : Multi-channelled next generation analyzer - e550");
    expect(nameCell).toBeInTheDocument();
  });

  it('renders an empty campaigns table if an empty data set is returned from the API', async () => {
    fetchMock.mockResponse(
      JSON.stringify([]),
      {
        status: 404
      }
    );

    const router = createMemoryRouter([
      {
        path: "/",
        element: <Root />,
        loader: rootLoader,
      },
    ], {
      initialEntries: ["/"],
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    const rowCount = screen.getAllByRole("row");
    expect(rowCount.length).toEqual(1);
  });
});