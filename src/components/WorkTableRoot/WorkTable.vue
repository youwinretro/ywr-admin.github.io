<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="text-center mb-5">
                <br>
                <h3 class="text-white section-heading text-uppercase">{{ titlePage }}</h3>
                <h6 class="text-white">{{ sub }}</h6>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12">
                <b-form @submit.prevent="chooseMethod()">
                    <b-row>
                        <b-col class="form-group" cols="12" sm="12" md="9">
                            <sup style="color: #fff; text-transform: uppercase; font-weight: 600;">Nome do jogo</sup>
                            <b-input v-model="jogoView.nome" type="text" placeholder="Nome do Jogo" required autocomplete="off"/>
                        </b-col>

                        <b-col class="form-group" cols="6" sm="6" md="3">
                            <sup class="text-white text-uppercase font-weight-bold">lançamento</sup>
                            <v-date-picker 
                                v-model="jogoView.dataLancamento"
                                :value="jogoView.dataLancamento"
                                :inputProps="{ class: 'form-control'}"
                            />
                        </b-col>
                        
                        <b-col class="form-group" cols="6" sm="6" md="4">
                            <sup class="text-white text-uppercase font-weight-bold">estilo</sup>
                            <b-input v-model="jogoView.tipo" type="text" placeholder="Estilo" required autocomplete="off"/> 
                        </b-col>

                        <b-col class="form-group" cols="12" sm="6" md="4">
                            <sup class="text-white text-uppercase font-weight-bold">tamanho</sup>
                            <div class="input-group">
                                <b-input v-model="jogoView.tamanho" class="col-6" type="number" min="0" max="999" required autocomplete="off"/>
                                
                                <b-form-select v-model="jogoView.unidade" class="col-6 font-weight-bold" required>
                                    <option value="MB" class="font-weight-bold">MB</option>
                                    <option value="GB" class="font-weight-bold">GB</option>
                                </b-form-select>
                            </div>
                        </b-col>

                        <b-col class="form-group" cols="12" sm="6" md="4">
                            <sup class="text-white text-uppercase font-weight-bold">formato</sup>
                            <b-form-select v-model="jogoView.formato" class="font-weight-bold" required>
                                <option value=".NSP" class="font-weight-bold">NSP</option>
                                <option value=".XCi" class="font-weight-bold">XCi</option>
                                <option value=".CXCi" class="font-weight-bold">CXCi</option>
                            </b-form-select>
                        </b-col>

                        <b-col class="form-group" cols="12">
                            <sup class="text-white text-uppercase font-weight-bold">Capa do jogo</sup>
                            <b-input v-model="jogoView.linkCapa" type="text" placeholder="Link da imagem" required autocomplete="off"/>
                        </b-col>
                    </b-row>

                    <!-- Links -->
                    <!-- Link Base -->
                    <b-row class="mt-5">
                        <b-col cols="12" class="form-group text-white text-center">
                            <h5 class="section-heading text-uppercase">Links Jogo Base</h5>
                            <h6 class="section-subheading">Adicione abaixo os links do jogo base</h6>
                        </b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col cols="auto" class="form-group">
                            <sup >&nbsp;</sup>
                            <b-button @click="addLink('linksBase')" variant="warning" class="text-uppercase text-white" block><Icon icon="plus"/></b-button>  
                        </b-col> 
                    </b-row>

                    <b-row>
                        <b-col cols="12" md="6" v-for="(link, i) in jogoView.linksBase" :key="i" class="form-group">
                            <b-row>
                                <b-col>
                                    <sup class="text-white text-uppercase font-weight-bold">Link {{ i + 1 }}</sup>
                                    <b-input v-model="jogoView.linksBase[i]" type="text" :placeholder="`Link ${i + 1}`" required autocomplete="off"/>
                                </b-col>
                                <b-col cols="auto" v-if="i != 0 || tamanhoLinksBase">
                                    <sup >&nbsp;</sup>
                                    <b-button @click="removeLink('linksBase', i)" variant="danger" class="text-uppercase text-white" block><Icon icon="times"/></b-button>  
                                </b-col>             
                            </b-row>
                        </b-col> 
                    </b-row>
                    
                    <!-- Link Update -->
                    <b-row class="mt-5">
                        <b-col cols="12" class="text-white text-center">
                            <h5 class="section-heading text-uppercase">Links Update</h5>
                            <h6 class="section-subheading">Adicione abaixo os links de update do jogo</h6>
                        </b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col cols="auto" class="form-group">
                            <sup >&nbsp;</sup>
                            <b-button @click="addLink('linksUpdate')" variant="warning" class="text-uppercase text-white" block><Icon icon="plus"/></b-button>  
                        </b-col> 
                    </b-row>

                    <b-row>
                        <b-col cols="12" md="6" v-for="(link, i) in jogoView.linksUpdate" :key="i" class="form-group">
                            <b-row>
                                <b-col>
                                    <sup class="text-white text-uppercase font-weight-bold">Link {{ i + 1 }}</sup>
                                    <b-input v-model="jogoView.linksUpdate[i]" type="text" :placeholder="`Link ${i + 1}`" required autocomplete="off"/>
                                </b-col>
                                <b-col cols="auto">
                                    <sup >&nbsp;</sup>
                                    <b-button @click="removeLink('linksUpdate', i)" variant="danger" class="text-uppercase text-white" block><Icon icon="times"/></b-button>  
                                </b-col>             
                            </b-row>
                        </b-col> 
                    </b-row>

                    <!-- Link DLC -->
                    <b-row class="mt-5">
                        <b-col cols="12" class="text-white text-center">
                            <h5 class="section-heading text-uppercase">Links DLC's</h5>
                            <h6 class="section-subheading">Adicione abaixo os links da/s DLC's do jogo</h6>
                        </b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col cols="auto">
                            <sup >&nbsp;</sup>
                            <b-button @click="addLink('linksDLC')" variant="warning" class="text-uppercase text-white" block><Icon icon="plus"/></b-button>  
                        </b-col> 
                    </b-row>

                    <b-row>
                        <b-col cols="12" md="6" v-for="(link, i) in jogoView.linksDLC" :key="i" class="form-group">
                            <b-row>
                                <b-col>
                                    <sup class="text-white text-uppercase font-weight-bold">Link {{ i + 1 }}</sup>
                                    <b-input v-model="jogoView.linksDLC[i]" type="text" :placeholder="`Link ${i + 1}`" required autocomplete="off"/>
                                </b-col>
                                <b-col cols="auto">
                                    <sup >&nbsp;</sup>
                                    <b-button @click="removeLink('linksDLC', i)" variant="danger" class="text-uppercase text-white" block><Icon icon="times"/></b-button>  
                                </b-col>             
                            </b-row>
                        </b-col> 
                    </b-row>

                    <b-row align-h="center" class="mt-5">
                        <b-col cols="auto">
                            <b-button variant="warning" type="submit" class="text-white text-uppercase font-weight-bold" block>{{ textMethod }}</b-button>
                        </b-col>
                    </b-row>

                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'WorkTable',
    data() {
        return {
            titlePage: 'Adicionar Jogos',
            sub: 'Preencha todos os campos abaixo para adicionar novos jogos a lista',
            jogoView: {
                nome: '',
                dataLancamento: new Date(),
                formato: '.NSP',
                linkCapa: '',
                tipo: '',
                tamanho: '',
                unidade: 'GB',
                linksBase: [""],
                linksUpdate: [],
                linksDLC: [],
            }
        }
    },
    computed: {
        ...mapState({ jogo: state => { return state.Game.forEdit } }),
        verifiIsSetedGameForEdit() { return !_.isEmpty(this.jogo) },
        textMethod() {
            if(!this.verifiIsSetedGameForEdit) {
                this.titlePage = 'Adicionar Jogos'
                this.sub = 'Preencha todos os campos abaixo para adicionar novos jogos a lista'
                return 'Adicionar'
            } else {
                this.titlePage = 'Editar Jogo'
                this.sub = 'Para editar o jogo use os campos abaixo'
                return 'Editar'
            }
        },
        tamanhoLinksBase() { return this.jogoView.linksBase.length >= 2 }
    },
    methods: {
        chooseMethod() {
            if(!this.verifiIsSetedGameForEdit) {
                this.adicionar()
            } else {
                this.editar()
            }
        },
        editar() {
            this.$snotify.async('Espere Por favor ...', 'Atualizando', () => new Promise((resolve, reject) => {
                let payload = this.preparePayload()
                api.put(`/jogos/${payload._id}`, payload)
                .then(({status, data}) => {
                    if(status == 200) {
                        resolve({
                            title: "Atualizado!!!",
                            body: 'Jogo Atualizado',
                            config: { 
                                pauseOnHover: true,
                                timeout: 3000,
                                showProgressBar: true,
                                closeOnClick: true,
                            }
                        })
                        this.$router.push({ name: 'Home' })
                    } 
                })
                .catch((err) => {
                    reject({
                        title: "Ops... :'(",
                        body:   "Verifique os campos",
                        config: { 
                            pauseOnHover: true,
                            timeout: 3000,
                            showProgressBar: true,
                            closeOnClick: true,
                        }
                    })
                })
            }))
        },
        adicionar() {
            this.$snotify.async('Espere Por favor ...', 'Adicionando', () => new Promise((resolve, reject) => {
                let payload = this.preparePayload()
                api.post(`/jogos`, payload)
                .then(({status, data}) => {
                    if(status == 200) {
                        resolve({
                            title: "Adicionado!!!",
                            body: 'Jogo Adicionado',
                            config: { 
                                pauseOnHover: true,
                                timeout: 3000,
                                showProgressBar: true,
                                closeOnClick: true,
                            }
                        })
                        this.$router.push({ name: 'Home' })
                    } 
                })
                .catch((err) => {
                    reject({
                        title: "Ops... :'(",
                        body:   "Verifique os campos",
                        config: { 
                            pauseOnHover: true,
                            timeout: 3000,
                            showProgressBar: true,
                            closeOnClick: true,
                        }
                    })
                })
            }))
        },
        preparePayload() {
            let payload = this.jogoView
            payload.dataLancamento = moment(payload.dataLancamento).format('YYYY-MM-DD')
            return payload
        },
        addLink(key) { this.jogoView[key].push("") },
        removeLink(key, index) { this.jogoView[key].splice(index, 1) },        
        autoCompliteForEdit() {
            if(!this.verifiIsSetedGameForEdit) return
            this.jogo.dataLancamento = new Date(this.jogo.dataLancamento)
            this.jogoView = this.jogo
        },
    },
    mounted() { this.autoCompliteForEdit() }
}
</script>

<style>

</style>
