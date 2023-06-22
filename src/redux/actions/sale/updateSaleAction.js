import { ADD_SALE } from "../../types/SaleType";
import axios from "axios";
import { toast } from "react-toastify";

export const updateSale = (id, values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "put",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `sale-invoice/${id}`,
				data: {
					saleInvoiceProduct: values,
				},
			});
			//dispatching data

			const newData = {
				...data.updatedInvoice,
				customer: data.customer,
			};

			toast.success("Invoice updated!");
			return {
				updatedInvoiceId: data.updatedInvoice.id,
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
			return {
				message: "error",
			};
		}
	};
};
