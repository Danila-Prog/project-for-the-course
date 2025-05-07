import { ChangeEvent, useEffect, useState } from "react";
import FormOrder from "../ui/FormOrder";
import FormEditingOrder from "../ui/FormEditingOrder";
import ModalDeleteOrder from "../ui/ModalDeleteOrder";
// import { filterUsers } from "../ui/FilterUsers";
// import { mockUsers } from "@/pages/AccountePage/lib/mock";
import { useFetch } from "@/shared/api/useFetch";

export default function useUserLogistician() {
  const [modalFormOrder, setModaFormOrder] = useState<boolean>(false);
  const [modalFormEditingOrder, setModalFormEditingOrder] =
    useState<boolean>(false);
  const [modalDeleteOrder, setModalDeleteOrder] = useState<boolean>(false);
  const [activeDrive, setActiveDriver] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    search: "",
    experienceFrom: "",
    experienceBefore: "",
    capacityFrom: "",
    capacityBefore: "",
    typeCar: "",
  });

  const handleFiltersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModalFormOrder = () => {
    setModaFormOrder((modal) => !modal);
  };

  const handleCloseModalFormEditingOrder = () =>
    setModalFormEditingOrder((modal) => !modal);

  const handleCloseModalDeleteOrder = () =>
    setModalDeleteOrder((modal) => !modal);

  const handleActiveDriver = (typeButton: string) => {
    if (typeButton === "active") {
      setActiveDriver(true);
    } else {
      setActiveDriver(false);
    }
  };
  const [companyId, setCompanyId] = useState<string | null>("");

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);
  const { dataUsers } = useFetch();

  const companyDrivers = dataUsers.data.filter(
    (user) =>
      Number(user.company_id) === Number(companyId) &&
      Number(user.role_id) === 1
  );
  console.log(companyDrivers);

  // const filterUser = filterUsers(companyDrivers, filters);

  // const allDriverFilter = filterUser.filter(
  //   (user) => user.status === "Доступен"
  // );

  // const activeDriverFilter = filterUser.filter(
  //   (user) => user.status !== "Доступен"
  // );

  const formOrder = (
    <FormOrder
      modalFormOrder={modalFormOrder}
      handleCloseModalFormOrder={handleCloseModalFormOrder}
    />
  );

  const formEditingOrder = (
    <FormEditingOrder
      modalFormEditingOrder={modalFormEditingOrder}
      handleCloseModalFormEditingOrder={handleCloseModalFormEditingOrder}
    />
  );
  const deleteOrder = (
    <ModalDeleteOrder
      modalDeleteOrder={modalDeleteOrder}
      handleCloseModalDeleteOrder={handleCloseModalDeleteOrder}
    />
  );
  return {
    companyDrivers,
    activeDrive,
    filters,
    // allDriverFilter,
    // activeDriverFilter,
    formOrder,
    formEditingOrder,
    deleteOrder,
    handleFiltersChange,
    handleActiveDriver,
    handleCloseModalFormOrder,
    handleCloseModalFormEditingOrder,
    handleCloseModalDeleteOrder,
  };
}
