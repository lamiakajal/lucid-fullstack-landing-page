/** Pricing plans shared by the Pricing section and the /api/plans endpoint. */
export const plans = [
  {
    id: "free",
    name: "FREE",
    price: 0,
    period: "/ month",
    desc: "Fusce fermentum placerat magna ac pharetra. Aliquam euismod elit non ipsum lacinia consectetur.",
    popular: false,
  },
  {
    id: "personal",
    name: "PERSONAL",
    price: 25,
    period: "/ month",
    desc: "Fusce fermentum placerat magna ac pharetra. Aliquam euismod elit non ipsum lacinia consectetur.",
    popular: false,
  },
  {
    id: "business",
    name: "BUSINESS",
    price: 50,
    period: "/ month",
    desc: "Fusce fermentum placerat magna ac pharetra. Aliquam euismod elit non ipsum lacinia consectetur.",
    popular: true,
  },
  {
    id: "unlimited",
    name: "UNLIMITED",
    price: 99,
    period: "/ month",
    desc: "Fusce fermentum placerat magna ac pharetra. Aliquam euismod elit non ipsum lacinia consectetur.",
    popular: false,
  },
];

export const planIds = plans.map((plan) => plan.id);
