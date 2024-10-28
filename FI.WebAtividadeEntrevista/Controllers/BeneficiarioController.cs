using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ExibirModal(long idCliente = 0)
        {
            if (idCliente != 0)
            {
                BoBeneficiario ben = new BoBeneficiario();

                List<Beneficiario> beneficiarios = ben.Listar(idCliente);

                List<BeneficiarioModel> beneficiariosModels = new List<BeneficiarioModel>();

                foreach (Beneficiario beneficiario in beneficiarios)
                {
                    beneficiariosModels.Add(
                        new BeneficiarioModel()
                        {
                            Id = beneficiario.Id,
                            Nome = beneficiario.Nome,
                            CPF = beneficiario.CPF
                        }
                    );
                }

                return PartialView("Modal", beneficiariosModels);
            }
            else
            {
                return PartialView("Modal", new List<BeneficiarioModel>());
            }
        }

    }
}