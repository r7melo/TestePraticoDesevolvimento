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
    public class ClienteController : Controller
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
        public JsonResult Incluir(ClienteModel cliente)
        {
            // OBS: Criar sistema de commit/rollback - BeginTransaction
            // Criar uma classe DataBaseTransaction para gerenciar as alterações na base de dados

            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

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

                cliente.Id = boCliente.Incluir(new Cliente()
                {                    
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                });

                if (cliente.Beneficiarios != null && cliente.Beneficiarios.Count > 0)
                {
                    foreach (var beneficiario in cliente.Beneficiarios)
                    {
                        beneficiario.Id = boBeneficiario.Incluir(new Beneficiario()
                        {
                            Nome = beneficiario.Nome,
                            CPF = beneficiario.CPF,
                            Cliente = new Cliente()
                            {
                                Id = cliente.Id
                            }
                        });
                    }
                }
                           
                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel cliente)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();
       
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
                boCliente.Alterar(new Cliente()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                });

                if (cliente.Beneficiarios != null && cliente.Beneficiarios.Count > 0)
                {
                    foreach (var beneficiario in cliente.Beneficiarios)
                    {
                        if (beneficiario.Id == 0)
                        {
                            beneficiario.Id = boBeneficiario.Incluir(new Beneficiario()
                            {
                                Nome = beneficiario.Nome,
                                CPF = beneficiario.CPF,
                                Cliente = new Cliente()
                                {
                                    Id = cliente.Id
                                }
                            });

                        }
                        else
                        {
                            boBeneficiario.Alterar(new Beneficiario()
                            {
                                Id = beneficiario.Id,
                                Nome = beneficiario.Nome,
                                CPF = beneficiario.CPF,
                                Cliente = new Cliente()
                                {
                                    Id = cliente.Id
                                }
                            });
                        }
                        
                    }
                }

                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                };

            
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}