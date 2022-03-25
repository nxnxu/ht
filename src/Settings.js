import { useState } from 'react';

function Settings(props) {
  const [settings, setSettings] = useState(props.settings);
  const {
    numTerminals,
    minAge,
    maxAge,
    interactive,
    fontForeground,
    fontBackground,
  } = settings;

  const onChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    if (target.type === "number") {
      value = +value;
      value = Math.max(value, 0);
    }
    if (name === "minAge" || name === "maxAge") value *= 1000.0;
    const out = { ...settings, [name]: value };
    setSettings(out);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(settings);
  };

  return (
    <form onSubmit={onSubmit} className="settings">
      <div>
        <label>Number of terminals</label>
        <input
          type={"number"}
          name="numTerminals"
          value={numTerminals}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Minimum seconds a terminal should run</label>
        <input
          type={"number"}
          name="minAge"
          value={minAge / 1000.0}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Maximum seconds a terminal should run</label>
        <input
          type={"number"}
          name="maxAge"
          value={maxAge / 1000.0}
          onChange={onChange}
        />
      </div>
      <div>
        <span>
          <input
            onChange={onChange}
            type={"color"}
            name="fontForeground"
            value={fontForeground}
          ></input>
          <label>Foreground</label>
        </span>
      </div>
      <div>
        <span>
          <input
            onChange={onChange}
            name={"fontBackground"}
            value={fontBackground}
            type={"color"}
          ></input>
          <label>Background</label>
        </span>
      </div>
      <div>
        <span>
          <input
            type="checkbox"
            name="interactive"
            defaultChecked={interactive}
            onChange={onChange}
          />
          <label>Interactive (Fake typing)</label>
        </span>
      </div>
      <button type="submit" className="settings-done">
        DONE
      </button>
    </form>
  );
}


export default Settings;