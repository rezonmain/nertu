import { useSpring, animated } from "@react-spring/web";
import TET, { NoteName } from "../../lib/classes/TET";
import { useSettings } from "../../lib/context/settingsContext";

const NoteIndicator = ({
  note,
  octave,
  as = "linear",
}: {
  note: NoteName | undefined;
  octave: number | undefined;
  as?: "linear" | "curved";
}) => {
  const { settings } = useSettings();
  const noteIndicatorProps = useSpring({
    to: {
      opacity: note ? 1 : 0,
    },
  });

  const enharmonic = settings.showEnharmonic
    ? new TET().getEnharmonic(note!)
    : undefined;
  return (
    <animated.div
      id="note-indicator"
      style={noteIndicatorProps}
      className={`h-[140px] self-center ${
        as === "curved" ? "-translate-y-10" : ""
      }`}
    >
      <div
        className={`flex flex-col gap-7 -rotate-45 ${
          enharmonic ? "-translate-y-3" : ""
        }`}
      >
        <p className="text-5xl block rotate-45 font-music">
          {note}
          <sub className="text-xl">{octave}</sub>
        </p>
        {enharmonic && (
          <>
            <hr className="border-stone-500" />
            <p className="text-4xl block rotate-45 text-stone-500 translate-x-4 -translate-y-1 font-music">
              {enharmonic}
              <sub className="text-lg">{octave}</sub>
            </p>
          </>
        )}
      </div>
    </animated.div>
  );
};

export default NoteIndicator;
