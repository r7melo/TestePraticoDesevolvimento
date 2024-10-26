
namespace WebAtividadeEntrevista.Utilities
{
    /// <summary>
    /// Classe de Validação do CPF
    /// </summary>
    public static class CpfValidator
    {
        public static bool ValidarCPF(string cpf) // Ex.: 00000000000
        {
            // Verifica se o CPF possui 11 dígitos e não é uma sequência repetida
            if (cpf.Length != 11 || new string(cpf[0], 11) == cpf)
            {
                return false; // CPF inválido se todos os dígitos são iguais ou o comprimento não é 11
            }

            int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;

            // Cálculo do primeiro dígito verificador
            soma = 0;
            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(cpf[i].ToString()) * multiplicador1[i];
            }
            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11)
            {
                resto = 0;
            }
            if (resto != int.Parse(cpf[9].ToString()))
            {
                return false;
            }

            // Cálculo do segundo dígito verificador
            soma = 0;
            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(cpf[i].ToString()) * multiplicador2[i];
            }
            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11)
            {
                resto = 0;
            }
            if (resto != int.Parse(cpf[10].ToString()))
            {
                return false;
            }

            return true; // CPF válido
        }
    }
}