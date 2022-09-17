import { useTheme } from "../utils/theme";

export function App() {
  const [theme, { changeColor }] = useTheme();

  return (
    <>
      <h1
        style={{
          color: theme.color,
        }}
      >
        {theme.title}
      </h1>
      <input
        type="color"
        name="color"
        value={theme.color}
        onInput={(e) => changeColor(e.currentTarget.value)}
      />
      <label for="color">Change color theme</label>
    </>
  );
}
