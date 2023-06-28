import { FC } from "react";
import { Button as BaseButton } from "@mui/material";

interface IButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  bgColor?: string;
}

export const Button:FC<IButtonProps> = ({
  label,
  disabled=false,
  onClick,
  bgColor="#1876D1"
}: IButtonProps) => {
  return (
    <BaseButton
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        padding: "10px 2rem",
        fontSize: "1rem"
      }}
    >
        {label}
    </BaseButton>
  )
};
