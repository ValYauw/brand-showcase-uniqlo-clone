export default function formatAsRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", 
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}