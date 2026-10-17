import QRCode from "qrcode";

export async function QrCode({ value }: { value: string }) {
  const svg = await QRCode.toString(value, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#0F172A", light: "#FFFFFF" },
  });

  return (
    <span
      className="block [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
