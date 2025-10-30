import { useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import { AppPopover } from "../../components/ui/AppPopover";
import { AppRadioGroup } from "../../components/ui/AppRadioGroup";
import { AppCheckbox } from "../../components/ui/AppCheckbox";
import { AppLabel } from "../../components/ui/AppLabel";
import { useStore } from "../../hooks";
import { tileLayers } from "../../constants";

export default function TileLayers() {
  const [isOpen, setIsOpen] = useState(false);

  const { tileLayer, tectonicPlatesOn, setStore } = useStore(
    useShallow((state) => ({
      tileLayer: state.tileLayer,
      tectonicPlatesOn: state.tectonicPlatesOn,
      setStore: state.setStore,
    }))
  );

  return (
    <AppPopover
      open={isOpen}
      contentProps={{
        className: "z-[1000]",
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      }}
      triggerProps={{
        className:
          "absolute top-14 right-3 z-[1000] bg-white dark:bg-gray-800 p-3 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform",
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      }}
      Trigger={
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <FaGlobeAsia className="text-2xl text-blue-600 dark:text-blue-400" />
        </motion.div>
      }
    >
      {/* Popover content */}
      <AppRadioGroup
        value={tileLayer}
        onValueChange={(value) => setStore({ tileLayer: value })}
        options={tileLayers.map((layer) => ({
          value: layer.name,
          label: layer.name,
        }))}
      />

      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      <div className="flex items-center space-x-2">
        <AppCheckbox
          checked={tectonicPlatesOn}
          onCheckedChange={(checked) => setStore({ tectonicPlatesOn: checked })}
        />
        <AppLabel className="text-sm text-gray-700 dark:text-gray-300">
          Tectonic Plates
        </AppLabel>
      </div>
    </AppPopover>
  );
}
