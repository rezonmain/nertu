import { useInterval } from "react-use";
import { useState } from "react";
import TET, { Note } from "../../lib/classes/TET";
import usePitch, { Pitch } from "../../lib/hooks/usePitch";
import LoudnessMeter from "../LoudnessMeter/LoudnessMeter";
import PermissionModal from "../PermissionModal/PermissionModal";
import LinearTuningLane from "../LinearTuningLane/LinearTuningLane";
import Header from "../Header/Header";
import Settings from "../Settings/Settings";
import { useSettings } from "../../lib/context/settingsContext";
import useDisclosure from "../../lib/hooks/useDisclosure";
import MetronomeWidget from "../MetronomeWidget/MetronomeWidget";
import TuningFork from "../TuningFork/TuningFork";
import React from "react";

export interface TunerData extends Note, Pitch {}

function Tuner() {
  const { settings } = useSettings();
  const { getPitch, getMedia, media } = usePitch();
  const [store, setStore] = useState<TunerData | undefined>(undefined);
  const [settingsToggle, setSettingsToggle] = useDisclosure(false);

  const color = `hsl(${
    store ? -Math.abs(store!.cents * 3) + 142 : 142
  }, 58%, 69%)`;

  const tet = new TET(settings.A, settings.noteNameSystem);

  useInterval(
    () => {
      if (!media) return;
      const pitch = getPitch(0.9);
      const note = tet.frequencyToNote(pitch.frequency, settings.transposition);
      note ? setStore({ ...note, ...pitch }) : setStore(undefined);
    },
    settingsToggle ? null : 100
  );

  return (
    <>
      <PermissionModal visible={!media} onAsk={() => getMedia()} />
      <Header onSettings={() => setSettingsToggle()} />
      <main className='py-10 h-full flex flex-col gap-20'>
        <section
          id='tuner+loudness-meter'
          className='px-10 flex-[2] flex flex-col justify-center'
        >
          <LinearTuningLane data={store} color={color} />
          <LoudnessMeter loudness={store?.loudness} color={color} />
        </section>
        <section
          id='widgets'
          className='w-full px-5 flex flex-row justify-between sm:max-w-3xl xl:px-0 xl:max-w-5xl mx-auto'
        >
          <MetronomeWidget />
          <TuningFork />
        </section>
        <Settings
          visible={settingsToggle}
          onSettings={() => setSettingsToggle()}
        />
      </main>
    </>
  );
}

export default React.memo(Tuner);
