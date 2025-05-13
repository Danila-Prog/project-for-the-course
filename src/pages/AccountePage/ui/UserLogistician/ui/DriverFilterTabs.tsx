import useUserLogistician from "../model/useUserLogistician";

export default function DriversFulterTabs() {
  const { handleActiveDriver } = useUserLogistician();
  return (
    <header className="flex gap-[25px] justify-center mb-[20px]">
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
    </header>
  );
}
