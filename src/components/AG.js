export default class AG {

	static populacao = [];
	static tam_genes = [];
	static tam_pop = [];
	static tam_tornenio = [];
	static geracoes = [];
	static prob_mut = [];
	static prob_cruz = [];

	static criarPopulacao() {

		for (var i = 0; i < this.tam_pop; ++i) {
			var individuo = [];

			for (var j = 0; j < this.tam_genes; ++j) {
				var num = Math.round(Math.random());
				individuo.push(num);
			}

			this.populacao.push(individuo);
		}
	}

	static mutacao(individuo) {
		var gene = Math.floor(Math.random()) * this.tam_genes;

		if (individuo[gene] === 0) {
			individuo[gene] = 1;
		} else {
			individuo[gene] = 0;
		}
	}

	static cruzamento(indice_pai1, indice_pai2, filho) {

		var ponto = Math.floor(Math.random() * this.tam_genes);

		for (var i = 0; i <= ponto; ++i) {
			filho.push(this.populacao[indice_pai1][i]);
		}
		for (var j = ponto + 1; j < this.tam_genes; ++j) {
			filho.push(this.populacao[indice_pai2][j]);
		}
	}

	static obterMelhor() {
		var indice_melhor = 0;
		var score_melhor = this.obterPontuacao(this.populacao[0]);

		for (var i = 1; i < this.tam_pop; ++i) {
			var score = this.obterPontuacao(this.populacao[i]);
			if (score > score_melhor) {
				indice_melhor = i;
				score_melhor = score;
			}
		}

		return indice_melhor;
	}

	static obterPontuacao(individuo) {
		var soma = 0;

		for (var i = 0; i < this.tam_genes; ++i) {
			soma += individuo[i];
		}
		return soma;

	}

	static async StartAG(tam_genes = 100, tam_pop = 30, tam_torneio = 20, geracoes = 20, prob_mut = 0.01, prob_cruz = 0.7) {

		this.populacao = []
		var consoleOutput = ''
		this.tam_genes = tam_genes;
		this.tam_pop = tam_pop;
		this.tam_tornenio = tam_torneio;
		this.geracoes = geracoes;
		this.prob_mut = prob_mut;
		this.prob_cruz = prob_cruz;

		this.criarPopulacao();

		for (var i = 0; i < geracoes; ++i) {
			for (var j = 0; j < tam_torneio; ++j) {

				// calcula a probabilidade de cruzamento
				var prob = Math.round(Math.random() * 100 + 1) / 100;

				if (prob < this.prob_cruz) {
					// escolhe dois pais
					var indice_pai1 = Math.floor(Math.random() * tam_pop);
					var indice_pai2;

					// garante que os índices dos pais não são iguais
					do {
						indice_pai2 = Math.floor(Math.random() * tam_pop);
					}
					while (indice_pai1 === indice_pai2);

					var filho = [];

					// aplica o cruzamento de 1 ponto
					this.cruzamento(indice_pai1, indice_pai2, filho);

					// calcula a probabilidade de mutação
					prob = Math.round(Math.random() * 100 + 1) / 100;

					if (prob < prob_mut) {
						this.mutacao(filho);
					}

					var score_pai = this.obterPontuacao(this.populacao[indice_pai1]);
					var score_filho = this.obterPontuacao(filho);

					/*
						se a pontuação (score) do filho for melhor do
						que o pai1, então substitui o pai 1 pelo filho
					*/
					if (score_filho > score_pai) {
						// faz a cópia dos genes do filho para o pai
						for (var k = 0; k < tam_genes; k++)
							this.populacao[indice_pai1][k] = filho[k];
					}
				}
			}
			consoleOutput += '<b>Geracao ' + (i + 1) + '</b>\n';
			consoleOutput += 'Melhor: \n'

			var indice_melhor = this.obterMelhor();
			var score_melhor = this.obterPontuacao(this.populacao[indice_melhor]);

			consoleOutput += this.populacao[indice_melhor]

			consoleOutput += '\nPontuacao: <b>' + score_melhor + '</b>\n\n'

			// verifica se encontrou a solução ótima global
			if (score_melhor === tam_genes) {
				break;
			}
		}

		return consoleOutput;

	}
}

