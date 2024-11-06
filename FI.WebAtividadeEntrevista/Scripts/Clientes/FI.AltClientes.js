
$(document).ready(function () {

    beneficiarios_list_global = [];

    if (obj) {
        $('#formCadastro #Id').val(obj.Id);
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(aplicarMascaraCPF(obj.CPF));
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        beneficiarios = [];
        table_rows = document.querySelectorAll('.table tbody tr');
        table_rows.forEach(row => {
            cols = row.querySelectorAll('td');

            beneficiarios.push({
                Id: row.id.trim(),
                CPF: cols[0].innerText.trim(),
                Nome: cols[1].innerText.trim()
            });
        });

        cpf = $(this).find("#CPF").val().replace(/\D/g, '');
        id_cliente = $(this).find("#Id").val(),


        form_cliente = {
            "Id": id_cliente,
            "Nome": $(this).find("#Nome").val(),
            "CEP": $(this).find("#CEP").val(),
            "Email": $(this).find("#Email").val(),
            "Sobrenome": $(this).find("#Sobrenome").val(),
            "Nacionalidade": $(this).find("#Nacionalidade").val(),
            "Estado": $(this).find("#Estado").val(),
            "Cidade": $(this).find("#Cidade").val(),
            "Logradouro": $(this).find("#Logradouro").val(),
            "Telefone": $(this).find("#Telefone").val(),
            "CPF": cpf,
            "Beneficiarios": beneficiarios
        }

        // Call ClienteController
        $.ajax({
            url: urlPost,
            method: "POST",
            data: form_cliente,
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON.message);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    beneficiarios_list_global = [];
                }
        });


    });

    // Função para definir a ação de click do botão ExibirModal - Beneficiario
    AdicaoEventoBtnExibirModalBeneficiario();

    // Formatação do Campo CPF (Máscara Auto)
    AdicaoEventoCPFMascara();

})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}


// Função de formatação para a máscara CPF
function aplicarMascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{2})$/, "$1-$2");

    return cpf;
}

function AdicaoEventoBtnExibirModalBeneficiario() {
    $("#btnExibirModalBeneficiario").click(function () {

        var idcliente = GetIdCliente();

        $.ajax({
            url: '/Beneficiario/ExibirModal',
            method: "GET",
            data: { idcliente: idcliente },
            success: function (response) {
                $('#modalBeneficiarioConteudo').html(response);
                $('#modalBeneficiario').modal('show');
                AdicaoEventoCPFMascara();
                ConstruirLogicaModal();

                beneficiarios_list_global.forEach((row) => {
                    cpf = row[0];
                    nome = row[1];

                    $('#lista_beneficiarios').append(`

                        <tr id="0">
                            <td>`+ cpf + `</td>
                            <td>`+ nome + `</td>
                            <td>
                                <button type="button" id="0" class="btn btn-primary alterar-beneficiario">Alterar</button>
                                <button type="button" id="0" class="btn btn-primary excluir-beneficiario">Excluir</button>
                            </td>
                        </tr>

                    `);
                });
            },
            error: function (xhr) {
                var errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "Erro desconhecido.";
                ModalDialog("Ocorreu um erro", errorMessage);
            }
        });
    });
}


function AdicaoEventoCPFMascara() {
    $('.cpf-masc').on('input', function () {
        valor = $(this).val();
        masc = aplicarMascaraCPF(valor);
        $(this).val(masc);
    });
}


function GetIdCliente() {
    url = window.location.href;
    partes = url.split('/');
    id = partes[partes.length - 1];
    return id;
}


function ConstruirLogicaModal() {

    // Definição da ação do botão Incluir - Beneficiário
    $('#formBeneficiario').submit(async function (e) {
        e.preventDefault();

        cpf = $('#CPF-Beneficiario').val().trim();
        nome = $('#Nome-Beneficiario').val().trim();

        if (cpf != '' && nome != '') {
            // Incluir beneficiario

            if (cpf != '' && nome != '') {
                $('#lista_beneficiarios').append(`

                            <tr id="0">
                                <td>`+ cpf + `</td>
                                <td>`+ nome + `</td>
                                <td>
                                    <button type="button" id="0" class="btn btn-primary alterar-beneficiario">Alterar</button>
                                    <button type="button" id="0" class="btn btn-primary excluir-beneficiario">Excluir</button>
                                </td>
                            </tr>

                        `);

                beneficiarios_list_global.push([cpf, nome]);
                $('#CPF-Beneficiario').val('');
                $('#Nome-Beneficiario').val('');
                ConstruirLogicaModal();
            }
        }

        //DELAY
        const $botao = $(this);
        $botao.prop('disabled', true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        $botao.prop('disabled', false);

    });

    // Definição da ação do botão Excluir - Beneficiário
    $('.excluir-beneficiario').click(function () {

        id = $(this).attr('id');
        row = $(this).closest('tr');

        if (id != 0) {
            $.ajax({
                url: '/Beneficiario/Excluir/'+id,
                method: "POST",
                contentType: 'application/json',
                data: JSON.stringify({ id: id }),
                success: function (response) {
                    if (response !== undefined) {
                       row.remove();
                    }
                    else {
                        ModalDialog("Ocorreu um erro", "Resposta inesperada do servidor.");
                    }
                },
                error: function (xhr) {
                    var errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "Erro desconhecido.";
                    ModalDialog("Ocorreu um erro", errorMessage);
                }
            });
        }
        else {
            row.remove();
        }
        

    });
}
