
namespace WebAtividadeEntrevista.Utilities
{
    /// <summary>
    /// Classe de Valida��o do CPF
    /// </summary>
    public static class CpfValidator
    {
        public static bool ValidarCPF(string cpf) // Ex.: 00000000000
        {
            // Verifica se o CPF possui 11 d�gitos e n�o � uma sequ�ncia repetida
            if (cpf.Length != 11 || new string(cpf[0], 11) == cpf)
            {
                return false; // CPF inv�lido se todos os d�gitos s�o iguais ou o comprimento n�o � 11
            }

            int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;

            // C�lculo do primeiro d�gito verificador
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

            // C�lculo do segundo d�gito verificador
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

            return true; // CPF v�lido
        }
    }
}