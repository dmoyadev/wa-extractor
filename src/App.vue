<template>
	<div>
		<input type="file" webkitdirectory mozdirectory @change="parse($event)"/>
		
		<div v-for="file in files" :key="file.name">
			{{file.name}}
		</div>
		
		<div v-if="chat">
			Se ha encontrado un chat, ¡procésalo!
			<button @click="process()">
				Procesar
			</button>
		</div>
		<div v-else>
			No se ha encontrado ningún archivo "_chat.txt"
		</div>
		
		<div v-if="messages.length">
			<p v-for="message in messages" :key="message.timestamp.toLocaleString()">
				{{ message.timestamp.getDate()+1 + '/' + message.timestamp.getMonth()+1 + '/' + message.timestamp.getFullYear() + '/' + message.timestamp.getYear() }} - {{ message.sender }}: {{ message.text }}
			</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'App',
	
	data() {
		return {
			files: [],
			chat: null,
			messages: []
		};
	},
	
	methods: {
		parse(event) {
			for(let file of event.target.files) {
				if(file.name === '_chat.txt') {
					this.chat = file;
				} else {
					this.files.push(file);
				}
			}
		},
		
		process() {
			
			const fileReader = new FileReader();
			const self = this;
			fileReader.onload = function(fileLoadedEvent){
				let rawMessages = fileLoadedEvent.target.result.split('\n');
				
				for(let rawMessage of rawMessages) {
					let message = {};
					let regexp = /\[(.*)]/;
					let matches = '20' + rawMessage.match(regexp);
					let match = matches[1].replace(/\//g, "-");
					message.timestamp = new Date(match);
					message.sender = rawMessage.substring(rawMessage.indexOf('] ') + 1, rawMessage.indexOf(': '));
					message.text = rawMessage.substring(rawMessage.indexOf(': ') + 1, rawMessage.length);
					self.messages.push(message);
				}
				
			};
			
			fileReader.readAsText(this.chat, "UTF-8");
		}
	}
}

</script>

<style>

</style>
