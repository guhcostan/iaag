export default class AG {

	static criarPopulacao(nPopulacao){

	}

	static avaliaPopulacao(populacao){


	}

	static selecionaPopulacao(populacao){
		var novaPopulacao = [];
		populacao.forEach(individuo => {
			novaPopulacao.push(individuo)
		});

		return novaPopulacao;
	}

	static reproduzPopulacao(populacao){

	}

	static async StartAG(nPopulacao) {

		var passo = 0;
		var populacao = this.criarPopulacao(nPopulacao);
		this.avaliaPopulacao(populacao)
		while(1){
			passo++;
			this.selecionaPopulacao(populacao)
			this.reproduzPopulacao(populacao)
			this.avaliaPopulacao(populacao)
		}
	}
}
