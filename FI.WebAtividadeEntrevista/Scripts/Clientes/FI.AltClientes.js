
$(document).ready(function () {
    if (obj) {
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
            "CPF": cpf
        }

        $.ajax({
            url: '/Validator/ValidarCPF',
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
                                window.location.href = urlRetorno;
                            }
                    });

                    $('#validacaoCPF').html('');
                }
                else {
                    $('#validacaoCPF').html('<p style="color: red;">Resposta inesperada do servidor.</p>');
                }
            },
            error: function (xhr) {
                var errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "Erro desconhecido.";
                $('#validacaoCPF').html(`<p style="color: red;">${errorMessage}</p>`);
            }
        });


    });

    // Função para definir a ação de click do botão ExibirModal - Beneficiario
    AdicaoEventoBtnExibirModalBeneficiario();

    // Formatação do Campo CPF (Máscara Auto)
    document.getElementById("CPF").addEventListener("input", function (e) {
        e.target.value = aplicarMascaraCPF(e.target.value);
        $('#validacaoCPF').html('');
    });

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

        var id = 0;

        $.ajax({
            url: '/Beneficiario/ExibirModal',
            method: "GET",
            data: { id: id },
            success: function (response) {
                $('#modalBeneficiarioConteudo').html(response);
                $('#modalBeneficiario').modal('show');
            },
            error: function (xhr) {
                var errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "Erro desconhecido.";
                ModalDialog("Ocorreu um erro", errorMessage);
            }
        });
    });
}
