import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCode({ value, size = 128, className }: QRCodeProps) {
  return (
    <div className={className}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={false}
      />
    </div>
  );
}
