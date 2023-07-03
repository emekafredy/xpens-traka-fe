import { FC } from 'react';
import { Card, CardContent, Typography, Divider } from "@mui/material";

interface IInfoCardProps {
  title: string;
  value: number | string;
  footer: React.ReactNode;
}

export const InfoCard:FC<IInfoCardProps> = ({
  title, value, footer
}: IInfoCardProps) => {
  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography
          style={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>
        <Divider />
        <Typography variant="h3">
          {value}
        </Typography>
        <div>{footer}</div>
      </CardContent>
    </Card>
  );
};
