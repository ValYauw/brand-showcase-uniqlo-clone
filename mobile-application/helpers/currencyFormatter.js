export default function formatAsRupiah(number) {
  if (isNaN(number)) return 'Rp. 0';
  return new Intl.NumberFormat("id-ID", {
    style: "currency", 
    currency: "IDR",
    // maximumFractionDigits: 0
  }).format(number);
  // return number;
}