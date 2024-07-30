export default function Button({
  click,
  classname,
}: {
  click: () => void;
  classname: string;
}) {
  return (
    <button
      className={classname}
      onClick={() => {
        click();
      }}
    >
      {"Enviar"}
    </button>
  );
}
