import NavButton from './nav-button';
import { ButtonConfig } from './nav-button';
import './nav-buttons.css';

export default async function NavButtons({
  left, // List of button configurations, one for left and one for right.
  right,
}: {
  left: ButtonConfig[];
  right: ButtonConfig[];
}) {
  let keyCounter = 0;
  return (
    <div className="nav-buttons">
      <div>
        {left.map((config) => {
          keyCounter += 1;
          return <NavButton key={keyCounter} config={config}></NavButton>;
        })}
      </div>

      <div>
        {right.map((config) => {
          keyCounter += 1;
          return <NavButton key={keyCounter} config={config}></NavButton>;
        })}
      </div>
    </div>
  );
}
