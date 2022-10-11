import React from "react";
import SettingMenu from "./SettingsMenu";
import SettingsModal from "./SettingsModal";

const Settings = ({
  visible,
  onSettings,
}: {
  visible: boolean;
  onSettings: () => void;
}) => {
  return (
    <SettingsModal visible={visible} onSettings={onSettings}>
      <SettingMenu />
    </SettingsModal>
  );
};

export default React.memo(Settings);
