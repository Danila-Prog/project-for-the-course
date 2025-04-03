"use client";
import { CardUser } from "@/entities/CardUser";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { UiInput, UiModal } from "@/shared";
import { LabeledInput } from "@/features/LabeledInput";
import { filterUsers } from "./ui/FilterUsers";
import { mockUsers } from "../../lib/mock";
export default function UserLogistician() {
  const [modalOpen, setModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    experienceFrom: "",
    experienceBefore: "",
    status: "",
    typeCar: "",
  });

  const handleFiltersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setModalOpen((modal) => !modal);
  };

  const filterUser = filterUsers(mockUsers, filters);

  return (
    <div className="flex mt-[20px] mb-[30px]">
      <aside className="bg-white mr-[30px] rounded-[10px] px-[23px] pt-[15px] pb-[40px] grid gap-[25px] h-[425px]">
        <h1 className="text-center mx-auto font-bold">
          Фильтры поиска сотрудника
        </h1>
        <div>
          <p className="font-bold text-[15px] mb-[12px]">Статус водителя</p>
          <select
            className="w-full h-[40px] px-[8px] text-[15px] rounded-[10px] border-2 border-[#d6d6d6] appearance-none"
            value={filters.status}
            name="status"
            onChange={handleFiltersChange}
          >
            <option value="">Статус</option>
            <option value="available">Доступен</option>
            <option value="busy">Занят</option>
          </select>
        </div>

        <div>
          <p className="font-bold text-[15px] mb-[12px]">Тип автомобиля</p>

          <select
            className="w-full h-[40px] px-[8px] text-[15px] rounded-[10px] border-2 border-[#d6d6d6] appearance-none"
            value={filters.typeCar}
            name="typeCar"
            onChange={handleFiltersChange}
          >
            <option value="">Тип автомобиля</option>
            <option value="passenger">Легковой</option>
            <option value="truck">Грузовой</option>
          </select>
        </div>
        <div>
          <p className="font-bold text-[15px] mb-[12px]">Стаж водителя</p>

          <UiInput
            type="number"
            placeholder="От"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            className="mr-[10px]"
            value={filters.experienceFrom}
            name="experienceFrom"
            onChange={handleFiltersChange}
          />

          <UiInput
            type="number"
            placeholder="До"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            value={filters.experienceBefore}
            name="experienceBefore"
            onChange={handleFiltersChange}
          />
        </div>
      </aside>

      <main className="bg-white w-[71%] px-[40px] pt-[20px] pb-[40px] rounded-[10px]">
        <div className="flex mx-auto items-center border-2 border-[#d6d6d6] rounded-[10px] w-[75%] px-[15px] py-[8px] mb-[16px]">
          <UiInput
            type="text"
            value={filters.search}
            name="search"
            onChange={handleFiltersChange}
            isPadding={false}
            isRounded={false}
            sizeInput="lg"
            leftIcon={<FaMagnifyingGlass className="mr-[8px]" />}
            placeholder="Введите фио или номерной знак"
          />
        </div>

        <div className="grid gap-[20px]">
          {filterUser.map((user) => (
            <CardUser
              key={user.id}
              {...user}
              handleCloseOpen={handleCloseModal}
            />
          ))}
        </div>
      </main>

      <UiModal isOpen={modalOpen} onClose={handleCloseModal}>
        <form action="">
          <UiModal.Header className="mb-[10px]">Форма заказов</UiModal.Header>

          <UiModal.Main className="grid gap-[15px]">
            <LabeledInput
              idInput="start_location"
              label="Адрес погрузки: город, улица, дом, квартира"
              placeholder="Введите адрес подачи"
              sizeLabel="md"
            />
            <LabeledInput
              idInput="end_location"
              label="Адрес выгрузки: город, улица, дом, квартира"
              placeholder="Введите адрес выгрузки"
              sizeLabel="md"
            />
            <div className="flex gap-[20px]">
              <LabeledInput
                idInput="estimated_time"
                label="Время поездки"
                placeholder="Расчетное время поездки"
                sizeLabel="md"
              />
              <LabeledInput
                typeInput="number"
                idInput="distance_km"
                label="Дистанция в км"
                placeholder="Дистанция в км"
                sizeLabel="md"
              />
            </div>
          </UiModal.Main>

          <UiModal.Footer className="flex justify-center mt-[30px]">
            <button className="w-[250px] h-[50px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px]">
              Отдать заказ
            </button>
          </UiModal.Footer>
        </form>
      </UiModal>
    </div>
  );
}
