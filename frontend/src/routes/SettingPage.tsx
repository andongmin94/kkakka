declare global {
  interface Window {
    electron: typeof import('electron');
  }
}

const electron =  window.electron;
import { Slider } from "@/components/ui/slider"

export default function SettingPage () {
  const handleClick = () => {
    electron.ipcRenderer.send('button-clicked', 'hi');
    console.log('React button clicked');
  };
  const closeClick = () => {
    electron.ipcRenderer.send('close-clicked');
    console.log('React close clicked');
  }

  return (
    <div>
      <div className="w-80">
      <Slider />
      </div>
      <button onClick={handleClick}>
        Click Me
      </button>

      <button onClick={closeClick}>
        Click Me
      </button>
    </div>
  );
};
