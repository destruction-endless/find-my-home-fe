<script setup lang="ts">
import { useMortgage } from "@/composables/useMortgage";
import { Calculator } from "lucide-vue-next";

const props = defineProps<{
  propertyPrice: number;
}>();

const {
  price,
  downPaymentPercent,
  annualInterestRate,
  loanTermYears,
  downPayment,
  loanAmount,
  monthlyPayment,
  totalPayment,
  totalInterest,
} = useMortgage(props.propertyPrice);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
  >
    <div class="flex items-center gap-2 mb-5">
      <Calculator :size="20" class="text-accent" />
      <h3
        class="font-heading text-lg font-semibold text-gray-900 dark:text-white"
      >
        Mortgage Calculator
      </h3>
    </div>

    <!-- Inputs -->
    <div class="space-y-4">
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Property Price
        </label>
        <input
          v-model.number="price"
          type="number"
          min="0"
          class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Down Payment ({{ downPaymentPercent }}%)
        </label>
        <input
          v-model.number="downPaymentPercent"
          type="range"
          min="0"
          max="90"
          step="5"
          class="w-full accent-accent"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {{ formatCurrency(downPayment) }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Interest Rate (%)
          </label>
          <input
            v-model.number="annualInterestRate"
            type="number"
            min="0"
            max="30"
            step="0.1"
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Loan Term (years)
          </label>
          <input
            v-model.number="loanTermYears"
            type="number"
            min="1"
            max="30"
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
    </div>

    <!-- Results -->
    <div
      class="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 space-y-3"
    >
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600 dark:text-gray-400"
          >Monthly Payment</span
        >
        <span class="text-lg font-bold text-accent">
          {{ formatCurrency(monthlyPayment) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600 dark:text-gray-400"
          >Loan Amount</span
        >
        <span class="text-sm font-medium text-gray-900 dark:text-white">
          {{ formatCurrency(loanAmount) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600 dark:text-gray-400"
          >Total Interest</span
        >
        <span class="text-sm font-medium text-gray-900 dark:text-white">
          {{ formatCurrency(totalInterest) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600 dark:text-gray-400"
          >Total Payment</span
        >
        <span class="text-sm font-medium text-gray-900 dark:text-white">
          {{ formatCurrency(totalPayment) }}
        </span>
      </div>
    </div>

    <p class="mt-4 text-xs text-gray-400 dark:text-gray-500">
      * Estimates only. Actual payments may vary based on lender terms and fees.
    </p>
  </div>
</template>
