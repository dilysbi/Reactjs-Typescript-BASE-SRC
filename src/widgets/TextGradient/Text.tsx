import styled, { DefaultTheme } from "styled-components";
import { space, typography } from "styled-system";
import getThemeValue from "../../../utils/getThemeValue";
import { TextGradientProps } from "./types";

interface ThemedProps extends TextGradientProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const getFontSize = ({ fontSize, small }: TextGradientProps) => {
  return small ? "14px" : fontSize || "16px";
};

const Text = styled.div<TextGradientProps>`
  background-image: ${getColor};
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent; 

  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  margin: auto 0;
  line-height: 120%;
  
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
`;

Text.defaultProps = {
  color: "textGradient",
  small: false,
};

export default Text;
