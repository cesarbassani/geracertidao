<template>
    <div>
        <div class="menu_top menu_fix">
            <a href="/#/home" class="btn_left">
                <img src="img/close.svg" alt="Fechar" width="24"/>
            </a>
            <span class="title">Pagamentos</span>
        </div>
        <hr class="space">
        <hr class="space">
        <hr class="space">

        <div class="container">
            <div class="row">
                <hr class="space">
                <div class="col-md-8 text-center offset-2">
                    <h5>Para realizar o download das certidões da sua empresa, <br> é necessário aderir a um dos planos abaixo:</h5>
                </div>
                <hr class="space">
                <div class="col-md-12">
                    <div class="tab-content" id="myTabContent">

                        <div class="tab-pane fade show active" id="alt_email" role="tabpanel" aria-labelledby="email">
                            <div class="offset-md-1 col-md-10">
                                <div class="columns">
                                    <ul class="price">
                                        <li class="header">Básico</li>
                                        <li class="grey">R$ 9,90 / mês</li>
                                        <li>3 empresas</li>
                                        <li>Certidões federais</li>
                                        <li>Renovações ilimitadas</li>
                                        <li class="grey"><a
                                                href="https://www.mercadopago.com/mlb/checkout/start?pref_id=158733515-d95928ff-b076-49ba-9bff-28d1b5d28a2b"
                                                class="btn-prime external">Aderir</a></li>
                                    </ul>
                                </div>

                                <div class="columns">
                                    <ul class="price">
                                        <li class="header" style="background-color:#00d0a5; color: #243e58;">Gestão</li>
                                        <li class="grey">R$ 29,90 / mês</li>
                                        <li>10 empresas</li>
                                        <li>Certidões federais</li>
                                        <li>Renovações ilimitadas</li>
                                        <li class="grey"><a
                                                href="https://www.mercadopago.com/mlb/checkout/start?pref_id=158733515-3700d265-d873-49b7-acc7-db501526c14f"
                                                class="btn-prime external">Aderir</a></li>
                                    </ul>
                                </div>

                                <div class="columns">
                                    <ul class="price">
                                        <li class="header">Inteligência</li>
                                        <li class="grey">R$ 69,90 / mês</li>
                                        <li>30 empresas</li>
                                        <li>Certidões federais</li>
                                        <li>Renovações ilimitadas</li>
                                        <li class="grey"><a
                                                href="https://www.mercadopago.com/mlb/checkout/start?pref_id=158733515-db76b741-9a34-479a-ba48-e3cb8c5b0876"
                                                class="btn-prime external">Aderir</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="alt_senha" role="tabpanel" aria-labelledby="senha">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Transação</th>
                                    <th scope="col">Empresas (un)</th>
                                    <th scope="col">Valor</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>12/10/2018</td>
                                    <td>0494894</td>
                                    <td>2</td>
                                    <td>R$ 3,98</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>12/09/2018</td>
                                    <td>0969696</td>
                                    <td>1</td>
                                    <td>R$ 1,99</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>12/08/2018</td>
                                    <td>1102920</td>
                                    <td>1</td>
                                    <td>R$ 1,99</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>
