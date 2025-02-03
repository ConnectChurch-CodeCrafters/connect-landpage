import {
  FormattedValuesContact,
  FormattedValuesEmbaixador,
  FormattedValuesPlan,
  FunctionalitiesData,
  ModulesData,
  PlansData,
} from "@/types/types";
import axios from "axios";
import { AxiosError } from "axios";
import {
  FUNCTIONALITIES_API_CACHE_KEY,
  getCachedData,
  MODULES_API_CACHE_KEY,
  PLANS_API_CACHE_KEY,
  saveCacheData,
} from "./cache";

export async function getFunctionalities() {
  try {
    const cachedFunctionalities = getCachedData<FunctionalitiesData>(
      FUNCTIONALITIES_API_CACHE_KEY,
    );

    if (cachedFunctionalities) return cachedFunctionalities;

    const response = await axios.get(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/Modulo/funcoes-modulos",
      {
        headers: {
          accept: "*/*",
        },
      },
    );

    saveCacheData(FUNCTIONALITIES_API_CACHE_KEY, response.data);

    return response.data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function getModules() {
  try {
    const cachedModules = getCachedData<ModulesData>(MODULES_API_CACHE_KEY);

    if (cachedModules) return cachedModules;

    const response = await axios.get(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/Modulo/nossos-modulos",
      {
        headers: {
          accept: "*/*",
        },
      },
    );

    saveCacheData(MODULES_API_CACHE_KEY, response.data);

    return response.data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function getPlans() {
  try {
    const cachedPlans = getCachedData<PlansData>(PLANS_API_CACHE_KEY);

    if (cachedPlans) return cachedPlans;

    const response = await axios.get(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/Modulo/obter-todos-planos",
      {
        headers: {
          accept: "*/*",
        },
      },
    );

    saveCacheData(PLANS_API_CACHE_KEY, response.data);

    return response.data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function submitContactForm(
  formattedValues: FormattedValuesContact,
) {
  try {
    const response = await axios.post(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/CRM",
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          accept: "*/*",
        },
      },
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Erro:", error);
  }
}


export async function submitEmbaixadorForm(
  formattedValues: FormattedValuesEmbaixador,
) {
  try {
    const response = await axios.post(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/Embaixador",
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          accept: "*/*",
        },
      },
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function submitPlanForm(formattedValues: FormattedValuesPlan) {
  try {
    const response = await axios.post(
      "https://prd-connect-god-api.azurewebsites.net/api/v1/DenominacaoInteressada",
      formattedValues,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          accept: "*/*",
        },
      },
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Erro:", error);
    const axiosError = error as AxiosError;
    const data = axiosError?.response?.data;
    throw new Error((data as { errors: string[] })?.errors[0]);
  }
}
