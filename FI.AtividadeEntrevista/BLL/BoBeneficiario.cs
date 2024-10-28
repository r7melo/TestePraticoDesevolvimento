using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario ben = new DAL.DaoBeneficiario();
            return ben.Incluir(beneficiario);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Listar(long idcliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Listar(idcliente);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }
    }
}
