const fetch = require('node-fetch');
const axios = require('axios');
const translate = require('@vitalets/google-translate-api');

async function chatgpt(text, lenguaje = 'es') {
  if (!text) {
    return {
      status: false,
      message: "No has ingresado un texto."
    };
  }    
  const result = {
    status: true,
    resultado: "",
  };
  const apiEndpoints = [
    {
      url: `https://api.lolhuman.xyz/api/openai?apikey=${global.lolkeysapi}&text=${text}&user=apirest`,
      processResponse: async (data) => {
        if (data?.result != 'error' && data?.result != '' && data?.result != undefined && data?.result) {
          const translatedResult = await translate(data.result, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://rest-api.akuari.my.id/ai/gpt?chat=${text}`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://api.azz.biz.id/api/gpt?q=${text}&user=Adit`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
  ];

for (const apiEndpoint of apiEndpoints) {  
  try {
    const response = await fetch(apiEndpoint.url);
    if (response.ok) {
      const responseData = await response.json();
      if (responseData) {
        await apiEndpoint.processResponse(responseData);
        if (result.resultado) {
          result.resultado = result.resultado;
          return result;
        }
      }
    }
  } catch {}
}
  result.status = false;
  result.resultado = "Error en todas las APIs";
  return result;
}

async function gpt(content, senderName = 'null', prompt, lenguaje = 'es') {
  if (!content) {
    return {
      status: false,
      message: "No has ingresado un texto."
    };
  }    
  const result = {
    status: true,
    resultado: "",
  };
  try {
    let resultadoApi3 = await fetch(`https://deliriusapi-official.vercel.app/ia/gptprompt?text=${content}&prompt=${prompt}`)
    const resultado_Api3 = await resultadoApi3.json()
    result.resultado = resultado_Api3.gpt
    return result;    
  } catch { 
  try {
    let resultadoApi = await fetch(`https://aemt.me/prompt/gpt?prompt=${prompt}&text=${content}`)
    const resultado_Api = await resultadoApi.json()
    if (resultado_Api.resultado.includes("error")) resultado_Api = XD;
    result.resultado = resultado_Api.result
    return result;
  } catch {
  try {
    let resultadoApi5 = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${content}`)
    const resultado_Api5 = await resultadoApi5.json()
    result.resultado = resultado_Api5.gpt
    return result;    
  } catch {  
  try {
    let resultadoApi4 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.lolkeysapi}&text=${content}&user=apirest`)
    const resultado_Api4 = await resultadoApi4.json()
    if (resultado_Api4?.result != 'error' && resultado_Api4?.result != '' && resultado_Api4?.result != undefined && resultado_Api4?.result) {
    const translatedResult2 = await translate(resultado_Api4.result, { to: lenguaje, autoCorrect: true });
    result.resultado = translatedResult.text.trim();
    }
    return result;    
  } catch {    
  try {
    let resultadoApi2 = await fetch(`https://ultimetron.guruapi.tech/gpt4?prompt=${content}`)
    const resultado_Api2 = await resultadoApi2.json()
    result.resultado = resultado_Api2.result.reply
    return result;    
  } catch (error) {    
    return { status: false, error: error.message };
  }}}}}
}

module.exports = { chatgpt, gpt };
