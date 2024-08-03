export const initalState = {
	itemSelected: {
		cantidad: 1,
		id: 1,
		idmp: "109498109-b087c07b-616c-464c-b1a5-12fbfe4e51f3",
		initpoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=109498109-b087c07b-616c-464c-b1a5-12fbfe4e51f3",
		precio: 10000,
		titulo: "Carrera 5k"
	},
	amount: 1,
	/*
	initialization: {
		amount: 1,
		preferenceId: "57883365-67396ec5-edfe-43fe-90b6-0eff2270ed4e",
	},
	*/
	customization: {
		paymentMethods: {
			creditCard: "all",
			debitCard: "all",
			ticket: "all",
			bankTransfer: "all",
			atm: "all",
			onboarding_credits: "all",
			wallet_purchase: "all",
			mercadoPago: "all",
			maxInstallments: 1
		}
	}
};

export const options = {
	MP_RESET: "MP_RESET",
	MP_SET_CANTIDAD: "MP_SET_CANTIDAD",
	MP_SET_ITEM_SELECTED: "MP_SET_ITEM_SELECTED"
};