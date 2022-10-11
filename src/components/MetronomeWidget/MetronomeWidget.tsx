import { ChangeEvent, useEffect, useRef, useState } from "react";
import Metronome from "../../lib/classes/Metronome";
import React from "react";
import { useSettings } from "../../lib/context/settingsContext";
import constrain from "../../lib/utils/constrain";
import countNumeric from "../../lib/utils/countNumeric";

const MetronomeWidget = () => {
  const [pingPong, setPingPong] = useState(false);
  const metronome = useRef<Metronome | undefined>();
  const { settings, dispatch } = useSettings();
  const [play, setPlay] = useState(false);
  const [local, setLocal] = useState(settings.metronome.bpm.toString());

  const startStop = () => {
    play ? metronome.current?.stop() : metronome.current?.start();
    setPlay((prev) => !prev);
  };

  const onBPM = (e: ChangeEvent<HTMLInputElement>) => {
    if (!metronome.current) return;
    // Input validation
    const bpm = e.target.value
      ? constrain(Metronome.MIN, Metronome.MAX, e.target.valueAsNumber)
      : Metronome.MIN;
    // Set metronome tempo
    metronome.current.tempo = bpm;
    // Save metronome setting
    dispatch({ type: "changeBPM", payload: bpm });
    // Update local state
    setLocal(bpm.toString());
  };

  const onTap = () => {
    if (!metronome.current) return;
    const tapTempo = metronome.current.getTapTempo();
    if (tapTempo) {
      metronome.current.tempo = tapTempo;
      dispatch({ type: "changeBPM", payload: tapTempo });
      setLocal(tapTempo.toString());
    }
  };

  // Set up metronome object and onBeat callback
  useEffect(() => {
    metronome.current = new Metronome(settings.metronome.bpm);
    metronome.current.onBeat(() => setPingPong((prev) => !prev));
    return () => {
      metronome.current?.worker.terminate();
    };
  }, []);

  return (
    <article id="metronome" className="flex flex-col gap-3 w-fit h-fit">
      <div
        onClick={startStop}
        id="metronome-toggle"
        className={`h-fit w-fit py-2 flex flex-row items-center justify-center rounded-md gap-3 px-3 border-2 cursor-pointer transition-colors ${
          !play ? "border-stone-500" : "border-fuchsia-600"
        }`}
      >
        <span
          id="ping"
          className={`w-[24px] inline-block aspect-square rounded-full border-stone-500 ${
            pingPong ? "bg-stone-300" : "border"
          }`}
        ></span>
        <span
          id="pong"
          className={`w-[24px] inline-block aspect-square rounded-full border-stone-500 ${
            !pingPong ? "bg-stone-300" : "border"
          }`}
        ></span>
      </div>
      <div
        id="metronome-controls"
        className="flex flex-row justify-between items-center gap-3"
      >
        <button
          onClick={onTap}
          id="tap-tempo"
          className="block select-none cursor-pointer p-2 rounded-md border-2 border-stone-500 active:border-fuchsia-600 transition-colors"
        >
          Tap
        </button>
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const input = document.querySelector(
              'input[name="metronome-bpm"'
            ) as HTMLElement;
            input.blur();
          }}
        >
          <label>
            <input
              name="metronome-bpm"
              onBlur={onBPM}
              onChange={(e) => setLocal(e.target.value ? e.target.value : "")}
              value={local}
              type="number"
              step="0.1"
              style={{
                width: `${local.length ? countNumeric(local) : 1}ch`,
              }}
              className="appearance-none bg-inherit text-lg outline-none border-b-2 border-transparent transition-colors focus:border-b-fuchsia-600"
            />
            <small> bpm</small>
          </label>
        </form>
      </div>
    </article>
  );
};

export default React.memo(MetronomeWidget);
