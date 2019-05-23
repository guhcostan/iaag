<template>
	<div id="app">
		<div class="formulario">
			<p>Tamanho dos genes</p>
			<input v-model="tam_genes">
			<br>
			<p>Tamanho da Populacao</p>
			<input v-model="tam_pop">
			<br>
			<p>Tamanho do torneio</p>
			<input v-model="tam_tornenio">
			<br>
			<p>Numero de geraçoes</p>
			<input v-model="geracoes">
			<br>
			<p>Probabilidade de mutacao</p>
			<input v-model="prob_mut">
			<br>
			<p>Probabilidade de cruzamento</p>
			<input v-model="prob_cruz">
			<br>
			<p></p>
			<button v-on:click="startIA">Iniciar IA</button>
		</div>
		<span class="console" style="white-space: pre-line" v-html="console"></span>
	</div>
</template>

<script>

import AG from './components/AG';

export default {
	name: 'app',
	data() {
		return {
			tam_genes: 100,
			tam_pop: 30,
			tam_tornenio: 20,
			geracoes: 20,
			prob_mut: 0.01,
			prob_cruz: 0.7,
			console: ''
		}
	},
	methods: {
		async startIA() {
			this.console = await AG.StartAG(this.tam_genes, this.tam_pop, this.tam_tornenio, this.geracoes, this.prob_mut, this.prob_cruz);
		}
	}
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		display: flex;
		margin-top: 60px;
	}

	.console{
		margin-left: 50px;
		color: white;
		min-width: 80%;
		background-color: black;
		padding: 50px;
	}
</style>
