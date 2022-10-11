import { BiPlus, BiMinus } from "react-icons/bi";

const SpinButton = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, op: number) => {
    e.stopPropagation();
    onChange(value + op);
  };
  return (
    <div
      id="spin-button"
      role="spinbutton"
      className="flex flex-row justify-center items-center gap-3"
    >
      <span id="value" className="text-stone-400">
        {value} hz
      </span>
      <div id="spin-button-container" className="flex flex-row">
        <div
          id="minus-icon"
          onClick={(e) => handleClick(e, -1)}
          className="text-stone-400 flex items-center justify-center active:scale-110 transition-transform w-14"
        >
          <BiMinus size={25} />
        </div>
        <div
          id="divider"
          className="w-fit border-l py-5 border-stone-600"
        ></div>
        <div
          id="plus-icon"
          onClick={(e) => handleClick(e, 1)}
          className="text-fuchsia-600 flex items-center justify-end active:scale-110 transition-transform w-10"
        >
          <BiPlus size={25} />
        </div>
      </div>
    </div>
  );
};

export default SpinButton;
