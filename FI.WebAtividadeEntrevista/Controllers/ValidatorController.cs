using FI.AtividadeEntrevista.BLL;
using System;
using System.Web.Mvc;
using WebAtividadeEntrevista.Utilities;

namespace WebAtividadeEntrevista.Controllers
{
    public class ValidatorController : Controller
    {

        [HttpPost]
        public JsonResult ValidarCPF(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf))
            {
                Response.StatusCode = 400;
                return Json(new { success = false, message = "O CPF não pode estar vazio." });
            }

            // Valida o CPF
            bool isValid = CpfValidator.ValidarCPF(cpf);

            if (!isValid)
            {
                Response.StatusCode = 400;
                return Json(new { success = false, message = "O CPF informado é inválido." });
            }

            //if (!CpfValidator.APIGov(cpf)) // chamada da função com validação por API externa
            //{
            //    Response.StatusCode = 400;
            //    return Json(new { success = false, message = "O CPF informado não existe." });
            //}

            return Json(new { success = true, message = "O CPF é válido." });
        }

        [HttpPost]
        public JsonResult ValidarCPFCliente(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf))
            {
                Response.StatusCode = 400;
                return Json(new { success = false, message = "O CPF não pode estar vazio." });
            }

            // Valida o CPF
            bool isValid = CpfValidator.ValidarCPF(cpf);

            if (!isValid)
            {
                Response.StatusCode = 400;
                return Json(new { success = false, message = "O CPF informado é inválido." });
            }


            BoCliente boCliente = new BoCliente();
            bool existeCPF = boCliente.VerificarCPFCliente(cpf);

            if (existeCPF)
            {
                Response.StatusCode = 400;
                return Json(new { success = false, message = "CPF do Beneficiário já cadastrado." });
            }


            //if (!CpfValidator.APIGov(cpf)) // chamada da função com validação por API externa
            //{
            //    Response.StatusCode = 400;
            //    return Json(new { success = false, message = "O CPF informado não existe." });
            //}

            return Json(new { success = true, message = "O CPF é válido." });
        }
    }
}
