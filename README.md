![image](https://github.com/user-attachments/assets/ddc19822-7617-4337-a2b7-a7128b80ef71)

### Objetivo
- Desenvolver melhorias e novas funcionalidades no sistema de manutenção de dados de clientes, com foco na manipulação de dados do cliente e seus beneficiários.

### Ferramentas Necessárias
- **Visual Studio 2022:** 
  - Pacote de Direcionamento do .NET Framework 4.8
  - SDK do .NET Framework 4.8
  - SQL Server Express 2019 LocalDB

### Implementações Necessárias

1. **Campo CPF para Cadastro de Cliente**
   - Adicionar campo "CPF" na tela de clientes, seguindo o padrão dos demais campos.
   - **Formato:** 999.999.999-99
   - **Validação:** Verificar o dígito verificador para confirmar validade do CPF.
   - **Restrição:** Impedir CPFs duplicados no banco de dados.
   - **Banco de Dados:**
     - Tabela `CLIENTES`: adicionar o campo `CPF`.

2. **Botão Beneficiários e Pop-Up para Cadastro**
   - Incluir botão “Beneficiários” na tela de clientes.
   - Pop-up para cadastrar **CPF** e **Nome do Beneficiário**.
   - **Grid de Beneficiários:** Permitir visualização, edição e exclusão de beneficiários.
   - **Restrições:**
     - Formatar CPF como 999.999.999-99.
     - Validar CPF conforme cálculo do dígito verificador.
     - Não permitir CPFs duplicados para o mesmo cliente.
   - **Banco de Dados:**
     - Tabela `BENEFICIARIOS`: adicionar campos `ID`, `CPF`, `NOME` e `IDCLIENTE`.

### Banco de Dados
- **CLIENTES:** Adicionar campo `CPF`.
- **BENEFICIARIOS:** Adicionar campos `ID`, `CPF`, `NOME`, `IDCLIENTE`.


### Reestruturação do Projeto
Diagrama:
  ![](https://github.com/r7melo/TestePraticoDesevolvimento/blob/master/Diagrama.drawio.svg)








