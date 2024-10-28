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

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                
                model.Id = bo.Incluir(new Beneficiario()
                {                    
                    CPF = model.CPF,
                    Nome = model.Nome,
                    Cliente = new Cliente()
                    {
                        Id = model.Cliente.Id
                    },
                });

           
                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult ExibirModal(long id)
        {
            var model = new BeneficiarioModel()
            {
                CPF = "000000",
                Nome = "nome teste",
                Cliente = new ClienteModel()
                {
                    Id = id
                }
            };
            
            return PartialView("Modal", model);
        }

    }
}