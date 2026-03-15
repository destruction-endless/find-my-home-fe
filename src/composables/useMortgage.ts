import { ref, computed } from "vue";

export function useMortgage(initialPrice = 0) {
  const price = ref(initialPrice);
  const downPaymentPercent = ref(20);
  const annualInterestRate = ref(6.5);
  const loanTermYears = ref(20);

  const downPayment = computed(() =>
    Math.round((price.value * downPaymentPercent.value) / 100),
  );

  const loanAmount = computed(() => price.value - downPayment.value);

  const monthlyPayment = computed(() => {
    const principal = loanAmount.value;
    if (principal <= 0) return 0;

    const monthlyRate = annualInterestRate.value / 100 / 12;
    const totalMonths = loanTermYears.value * 12;

    if (monthlyRate === 0) {
      return Math.round(principal / totalMonths);
    }

    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return Math.round(payment);
  });

  const totalPayment = computed(
    () => monthlyPayment.value * loanTermYears.value * 12,
  );

  const totalInterest = computed(() => totalPayment.value - loanAmount.value);

  return {
    price,
    downPaymentPercent,
    annualInterestRate,
    loanTermYears,
    downPayment,
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}
