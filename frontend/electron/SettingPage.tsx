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


  return (
    <div>
      <div className="w-80">
      <Slider />
      </div>
      <button onClick={handleClick}>
        Click Me
      </button>

    </div>
  );
};
