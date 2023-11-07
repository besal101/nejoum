import { useState } from "react";
import { AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import ClipLoader from "react-spinners/ClipLoader";
import Container from "./components/container";
import { useFetchAllCars } from "./query/cars-query/get-all-cars";
import { Cars } from "./types";
import Pagination from "./utils/pagination";
import { useModalAction } from "./context/modal.context";
import { Button } from "./components/ui/button";

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openModal } = useModalAction();
  const { data, isLoading } = useFetchAllCars({
    limit: 10,
    page: currentPage,
  });
  const maxVisiblePages = 6;
  const totalPages = data?.totalPages || 1;
  const adjustedCurrentPage = Math.min(Math.max(1, currentPage), totalPages); // Ensure currentPage is within valid range
  let startPageIndex = Math.max(
    1,
    adjustedCurrentPage - Math.floor(maxVisiblePages / 2)
  );
  let endPageIndex = startPageIndex + maxVisiblePages - 1;

  if (endPageIndex > totalPages) {
    endPageIndex = totalPages;
    startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
  }

  const handleCreate = () => {
    return openModal("CREATE_VIEW");
  };

  const handleEdit = (id: number) => {
    return openModal("EDIT_VIEW", id);
  };

  const handleDelete = (id: number) => {
    return openModal("DELETE_VIEW", id);
  };

  return (
    <Container>
      <div className="panel mt-5 overflow-hidden border-0 p-0">
        <div className="flex flex-row justify-end pr-10 pt-4">
          <Button onClick={handleCreate}>
            <AiOutlinePlus className="mr-2" />
            Create New
          </Button>
        </div>
        <div className="table-responsive mt-3">
          <table className="table-striped table-hover">
            <thead className="uppercase">
              <tr>
                <th>id</th>
                <th>make</th>
                <th>model</th>
                <th>vin</th>
                <th>year</th>
                <th>shipping Status</th>
                <th>actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr className="col-span-full">
                  <td colSpan={2}></td>
                  <td
                    colSpan={1}
                    className="flex justify-center items-center h-20"
                  >
                    <ClipLoader
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.cars.map((car: Cars) => (
                  <tr key={car.id} className="text-center">
                    <td># {car.id}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.vin}</td>
                    <td>{car.year}</td>
                    <td>{car.shippingStatus}</td>
                    <td>
                      <button type="button" onClick={() => handleEdit(car.id)}>
                        <GrEdit className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(car.id)}
                      >
                        <AiTwotoneDelete className="w-5 h-5 ml-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startPageIndex={startPageIndex}
            endPageIndex={endPageIndex}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Container>
  );
};

export default App;
