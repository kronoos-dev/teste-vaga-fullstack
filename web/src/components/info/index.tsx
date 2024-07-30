export default function Info({}) {
  return (
    <div className=" flex flex-col items-center border-main border-solid rounded-2xl border-2 w-fit h-fit px-3 gap-3 absolute top-2 right-2">
      <h1 className="font-bold text-xl">Legenda</h1>
      <ul className="flex flex-col gap-2">
        <li className="flex items-center justify-center">
          <div className="w-5 h-5 bg-green-500 rounded-[100%]"></div>{" "}
          <h2>CPF/CNPJ VÁLIDO</h2>
        </li>
        <li className="flex items-center justify-center">
          <div className="w-5 h-5 bg-red-800 rounded-[100%]"></div>{" "}
          <h2>CPF/CNPJ INVÁLIDO</h2>
        </li>
      </ul>
    </div>
  );
}
