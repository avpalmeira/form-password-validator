import { styled } from "@mui/material/styles";
import { css } from "@emotion/react";

export const ErrorParagraph = styled("p")({
  color: "red",
  padding: "8px",
});

export const SuccessParagraph = styled("p")({
  color: "green",
  padding: "8px",
});

export const responseFinalMessageCSS = css`
  margin: auto;
  @media (min-width: 600px) {
    margin: 0;
  }
`;
