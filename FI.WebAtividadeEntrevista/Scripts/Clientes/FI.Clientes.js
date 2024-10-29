

$(document).ready(function () {

    
    beneficiarios_list_global = [];

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        beneficiarios = [];
        table_rows = document.querySelectorAll('.table tbody tr');
        table_rows.forEach(row => {
            cols = row.querySelectorAll('td');

            beneficiarios.push({
                CPF: cols[0].innerText.trim().replace(/\D/g, ''),
                Nome: cols[1].innerText.trim()
            });
        });

        cpf = $(this).find("#CPF").val().replace(/\D/g, '');

        form_cliente = {
            "NOME": $(this).find("#Nome").val(),
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

        

        $.ajax({
            url: '/Validator/ValidarCPFCliente',
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({ cpf: cpf }),
            success: function (response) {
                if (response && response.success !== undefined) {

                    // Call ClienteController
                    $.ajax({
                        url: urlPost,
                        method: "POST",
                        data: form_cliente,
                        error:
                            function (r) {
                                if (r.status == 400)
                                    ModalDialog("Ocorreu um erro", r.responseJSON);
                                else if (r.status == 500)
                                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                            },
                        success:
                            function (r) {
                                ModalDialog("Sucesso!", r)
                                $("#formCadastro")[0].reset();
                            }
                    });
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

        
    });

    // Função para definir a ação de click do botão ExibirModal - Beneficiário
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

        $.ajax({
            url: '/Beneficiario/ExibirModal',
            method: "GET",
            success: function (response) {
                $('#modalBeneficiarioConteudo').html(response);
                $('#modalBeneficiario').modal('show');
                AdicaoEventoCPFMascara();
                ConstruirLogicaModal();

                beneficiarios_list_global.forEach((row) => {
                    cpf = row[0];
                    nome = row[1];

                    console.log(row)

                    $('#lista_beneficiarios').append(`

                        <tr>
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

function ConstruirLogicaModal() {

    // Definição da ação do botão Incluir - Beneficiário

    $('#btnIncluirBeneficiario').click(async function () {

        cpf = $('#CPF-Beneficiario').val().trim();
        nome = $('#Nome-Beneficiario').val().trim();

        if (cpf != '' && nome != '') {

            $.ajax({
                url: '/Validator/ValidarCPF',
                method: "POST",
                contentType: 'application/json',
                data: JSON.stringify({ cpf: cpf.replace(/\D/g, '') }),
                success: function (response) {
                    if (response && response.success !== undefined) {

                        // Incluir beneficiario

                        if (cpf != '' && nome != '') {
                            $('#lista_beneficiarios').append(`

                                <tr>
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

                            // Redefinição da ação dos novos botôes Excluir - Beneficiário
                            ExcluirBeneficiario();
                        }
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

        //DELAY
        const $botao = $(this);
        $botao.prop('disabled', true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        $botao.prop('disabled', false);

    });

    // Definição da ação do botão Excluir - Beneficiário
    ExcluirBeneficiario();
    
}

function ExcluirBeneficiario() {

    $('.excluir-beneficiario').click(function () {

        id = $(this).attr('id');
        $(this).closest('tr').remove();

    });
}