"use client";
import { CardUser } from "@/entities/CardUser";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { UiInput } from "@/shared";
import useUserLogistician from "./model/useUserLogistician";

export default function UserLogistician() {
  const {
    filters,
    handleFiltersChange,
    handleActiveDriver,
    activeDrive,
    allDriverFilter,
    activeDriverFilter,
    handleCloseModalFormOrder,
    handleCloseModalFormEditingOrder,
    handleCloseModalDeleteOrder,
    formOrder,
    formEditingOrder,
    deleteOrder,
  } = useUserLogistician();

  return (
    <div className="flex mt-[20px] mb-[30px]">
      <aside className="bg-white mr-[30px] rounded-[10px] px-[23px] pt-[15px] pb-[40px] grid gap-[25px] h-full">
        <h1 className="text-center mx-auto font-bold">
          Фильтры поиска сотрудника
        </h1>

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
          <p className="font-bold text-[15px] mb-[12px]">Грузоподъёмность</p>

          <UiInput
            type="number"
            placeholder="От"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            className="mr-[10px]"
            value={filters.capacityFrom}
            name="capacityFrom"
            onChange={handleFiltersChange}
          />

          <UiInput
            type="number"
            placeholder="До"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            value={filters.capacityBefore}
            name="capacityBefore"
            onChange={handleFiltersChange}
          />
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

      <main className="bg-white w-[71%] px-[40px] pb-[40px] rounded-[10px]">
        <div className="flex gap-[25px] justify-center mb-[20px]">
          <button
            onClick={() => handleActiveDriver("notActive")}
            className="border-x-2 border-b-2 rounded-b-[19px] px-[15px] py-[5px]"
          >
            Все водители
          </button>

          <button
            onClick={() => handleActiveDriver("active")}
            className="border-x-2 border-b-2 rounded-b-[19px] px-[15px] py-[5px]"
          >
            Активные водители
          </button>
        </div>

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

        <div className="grid gap-[25px]">
          {!activeDrive
            ? allDriverFilter.map((user) => (
                <CardUser
                  key={user.id}
                  {...user}
                  buttons={
                    <button
                      className="h-[43px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[17px] font-medium mt-[12px]"
                      onClick={handleCloseModalFormOrder}
                    >
                      Дать заказ
                    </button>
                  }
                />
              ))
            : activeDriverFilter.map((user) => (
                <CardUser
                  key={user.id}
                  {...user}
                  buttons={
                    <div className="flex gap-[12px]">
                      <button
                        className="h-[43px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-orange-700"
                        disabled={user.status !== "Назначенный"}
                        onClick={handleCloseModalFormEditingOrder}
                      >
                        Редактировать заказ
                      </button>

                      <button
                        className="h-[43px] px-[16px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-red-700"
                        disabled={user.status !== "Назначенный"}
                        onClick={handleCloseModalDeleteOrder}
                      >
                        Удалить заказ
                      </button>
                    </div>
                  }
                  pathRoute={
                    <>
                      <p className="font-bold text-[16px]">
                        Адресс погрузки:{" "}
                        <span className="font-medium">3123</span>
                      </p>
                      <p className="font-bold text-[16px]">
                        Адресс выгрузки:{" "}
                        <span className="font-medium">1233123</span>
                      </p>
                    </>
                  }
                />
              ))}
        </div>
      </main>

      {formOrder}

      {formEditingOrder}

      {deleteOrder}
    </div>
  );
}
