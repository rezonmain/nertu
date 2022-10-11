const ListEntry = ({
  title,
  description,
  children,
  onClick,
}: {
  title: string;
  description?: string | JSX.Element;
  children?: JSX.Element;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      id="list-entry"
      onClick={onClick}
      className="flex px-7 py-3 w-full h-full flex-row justify-between items-center gap-4 select-none"
    >
      <div id="list-entry-text-container">
        <h3 id="list-entry-title" className="font-semibold">
          {title}
        </h3>
        <p id="list-entry-description" className="text-stone-400 text-sm">
          {description}
        </p>
      </div>
      <div id="list-entry-control">{children}</div>
    </div>
  );
};

export default ListEntry;
