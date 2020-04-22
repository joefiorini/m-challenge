/** @jsx jsx */
import { useState, useMemo, useCallback } from "react";
import { jsx, css, Global, ClassNames } from "@emotion/core";
import styled from "@emotion/styled";

const Widget = styled.section`
  display: flex;
  flex-direction: column;
  border-color: #41473b;
  border-style: groove;
  border-width: 24px;
  border-radius: 24px;
  padding: 32px;
  min-height: 256px;
`;

export default function App() {
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const handleChange = e => {
    setValue(e.target.value);
  };
  const incrementClickCount = useCallback(() => {
    setClickCount(clickCount + 1);
  }, [clickCount]);

  const letterCount = useMemo(() => value.length, [value]);

  return (
    <main
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      `}
    >
      <Global
        styles={css`
          * {
            font-family: "Orbitron", sans-serif;
          }

          body {
            background-color: #272b24;
            color: #a6b1aa;
          }

          p,
          label {
            font-family: "Montserrat", sans-serif;
          }

          label + input {
            margin-top: 8px;
          }
        `}
      />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          max-width: 75vw;
          align-items: center;
          height: 100vh;
          width: 100%;
        `}
      >
        <Widget>
          <label htmlFor="input">Enter up to 20 characters...</label>
          <ClassNames>
            {({ cx, css }) => (
              <input
                type="text"
                onChange={handleChange}
                value={value}
                id="input"
                css={cx(
                  {
                    [css`
                      border-color: #340715;
                    `]: letterCount > 20
                  },
                  css`
                    background-color: #7d897c;
                    border-width: 8px;
                    border-style: solid;
                    border-radius: 8px;
                    padding: 8px;
                  `
                )}
              />
            )}
          </ClassNames>

          <h2>Your message:</h2>
          <p>{value}</p>
        </Widget>
        <Widget>
          <button onClick={incrementClickCount}>Click me</button>
          <p>
            You've clicked the button {clickCount} time
            {clickCount !== 1 ? "s" : null}!
          </p>
        </Widget>
      </div>
    </main>
  );
}
