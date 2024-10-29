﻿CREATE PROC FI_SP_ValCPFCliente
    @CPF VARCHAR(11)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM CLIENTES WHERE CPF = @CPF)
    BEGIN
        SELECT 1 AS Existe;
    END
    ELSE
    BEGIN
        SELECT 0 AS Existe;
    END
END;